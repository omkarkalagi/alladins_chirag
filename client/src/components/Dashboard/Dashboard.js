// client/src/components/Dashboard/Dashboard.js
// Add these imports
import SectorAnalysis from './SectorAnalysis';
import AITrading from './AITrading';
import AutoTradePanel from './AutoTradePanel';

// Inside Dashboard component
const [selectedSector, setSelectedSector] = useState(null);
const [selectedStock, setSelectedStock] = useState(null);

// Add to the return statement
<div className="mt-6">
  <SectorAnalysis onSelectSector={setSelectedSector} />
</div>

{selectedSector && (
  <div className="mt-6">
    <AITrading sector={selectedSector} onSelectStock={setSelectedStock} />
  </div>
)}

{selectedStock && (
  <div className="mt-6">
    <AutoTradePanel stock={selectedStock} />
  </div>
)}
- export function Dashboard() { ... }
+ export default function Dashboard() { ... }