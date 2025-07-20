import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripePayment = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      // Send paymentMethod.id to your server
      const response = await fetch('/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          paymentMethodId: paymentMethod.id,
          amount: amount * 100 // Convert to cents
        })
      });

      const result = await response.json();

      if (result.success) {
        onSuccess(result.transactionId);
      } else {
        setError(result.error);
      }
      setProcessing(false);
    }
  };

  return (
    <div className="stripe-payment">
      <form onSubmit={handleSubmit}>
        <div className="payment-header">
          <h3>Payment Details</h3>
          <div className="payment-amount">${amount.toFixed(2)}</div>
        </div>
        
        <div className="card-element">
          <CardElement />
        </div>
        
        {error && <div className="payment-error">{error}</div>}
        
        <button 
          type="submit" 
          disabled={!stripe || processing}
          className="pay-button"
        >
          {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default StripePayment;