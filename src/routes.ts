//Nas rotas a ordem importa!!!!!!
//Quando tem uma rota dinamica ela sempre tem que está abaixo dos caminhos especificos

import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { courseController } from "./controllers/coursesController";

const router = express.Router()

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

router.get('/courses/featured', courseController.featured)
router.get('/courses/:id', courseController.show)

export { router }