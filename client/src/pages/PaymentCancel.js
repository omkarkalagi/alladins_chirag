import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className="payment-status-page">
      <div className="payment-status-container">
        <div className="status-icon cancel">❌</div>
        <h2>Payment Cancelled</h2>
        <p>Your payment was not completed. You have not been charged.</p>
        
        <div className="payment-details">
          <p>If you encountered an issue, you can try again or contact support.</p>
        </div>
        
        <div className="action-buttons">
          <Link to="/dashboard" className="btn primary">Return to Dashboard</Link>
          <Link to="/deposit" className="btn secondary">Try Payment Again</Link>
        </div>
        
        <div className="support-contact">
          <p>Need help? Contact our support team at <a href="mailto:support@trademaster.com">support@trademaster.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;