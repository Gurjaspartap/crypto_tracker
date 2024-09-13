import CryptoData from "../modals/cryptoData.modal.js";
import axios from "axios";
async function fetchAndStoreData() {
  try {
    // Fetch data from WazirX API
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");

    // Get all tickers from the response
    const allTickers = response.data;

    // Select only the first 10 tickers
    const top10Tickers = [];
    let count = 0;
    for (let symbol in allTickers) {
      if (count < 10) {
        top10Tickers.push(allTickers[symbol]);
        count++;
      } else {
        break;
      }
    }

    // Clear existing data in the database
    await CryptoData.deleteMany({});

    // Store new data in the database
    for (const ticker of top10Tickers) {
      const cryptoData = new CryptoData({
        name: ticker.name,
        last: ticker.last,
        buy: ticker.buy,
        sell: ticker.sell,
        volume: ticker.volume,
        base_unit: ticker.base_unit,
      });
      await cryptoData.save();
    }

    console.log("Data fetched and stored successfully");
  } catch (error) {
    console.error("Error fetching or storing data:", error);
  }
}
export default fetchAndStoreData;
//
// async function fetchAndStoreData() {
//   try {
//     const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
//     const tickers = Object.values(response.data).slice(0, 10);

//     await CryptoData.deleteMany({});

//     for (const ticker of tickers) {
//       const cryptoData = new CryptoData({
//         name: ticker.name,
//         last: ticker.last,
//         buy: ticker.buy,
//         sell: ticker.sell,
//         volume: ticker.volume,
//         base_unit: ticker.base_unit
//       });
//       await cryptoData.save();
//     }

//     console.log('Data fetched and stored successfully');
//   } catch (error) {
//     console.error('Error fetching or storing data:', error);
//   }
// }
