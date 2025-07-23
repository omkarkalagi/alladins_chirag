// websocket.js
// Basic WebSocket server for real-time stock updates

const { Server } = require('socket.io');
const kiteService = require('./services/brokerage/kiteService');

function setupWebsocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  let isKiteStreaming = false;
  let lastTokens = [738561, 2953217]; // Example tokens for NIFTY 50, RELIANCE

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Try to start KiteTicker streaming if not already started
    if (!isKiteStreaming) {
      try {
        kiteService.startWebsocket(lastTokens, (ticks) => {
          io.emit('marketData', { indices: [], gainers: [], losers: [], ticks });
        });
        isKiteStreaming = true;
      } catch (err) {
        // Not authenticated, fallback to dummy data
        const marketInterval = setInterval(() => {
          socket.emit('marketData', {
            indices: [
              { name: 'NIFTY 50', value: 22000 },
              { name: 'SENSEX', value: 73000 },
            ],
            gainers: [
              { symbol: 'RELIANCE', change: 3.2 },
              { symbol: 'TCS', change: 2.8 },
            ],
            losers: [
              { symbol: 'INFY', change: -1.5 },
              { symbol: 'HDFC', change: -1.2 },
            ],
          });
        }, 2000);
        socket.on('disconnect', () => clearInterval(marketInterval));
      }
    }

    // Portfolio and activity can remain dummy for now
    const portfolioInterval = setInterval(() => {
      socket.emit('portfolioUpdate', [
        { symbol: 'RELIANCE', quantity: 10, avgPrice: 2500, currentValue: 2600 * 10 },
        { symbol: 'TCS', quantity: 5, avgPrice: 3500, currentValue: 3550 * 5 },
      ]);
    }, 5000);

    const activityInterval = setInterval(() => {
      socket.emit('recentActivity', [
        'Bought 10 RELIANCE at ₹2500',
        'Sold 2 TCS at ₹3550',
      ]);
    }, 7000);

    socket.on('disconnect', () => {
      clearInterval(portfolioInterval);
      clearInterval(activityInterval);
      console.log('Client disconnected:', socket.id);
    });
  });
}

module.exports = setupWebsocket; 