const axios = require('axios');
const cheerio = require('cheerio');

// Get real-time NSE data
exports.getLiveNseData = async (symbol) => {
  try {
    const response = await axios.get(`https://www.nseindia.com/api/quote-equity?symbol=${symbol}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    
    return {
      symbol: response.data.info.symbol,
      lastPrice: response.data.priceInfo.lastPrice,
      change: response.data.priceInfo.change,
      pChange: response.data.priceInfo.pChange,
      sector: response.data.metadata.sector
    };
  } catch (error) {
    console.error('NSE API error:', error);
    throw new Error('Failed to fetch NSE data');
  }
};

// Get sector-wise volatility
exports.getSectorVolatility = async () => {
  try {
    const response = await axios.get('https://www.nseindia.com/api/sectorIndices', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    return response.data.map(sector => ({
      name: sector.sectorName,
      change: sector.variability,
      topStocks: sector.topStocks.map(stock => stock.symbol)
    }));
  } catch (error) {
    console.error('Sector data error:', error);
    throw new Error('Failed to fetch sector data');
  }
};