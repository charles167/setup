import React, { useState } from 'react';

const PaymentPage = () => {
  const [amount, setAmount] = useState(1000);  // Example amount in Naira (₦)
  const [email, setEmail] = useState('customer@example.com');
  const [orderId, setOrderId] = useState('order123');  // Unique order ID

  const handlePayment = async () => {
    try {
      // Step 1: Initialize payment by calling backend API
      const response = await fetch('/api/initialize-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,      // Amount in Naira
          email,       // Customer's email
          orderId,     // Unique order ID
        }),
      });
      const data = await response.json();

      if (data.status === 'success') {
        // Step 2: Redirect to Paystack payment page
        const paymentData = data.data;
        const paystack = new PaystackPop(); // Paystack JS SDK

        paystack.newTransaction({
          key: 'your-paystack-public-key',  // Replace with your public key
          email: email,
          amount: amount * 100, // Convert amount to kobo
          reference: paymentData.reference, // Order reference from backend
          callback: function (response) {
            // Handle callback (payment success)
            alert('Payment was successful!');
            verifyPayment(response.reference);
          },
          onClose: function () {
            // Handle when the user closes the Paystack modal
            alert('Transaction was canceled.');
          },
        }).openIframe();
      }
    } catch (error) {
      console.error('Error initiating payment', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const verifyPayment = async (reference) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        alert('Payment verified successfully!');
      } else {
        alert('Payment verification failed!');
      }
    } catch (error) {
      console.error('Error verifying payment', error);
    }
  };

  return (
    <div>
      <h1>Paystack Payment</h1>
      <p>Amount: ₦ {amount}</p>
      <button onClick={handlePayment}>Pay with Paystack</button>
    </div>
  );
};

export default PaymentPage;
