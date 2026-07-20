// create-donation-price.js
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function main() {
  const price = await stripe.prices.create({
    currency: 'usd',
    custom_unit_amount: {
      enabled: true,
      minimum: 100,
    },
    product_data: {
      name: 'Donation to GIRLFLIESWORLD',
    },
  });

  console.log('Created price:', price.id);
  console.log('\nAdd this to your Vercel env vars:');
  console.log(`STRIPE_DONATION_PRICE_ID=${price.id}`);
}

main().catch((err) => {
  console.error('Failed to create price:', err);
  process.exit(1);
});
