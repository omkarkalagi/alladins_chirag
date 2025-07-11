import React from 'react';

function SectorAnalysis({ onSelectSector }) {
  const sectors = [
    'Technology', 'Finance', 'Healthcare', 
    'Energy', 'Consumer Goods', 'Utilities'
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h2>Sector Analysis</h2>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-4">
          {sectors.map((sector) => (
            <button
              key={sector}
              className="btn btn-primary"
              onClick={() => onSelectSector(sector)}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SectorAnalysis;