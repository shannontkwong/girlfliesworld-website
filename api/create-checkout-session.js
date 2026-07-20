// api/create-checkout-session.js
const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Donation to GIRLFLIESWORLD' },
            unit_amount: 2500, // $25 default shown initially — the donor can change it below
            custom_unit_amount: { enabled: true, minimum: 100 }, // lets them type any amount, min $1
          },
          quantity: 1,
        },
      ],
      custom_fields: [
        {
          key: 'full_name',
          label: { type: 'custom', custom: 'Your name (optional)' },
          type: 'text',
          optional: true,
        },
        {
          key: 'message',
          label: { type: 'custom', custom: 'Leave a message (optional)' },
          type: 'text',
          optional: true,
        },
      ],
      return_url: `${process.env.ALLOWED_ORIGIN || ''}/donate?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.status(200).json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error('Failed to create checkout session:', err);
    res.status(502).json({ error: 'Could not start checkout right now. Try again shortly.' });
  }
};
