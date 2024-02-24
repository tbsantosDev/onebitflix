//Nas rotas a ordem importa!!!!!!
//Quando tem uma rota dinamica ela sempre tem que está abaixo dos caminhos especificos

import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { courseController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
import { authController } from "./controllers/authController";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth";
import { favoritesController } from "./controllers/favoritesController";
import { likesController } from "./controllers/likesController";

const router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)

router.get('/courses/featured', ensureAuth, courseController.featured)
router.get('/courses/newest', courseController.newest)
router.get('/courses/popular', ensureAuth, courseController.popular)
router.get('/courses/search', ensureAuth, courseController.search)
router.get('/courses/:id', ensureAuth, courseController.show)

router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)

router.get('/favorites', ensureAuth, favoritesController.index)
router.post('/favorites', ensureAuth, favoritesController.save)
router.delete('/favorites/:id', ensureAuth, favoritesController.delete)

router.post('/likes', ensureAuth, likesController.save)
router.delete('/likes/:id', ensureAuth, likesController.delete)

export { router }