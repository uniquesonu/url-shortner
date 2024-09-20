const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const customShortId = req.body.shortID; // Use the correct key 'shortID'
  const shortId = customShortId || shortid.generate(); // If customShortId is provided, use it; otherwise, generate a new one
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "url is required" });

  // Check if the custom short ID is already in use
  if (customShortId) {
    const existing = await URL.findOne({ shortID: customShortId });
    if (existing) {
      return res.status(400).json({ error: "Custom short ID already in use" });
    }
  }

  await URL.create({
    shortID: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(201).json({ shortId });
}

async function handleGetAnalytics(req, res) {
  const shortID = req.params.shortId;
  const result = await URL.findOne({ shortID });
  res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
