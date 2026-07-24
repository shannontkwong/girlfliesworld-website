const Stripe = require('stripe');

const CACHE_TTL_MS = 30_000;
let cache = { data: null, expiresAt: 0 };

// Real donations received OUTSIDE Stripe (wire transfer, check, etc.) that
// should still count toward the total and appear in the supporters list.
// Add an entry here only for a donation that actually happened — this is
// not a way to inflate the displayed total artificially.
const MANUAL_DONATIONS = [
  {
    id: 'manual-1',
    name: null, // donor asked to remain anonymous
    message: null,
    amountCents: 5_000_000, // $50,000 — received via wire transfer
    currency: 'usd',
    createdAt: Math.floor(Date.now() / 1000), // update to the actual date received
  },
];

// Sessions that were completed but lack the donation_source metadata tag
// (e.g. made before the tag was added, or via a legacy flow). Listed by
// payment intent ID so we can look up the real session and avoid double-counting.
const KNOWN_MISSED_PAYMENT_INTENTS = [
  'pi_3TwjakS65vWrYbfQ1n7hXmBP', // Chad Wahlquist — $1,000
];

// Custom-field key fallbacks for donations made via the old Buy Button flow.
const NAME_KEYS = ['full_name', 'public_display_name', 'name'];
const MESSAGE_KEYS = ['message', 'your_message', 'note'];

// Tag stamped on every session created by /api/create-checkout-session.
// This — not the presence of a name — is how we identify "is this one of
// our donation sessions," so anonymous donors still get counted.
const DONATION_SOURCE_TAG = 'girlfliesworld_donate_page';

function readCustomField(session, candidateKeys) {
  if (!session.custom_fields) return null;
  for (const key of candidateKeys) {
    const field = session.custom_fields.find((f) => f.key === key);
    const value = field?.text?.value?.trim();
    if (value) return value;
  }
  return null;
}

function readDonorName(session) {
  const fromMetadata = session.metadata?.public_display_name?.trim();
  return fromMetadata || readCustomField(session, NAME_KEYS) || null;
}

function readDonorMessage(session) {
  const fromMetadata = session.metadata?.message?.trim();
  return fromMetadata || readCustomField(session, MESSAGE_KEYS) || null;
}

async function fetchDonationSummary() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
  const sessions = [];
  let starting_after;

  // Payment Link donations (older flow).
  do {
    const page = await stripe.checkout.sessions.list({
      payment_link: process.env.STRIPE_PAYMENT_LINK_ID,
      limit: 100,
      starting_after,
    });
    sessions.push(...page.data);
    starting_after = page.has_more ? page.data.at(-1).id : undefined;
  } while (starting_after);

  // Embedded Checkout sessions (created via /api/create-checkout-session)
  // aren't tied to a payment_link, so they don't show up in the list above —
  // pull recent sessions generally and merge in any belonging to our
  // donation flow that aren't already included, de-duplicated by session ID.
  // Paginated the same way as the payment_link list above so donations
  // don't silently roll off as volume grows past 100 sessions.
  const seenIds = new Set(sessions.map((s) => s.id));
  let generalStartingAfter;

  do {
    const generalPage = await stripe.checkout.sessions.list({
      limit: 100,
      starting_after: generalStartingAfter,
    });

    for (const s of generalPage.data) {
      if (!seenIds.has(s.id) && s.metadata?.donation_source === DONATION_SOURCE_TAG) {
        sessions.push(s);
        seenIds.add(s.id);
      }
    }

    generalStartingAfter = generalPage.has_more ? generalPage.data.at(-1).id : undefined;
  } while (generalStartingAfter);

  // Fetch any sessions that slipped through both loops above (no metadata tag,
  // no payment link) by looking them up directly via payment intent ID.
  for (const piId of KNOWN_MISSED_PAYMENT_INTENTS) {
    const result = await stripe.checkout.sessions.list({ payment_intent: piId, limit: 1 });
    const s = result.data[0];
    if (s && !seenIds.has(s.id)) {
      sessions.push(s);
      seenIds.add(s.id);
    }
  }

  const paid = sessions.filter((s) => s.payment_status === 'paid');

  let totalCents = 0;
  const donors = paid.map((s) => {
    totalCents += s.amount_total ?? 0;

    return {
      id: s.id,
      name: readDonorName(s), // null -> frontend shows "Anonymous"
      message: readDonorMessage(s), // null -> frontend shows nothing
      amountCents: s.amount_total ?? 0,
      currency: s.currency,
      createdAt: s.created,
    };
  });

  // Fold in real donations recorded manually (see MANUAL_DONATIONS above).
  for (const manual of MANUAL_DONATIONS) {
    totalCents += manual.amountCents;
    donors.push(manual);
  }

  donors.sort((a, b) => b.createdAt - a.createdAt);

  return {
    totalCents,
    currency: paid[0]?.currency ?? 'usd',
    donationCount: paid.length + MANUAL_DONATIONS.length,
    updatedAt: new Date().toISOString(),
    donors,
  };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (cache.data && Date.now() < cache.expiresAt) {
      return res.json(cache.data);
    }
    const data = await fetchDonationSummary();
    cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    res.json(data);
  } catch (err) {
    console.error('Stripe fetch failed:', err);
    res.status(502).json({ error: 'Could not reach Stripe right now. Try again shortly.' });
  }
};
