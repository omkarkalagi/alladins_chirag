import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/UI/Header';
import Sidebar from '../components/UI/Sidebar';
import MarketOverview from '../components/Dashboard/MarketOverview';
import Portfolio from '../components/Dashboard/Portfolio';
import TradingPanel from '../components/Trading/TradingPanel';
import ActivityLog from '../components/Dashboard/ActivityLog';
import TradingInsights from '../components/Dashboard/TradingInsights';
import { getPortfolio, getMarketData } from '../services/tradingService';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [portfolio, setPortfolio] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchData = async () => {
      const portfolioData = await getPortfolio(user.id);
      const marketData = await getMarketData();
      setPortfolio(portfolioData);
      setMarketData(marketData);
    };
    
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={user} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MarketOverview data={marketData} />
                <Portfolio portfolio={portfolio} />
              </div>
              <div className="space-y-6">
                <TradingPanel />
                <ActivityLog />
              </div>
            </div>
          )}
          
          {activeTab === 'trading' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* Trading view charts would go here */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4">Trading Terminal</h2>
                  <div className="h-96 bg-gray-100 rounded flex items-center justify-center">
                    Trading Charts Placeholder
                  </div>
                </div>
              </div>
              <div>
                <TradingInsights />
              </div>
            </div>
          )}
          
          {activeTab === 'wallet' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Wallet & Transactions</h2>
              {/* Wallet management UI would go here */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}