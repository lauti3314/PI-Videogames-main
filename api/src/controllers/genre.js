const { allGenres } = require("../utils")
const { Genres } = require("../db")

const findOrCreateGenres = async(req, res) => {
    const genres = await allGenres();
    genres.map(async(g) => {
        await Genres.findOrCreate({ where: { id: g.id, name: g.name } });
    });
    const orderedGenres = genres.sort((a, b) => a.name.localeCompare(b.name))
    res.json(orderedGenres);
}

module.exports = {
    findOrCreateGenres,
};