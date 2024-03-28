const fetch = require("node-fetch");

const getTodayQuote = async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/today");
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getRandomQuote = async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getTodayQuote, getRandomQuote };
