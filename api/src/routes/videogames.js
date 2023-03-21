const express = require("express");
const router = express.Router();
const { findAllVideogames, getVideoGamesById, postVideoGame } = require("../controllers/videogame")

router.get("/", findAllVideogames);
router.get("/:id", getVideoGamesById);
router.post("/", postVideoGame)

module.exports = router;