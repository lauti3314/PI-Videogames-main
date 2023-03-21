require("dotenv").config();
const { API_KEY} = process.env;
const axios = require("axios");
const {Videogame, Genres} = require("../db");
const key = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getApiGames = async() => {
    const promises = [
        axios(`https://api.rawg.io/api/games?key=${API_KEY}`),
        axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
        axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
        axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
        axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`),
    ];
    
    let gamesApi = await Promise.all(promises);
    gamesApi = gamesApi.map((el) => el.data.results);
    gamesApi = gamesApi.flat().map((game) => {
        return {
            id: game.id,
            name: game.name,
            rating: game.rating,
            background_image: game.background_image,
            platforms: game.platforms.map((ele) => ele.platform.name),
            screenshot: game.short_screenshots,
            createInDb: false,
            genres: game.genres.map((ele) => {
                return {name: ele.name, id: ele.id}
            })
        }
    });
    return gamesApi;
};

const getDbVideogames = async () => {
    const videogames = await Videogame.findAll({
        include: [{
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }]
    });
    return videogames.map(Videogame => Videogame.dataValues);
};

const getAllVideogames = async () => {
    const apiData = await getApiGames();
    const dbData = await getDbVideogames();
    const videogames = apiData.concat(dbData);
    return videogames;
};

const allGenres = async () => {
    const getGenresApi = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const response = getGenresApi.data.results.map(gen => {
        return {
            id: gen.id,
            name: gen.name,
        }
    })
    return response;
}

const getVideogame = (id) => {
    try {
const idApi = axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}` )
return idApi;
    } catch (e) {
        console.error(e)
    }
}