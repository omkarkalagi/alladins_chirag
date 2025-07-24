import React, { useEffect, useState } from 'react';

const mockSectors = [
  { name: 'IT', change: 2.8 },
  { name: 'Banking', change: 1.5 },
  { name: 'Pharma', change: -0.7 },
  { name: 'Auto', change: 3.1 },
  { name: 'FMCG', change: 0.9 },
];

const SectorPerformance = () => {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    // Replace with live API call for real data
    setSectors(mockSectors);
  }, []);

  return (
    <div className="sector-performance card">
      <h2>Sector Performance</h2>
      <ul>
        {sectors.map((sector) => (
          <li key={sector.name} style={{ color: sector.change > 0 ? 'green' : 'red' }}>
            {sector.name}: {sector.change > 0 ? '+' : ''}{sector.change}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectorPerformance; 