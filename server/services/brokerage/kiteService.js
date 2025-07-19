const KiteConnect = require('kiteconnect').KiteConnect;
const User = require('../../models/User');

const apiKey = process.env.KITE_API_KEY;
const kite = new KiteConnect({ api_key: apiKey });

module.exports = {
  getAccessToken: async (userId) => {
    const user = await User.findById(userId);
    if (!user || !user.brokerage.accessToken) {
      throw new Error('Zerodha access token not found');
    }
    kite.setAccessToken(user.brokerage.accessToken);
    return user.brokerage.accessToken;
  },

  generateLoginURL: () => {
    return kite.getLoginURL();
  },

  generateSession: async (requestToken, userId) => {
    const session = await kite.generateSession(requestToken, process.env.KITE_API_SECRET);
    await User.findByIdAndUpdate(userId, {
      'brokerage.accessToken': session.access_token,
      'brokerage.refreshToken': session.refresh_token
    });
    return session;
  },

  getLiveData: async (instruments) => {
    return await kite.getLTP(instruments);
  },

  placeOrder: async (orderParams) => {
    return await kite.placeOrder(orderParams);
  },

  getHistoricalData: async (instrumentToken, interval, from, to) => {
    return await kite.getHistoricalData(instrumentToken, interval, from, to);
  }
};