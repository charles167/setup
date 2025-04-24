import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";

import User from "../models/User.js"

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ success: false, message: 'Invalid data' });
    }

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    // Create Order
    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({ success: true, message: "Order Placed Successfully" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



// Place Order Stripe : /api/order/stripe
export const placeOrderSripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const origin = req.headers.origin;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: 'Invalid data' });
    }

    let amount = 0;
    let productsForStripe = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      productsForStripe.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    // Create Order
    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "online",
    });

    // Stripe Gateway Initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create line items for Stripe
    const line_items = productsForStripe.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
      },
      quantity: item.quantity,
    }));

    // Create session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    return res.json({ success: true, url: session.url });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};









//Stripe Webhooks to Verify Payments Action :/stripe

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function StripeWebhook(request, response) {
  const sig = request.headers['stripe-signature']; // Typo fixed: "stipe-signature" → "stripe-signature"

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`); // Template string fixed
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // Get Session Metadata
      const sessions = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      if (!sessions.data.length) {
        return response.status(400).send('No session found for this payment intent');
      }

      const { orderId, userId, action } = sessions.data[0].metadata;

      if (action === 'pay') {
        // Mark payment as paid
        await Order.findByIdAndUpdate(orderId, { isPaid: true });
        // Clear user cart
        await User.findByIdAndUpdate(userId, { cartItems: {} });
      } else if (action === 'delete') {
        // Delete the order
        await Order.findByIdAndDelete(orderId);
      }

      break;
    }

    default:
      console.error(`Unhandled event type ${event.type}`); // Fixed typo in template string
      break;
  }

  response.status(200).send('Event received');
}













// Get Orders by User Id : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID missing' });
    }

    const orders = await Order.find({ userId })
      .populate('items.product')
      .populate('address');

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get all Orders for Seller : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const sellerEmail = req.seller?.email;

    if (!sellerEmail) {
      return res.status(400).json({ success: false, message: 'Seller Email missing' });
    }

    const orders = await Order.find()
      .populate('items.product')
      .populate('address');

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: 'No orders found.' });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders for seller:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
