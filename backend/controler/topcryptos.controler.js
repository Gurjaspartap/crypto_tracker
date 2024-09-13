import CryptoData from "../modals/cryptoData.modal.js";

const getData = async (req, res) => {
  try {
    const cryptoData = await CryptoData.find({});
    res.json(cryptoData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};
export default getData;
