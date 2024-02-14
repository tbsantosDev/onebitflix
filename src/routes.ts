import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { courseController } from "./controllers/coursesController";

const router = express.Router()

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

router.get('/courses/:id', courseController.show)

export { router }