const Stripe = require('stripe');

const CACHE_TTL_MS = 30_000;
let cache = { data: null, expiresAt: 0 };

// Custom-field key fallbacks for donations made via the old Buy Button flow.
const NAME_KEYS = ['full_name', 'public_display_name', 'name'];
const MESSAGE_KEYS = ['message', 'your_message', 'note'];

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

  do {
    const page = await stripe.checkout.sessions.list({
      payment_link: process.env.STRIPE_PAYMENT_LINK_ID,
      limit: 100,
      starting_after,
    });
    sessions.push(...page.data);
    starting_after = page.has_more ? page.data.at(-1).id : undefined;
  } while (starting_after);

  // Embedded Checkout sessions aren't tied to a payment_link, so pull recent
  // sessions generally and merge in any paid ones that have our metadata key.
  const generalPage = await stripe.checkout.sessions.list({ limit: 100 });
  const seenIds = new Set(sessions.map((s) => s.id));
  for (const s of generalPage.data) {
    if (!seenIds.has(s.id) && s.metadata?.public_display_name !== undefined) {
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
      name: readDonorName(s),
      message: readDonorMessage(s),
      amountCents: s.amount_total ?? 0,
      currency: s.currency,
      createdAt: s.created,
    };
  });

  donors.sort((a, b) => b.createdAt - a.createdAt);

  return {
    totalCents,
    currency: paid[0]?.currency ?? 'usd',
    donationCount: paid.length,
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
