const KiteConnect = require('kiteconnect').KiteConnect;
const KiteTicker = require('kiteconnect').KiteTicker;

const apiKey = process.env.KITE_API_KEY;
const apiSecret = process.env.KITE_API_SECRET;
const redirectUri = process.env.KITE_REDIRECT_URI;

const kc = new KiteConnect({ api_key: apiKey });
let ticker = null;
let isTickerConnected = false;
let lastAccessToken = null;

const getLoginURL = () => kc.getLoginURL();

const generateSession = async (requestToken) => {
  try {
    const session = await kc.generateSession(requestToken, apiSecret);
    kc.setAccessToken(session.access_token);
    lastAccessToken = session.access_token;
    return session;
  } catch (error) {
    throw error;
  }
};

const getQuotes = async (symbols) => {
  try {
    return await kc.getQuote(symbols);
  } catch (error) {
    throw error;
  }
};

const placeOrder = async (orderParams) => {
  try {
    const { symbol, quantity, type } = orderParams;
    const order = await kc.placeOrder('regular', {
      exchange: 'NSE',
      tradingsymbol: symbol,
      transaction_type: type.toUpperCase() === 'BUY' ? 'BUY' : 'SELL',
      quantity: Number(quantity),
      order_type: 'MARKET',
      product: 'CNC',
    });
    return order;
  } catch (error) {
    throw error;
  }
};

// Live market streaming using KiteTicker
let tickListeners = [];

const startWebsocket = (tokens = [], onTick) => {
  if (!lastAccessToken) throw new Error('No access token. Please login to Zerodha first.');
  if (ticker && isTickerConnected) return; // Already running
  ticker = new KiteTicker({ api_key: apiKey, access_token: lastAccessToken });

  ticker.on('ticks', (ticks) => {
    if (onTick) onTick(ticks);
    tickListeners.forEach((cb) => cb(ticks));
  });
  ticker.on('connect', () => {
    isTickerConnected = true;
    if (tokens.length > 0) ticker.subscribe(tokens);
    ticker.setMode(ticker.modeFull, tokens);
    console.log('KiteTicker connected');
  });
  ticker.on('disconnect', () => {
    isTickerConnected = false;
    console.log('KiteTicker disconnected');
  });
  ticker.on('error', (err) => {
    console.error('KiteTicker error:', err);
  });
  ticker.connect();
};

const subscribeToSymbols = (tokens, cb) => {
  if (!ticker || !isTickerConnected) return;
  ticker.subscribe(tokens);
  ticker.setMode(ticker.modeFull, tokens);
  if (cb) tickListeners.push(cb);
};

module.exports = {
  getLoginURL,
  generateSession,
  getQuotes,
  placeOrder,
  startWebsocket,
  subscribeToSymbols,
  kc,
};
