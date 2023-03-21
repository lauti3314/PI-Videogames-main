const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.use("/videogames",videogamesRouter)
router.use("/genres", genresRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
