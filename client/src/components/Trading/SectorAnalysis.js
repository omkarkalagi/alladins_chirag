import React, { useState } from 'react';

const SectorAnalysis = () => {
  const [sectors] = useState([
    { name: 'Technology', performance: 8.2, volatility: 3.4 },
    { name: 'Healthcare', performance: 5.6, volatility: 2.1 },
    { name: 'Financials', performance: 4.3, volatility: 3.8 },
    { name: 'Consumer Goods', performance: 2.7, volatility: 1.9 },
    { name: 'Energy', performance: -1.2, volatility: 5.2 },
    { name: 'Utilities', performance: 1.5, volatility: 1.2 },
  ]);

  const [selectedSector, setSelectedSector] = useState('Technology');

  return (
    <div className="sector-analysis">
      <h3>Sector Performance Analysis</h3>
      
      <div className="sector-grid">
        {sectors.map(sector => (
          <div 
            key={sector.name}
            className={`sector-card ${selectedSector === sector.name ? 'selected' : ''}`}
            onClick={() => setSelectedSector(sector.name)}
          >
            <h4>{sector.name}</h4>
            <div className={`performance ${sector.performance >= 0 ? 'positive' : 'negative'}`}>
              {sector.performance >= 0 ? '+' : ''}{sector.performance}%
            </div>
            <div className="volatility">
              Volatility: {sector.volatility}%
            </div>
          </div>
        ))}
      </div>

      <div className="sector-details">
        <h4>{selectedSector} Sector Analysis</h4>
        <p>
          The {selectedSector} sector has shown strong growth in the past quarter with increasing institutional investment.
          Top performers include leading companies in innovation and market expansion.
        </p>
        <div className="recommendation">
          <strong>Recommendation:</strong> Overweight
        </div>
      </div>
    </div>
  );
};

export default SectorAnalysis;