import React from 'react';

function SectorAnalysis({ onSelectSector }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Sector Analysis</h2>
      </div>
      <div className="card-body">
        <button 
          className="btn btn-primary" 
          onClick={() => onSelectSector('Technology')}
        >
          Analyze Technology Sector
        </button>
      </div>
    </div>
  );
}

export default SectorAnalysis;