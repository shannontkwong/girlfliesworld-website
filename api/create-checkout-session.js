const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
    const { amountCents, name, message } = req.body || {};

    const amount = Number(amountCents);
    if (!Number.isInteger(amount) || amount < 100) {
      return res.status(400).json({ error: 'Enter an amount of at least $1.' });
    }
    if (amount > 100_000_000) {
      return res.status(400).json({ error: 'Amount is too large.' });
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Donation to GIRLFLIESWORLD' },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        public_display_name: (name || '').trim().slice(0, 100),
        message: (message || '').trim().slice(0, 300),
      },
      return_url: `${process.env.ALLOWED_ORIGIN || ''}/donate?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.status(200).json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error('Failed to create checkout session:', err);
    res.status(502).json({ error: 'Could not start checkout right now. Try again shortly.' });
  }
};
