const { getAllVideogames, getVideoGameAPi, getDBVideogames } = require("../utils")
const {Videogame, Genres}=require("../db")

const findAllVideogames = async(req, res) => {

    try {
        const { name } = req.query;
        let allGames = await getAllVideogames();
        if (name) {
            let gamesName = allGames.filter(game => game.name.toLowerCase().includes(name.toLowerCase())).slice(0, 15)
            gamesName.length > 0 ?
                res.status(200).json(gamesName) :
                res.status(400).json("Videogame not found")
        }
    } catch (error) {
        console.log(error);
    }
    let videogames = await getAllVideogames();
    res.send(videogames)
}

const getVideoGamesById = async(req,res)=>{
    const id = req.params.id;
    if(id.includes("-")){
        try{
            const game = await getDBVideogames(id)
            res.status(200).json(game)
        } catch(e){
            res.status(404).send("No se encontro el videojuego creado en DB")
        }
    }
    else{
        try{
            const game = await getVideoGameAPi(id)
            const data = game.data;
            let deteailGame ={
             id: data.id,
             name: data.name,
             description: data.description,
             released: data.released,
             background_image: data.background_image,
             rating: data.rating,
             genres: data.genres.map((ele) => {
              return { name: ele.name };
            }),
            platforms: data.platforms.map((ele) => {
              return ele.platform.name ; 
            }),
          };
          res.status(200).json(deteailGame)
        }
        catch(e){
            res.status(404).send("No se encontro el videojuego")
        }
    }
}

const postVideoGame = async(req, res) => {
    const { name, description, image, released, rating, platforms, genres } = req.body;

    let platformString = platforms.join(', ')
  
    let gameCreated = await Videogame.create({
      name,
      description,
      image, 
      released,
      rating,
      platforms: platformString,
    })
  
    genres.forEach(async (G) => {
        let genresGame = await Genres.findOne({ where: { name: G } })
        await gameCreated.addGenre(genresGame)
    })
      res.send('Videogame created successfully!')
}

module.exports = {
    findAllVideogames,
    getVideoGamesById,
    postVideoGame
};