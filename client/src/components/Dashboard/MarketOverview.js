// src/components/MarketOverview.js
import React from 'react';

function MarketOverview() {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      marginBottom: '24px'
    }}>
      <div style={{
        background: 'linear-gradient(to right, #3b82f6, #6366f1)',
        padding: '16px 24px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.25rem'
      }}>
        Market Overview
      </div>
      
      <div style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 'bold', color: '#374151' }}>NIFTY 50:</span>
            <span>18,432.45</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>+0.85%</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 'bold', color: '#374151' }}>SENSEX:</span>
            <span>62,187.34</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>+0.92%</span>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>
          <IndexCard 
            title="NIFTY BANK" 
            value="42,187.95" 
            change="+1.25%" 
            isPositive={true} 
          />
          
          <IndexCard 
            title="NIFTY IT" 
            value="34,882.10" 
            change="-0.35%" 
            isPositive={false} 
          />
          
          <IndexCard 
            title="NIFTY AUTO" 
            value="12,876.45" 
            change="+0.92%" 
            isPositive={true} 
          />
          
          <IndexCard 
            title="NIFTY PHARMA" 
            value="14,321.60" 
            change="+0.45%" 
            isPositive={true} 
          />
        </div>
        
        <div>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#1f2937'
          }}>
            Most Volatile Stocks
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px'
          }}>
            <VolatileStock name="RELIANCE" change="+2.3%" isPositive={true} />
            <VolatileStock name="HDFC BANK" change="-1.8%" isPositive={false} />
            <VolatileStock name="INFOSYS" change="+3.1%" isPositive={true} />
            <VolatileStock name="TCS" change="-0.9%" isPositive={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for index cards
const IndexCard = ({ title, value, change, isPositive }) => (
  <div style={{
    background: '#f9fafb',
    borderRadius: '12px',
    padding: '16px',
    borderLeft: `4px solid ${isPositive ? '#10b981' : '#ef4444'}`
  }}>
    <div style={{ 
      fontSize: '0.9rem', 
      fontWeight: '600', 
      marginBottom: '8px',
      color: '#4b5563'
    }}>
      {title}
    </div>
    <div style={{ 
      fontSize: '1.5rem', 
      fontWeight: 'bold',
      marginBottom: '4px',
      color: '#1f2937'
    }}>
      {value}
    </div>
    <div style={{ 
      color: isPositive ? '#10b981' : '#ef4444',
      fontWeight: 'bold'
    }}>
      {change}
    </div>
  </div>
);

// Sub-component for volatile stocks
const VolatileStock = ({ name, change, isPositive }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f9fafb',
    padding: '12px 16px',
    borderRadius: '8px',
    borderLeft: `3px solid ${isPositive ? '#10b981' : '#ef4444'}`
  }}>
    <span style={{ fontWeight: '600' }}>{name}</span>
    <span style={{ 
      color: isPositive ? '#10b981' : '#ef4444',
      fontWeight: 'bold'
    }}>
      {change}
    </span>
  </div>
);

export default MarketOverview;