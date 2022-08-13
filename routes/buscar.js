import { Router } from "express";
import { check } from "express-validator";
import { buscar } from "../controllers/index.js";

const routerBus = Router();

routerBus.get("/:coleccion/:termino", buscar);

export { routerBus };
