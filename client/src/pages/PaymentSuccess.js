import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(null);
  
  useEffect(() => {
    // In a real app, you'd fetch payment data from your backend
    const params = new URLSearchParams(location.search);
    const amount = params.get('amount') || '100.00';
    const currency = params.get('currency') || 'USD';
    
    setPaymentData({
      amount,
      currency,
      date: new Date().toLocaleDateString(),
      transactionId: 'TX' + Math.floor(Math.random() * 1000000)
    });
  }, [location]);

  return (
    <div className="payment-status-page">
      <div className="payment-status-container">
        <div className="status-icon success">✓</div>
        <h2>Payment Successful!</h2>
        <p>Your funds have been added to your account balance.</p>
        
        {paymentData && (
          <div className="payment-details">
            <div className="detail-row">
              <span>Amount:</span>
              <span>${paymentData.amount} {paymentData.currency}</span>
            </div>
            <div className="detail-row">
              <span>Date:</span>
              <span>{paymentData.date}</span>
            </div>
            <div className="detail-row">
              <span>Transaction ID:</span>
              <span>{paymentData.transactionId}</span>
            </div>
          </div>
        )}
        
        <div className="action-buttons">
          <Link to="/dashboard" className="btn primary">Go to Dashboard</Link>
          <Link to="/trading" className="btn secondary">Start Trading</Link>
        </div>
        
        <div className="next-steps">
          <h3>What would you like to do next?</h3>
          <ul>
            <li><Link to="/portfolio">View your portfolio</Link></li>
            <li><Link to="/trading">Place a trade</Link></li>
            <li><Link to="/research">Research investment opportunities</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;