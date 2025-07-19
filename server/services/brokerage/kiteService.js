const KiteConnect = require('kiteconnect').KiteConnect;

const apiKey = process.env.KITE_API_KEY;
const kite = new KiteConnect({
  api_key: apiKey
});

// Store access tokens in DB (simplified)
let accessToken = '';

module.exports = {
  login: (requestToken) => {
    return kite.generateSession(requestToken, process.env.KITE_API_SECRET)
      .then(session => {
        accessToken = session.access_token;
        kite.setAccessToken(accessToken);
        return session;
      });
  },
  
  getLiveData: (instruments) => {
    return kite.getLTP(instruments);
  },
  
  placeOrder: (orderParams) => {
    return kite.placeOrder(orderParams);
  },
  
  getHistoricalData: (symbol, interval) => {
    return kite.getHistoricalData(
      `NSE:${symbol}`,
      interval,
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days back
      new Date(),
      true
    );
  }
};