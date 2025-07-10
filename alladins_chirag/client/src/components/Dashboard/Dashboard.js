import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MarketOverview from './MarketOverview';
import Portfolio from './Portfolio';
import TradingPanel from './TradingPanel';
import TradingInsights from './TradingInsights';
import ActivityLog from './ActivityLog';
import Sidebar from './Sidebar';
import Header from './Header';

const Dashboard = ({ socket }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Listen for real-time market updates
    socket.on('market-update', (data) => {
      setMarketData(data);
    });
    
    // Initial data fetch
    const fetchMarketData = async () => {
      try {
        // In real app, fetch from API
        const mockData = {
          indices: {
            nifty: {
              value: 18432.45,
              change: 0.85
            },
            sensex: {
              value: 62187.34,
              change: 0.92
            }
          },
          stocks: [
            { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2542.75, change: 3.45 },
            { symbol: 'TCS', name: 'Tata Consultancy', price: 3412.50, change: -2.15 },
            { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1642.30, change: 1.87 },
            { symbol: 'INFY', name: 'Infosys', price: 1487.25, change: -1.25 },
            { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 912.45, change: 2.65 }
          ]
        };
        setMarketData(mockData);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };
    
    fetchMarketData();
    
    return () => {
      socket.off('market-update');
    };
  }, [currentUser, navigate, socket]);

  if (!currentUser) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === 'dashboard' && (
            <>
              <MarketOverview marketData={marketData} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2">
                  <Portfolio />
                </div>
                <div className="lg:col-span-1">
                  <TradingPanel />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <TradingInsights />
                <ActivityLog />
              </div>
            </>
          )}
          
          {/* Other tabs would go here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;