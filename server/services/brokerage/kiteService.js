const KiteConnect = require("kiteconnect").KiteConnect;

const apiKey = process.env.KITE_API_KEY;
const apiSecret = process.env.KITE_API_SECRET;
const redirectUri = process.env.KITE_REDIRECT_URI;

const kc = new KiteConnect({ api_key: apiKey });

/**
 * Generates login URL for user authentication
 */
const getLoginURL = () => {
  return kc.getLoginURL();
};

/**
 * Generates access token using request token after login
 */
const generateSession = async (requestToken) => {
  try {
    const session = await kc.generateSession(requestToken, apiSecret);
    kc.setAccessToken(session.access_token);
    console.log("Access token set successfully");
    return session;
  } catch (error) {
    console.error("Error generating session:", error);
    throw error;
  }
};

/**
 * Example function to get profile
 */
const getProfile = async () => {
  try {
    const profile = await kc.getProfile();
    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

module.exports = {
  getLoginURL,
  generateSession,
  getProfile,
  kc // export instance if needed elsewhere
};
