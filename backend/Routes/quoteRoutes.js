const express = require("express");
const quoteController = require("../Controllers/quoteController");
const { getTodayQuote, getRandomQuote } = quoteController;

const router = express.Router();

// Get today's quote
router.get("/today", getTodayQuote);

// Get random quote
router.get("/random", getRandomQuote);

module.exports = router;
