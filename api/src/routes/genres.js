const express = require("express");
const router = express.Router();
const { findOrCreateGenres } = require("../controllers/genre")

router.get("/", findOrCreateGenres);

module.exports = router;