import { Router } from 'express';
import Stripe from 'stripe'; 
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const router = Router();

// Route to create a checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;  // Get the cart items sent from the frontend

  // Format the items to fit Stripe's expected format
  const line_items = items.map(item => ({
    price_data: {
      currency: 'EUR',
      product_data: {
        name: item.name,
        // images: [item.image],  // URL of product image
      },
      unit_amount: item.price * 100,  // Convert price to cents
    },
    quantity: item.quantity,
  }));

  try {
    // Create the checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle payment completion
/*router.post('/complete-payment', async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    // Create the payment intent and confirm the payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount,  // Amount in cents
      currency: 'usd',  // Currency for payment
      payment_method: paymentMethodId,
      confirm: true,
    });

    if (paymentIntent.status === 'succeeded') {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).send({ success: false, message: 'Payment failed. Please try again.' });
  }
});
*/
export default router;
