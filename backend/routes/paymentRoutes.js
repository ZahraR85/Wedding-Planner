import { Router } from 'express';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = Router();

router.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body; // Get the cart items sent from the frontend
  
  // Format the items to fit Stripe's expected format
  const line_items = items.map(item => ({
    price_data: {
      currency: 'usd', // Or the currency you want to use
      product_data: {
        name: item.name,
        images: [item.image], // URL of product image
      },
      unit_amount: item.price * 100, // Convert price to cents
    },
    quantity: item.quantity,
  }));

  try {
    // Create the checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
