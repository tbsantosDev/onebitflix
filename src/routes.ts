//Nas rotas a ordem importa!!!!!!
//Quando tem uma rota dinamica ela sempre tem que está abaixo dos caminhos especificos

import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { courseController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
import { authController } from "./controllers/authController";

const router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

router.get('/courses/featured', courseController.featured)
router.get('/courses/newest', courseController.newest)
router.get('/courses/search', courseController.search)
router.get('/courses/:id', courseController.show)

router.get('/episodes/stream', episodesController.stream)

export { router }