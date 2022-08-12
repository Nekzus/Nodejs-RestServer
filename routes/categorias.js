import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";

const routerCat = Router();

// Obtener todas las categorias - publico
routerCat.get("/", (req, res) => {
  res.json("get");
});

// Obtener una categoria por id - publico
routerCat.get("/:id", (req, res) => {
  res.json("get - id");
});

// Crear categoria - privado - cualquier persona con un token valido
routerCat.post("/", (req, res) => {
  res.json("post");
});

// Actualizar categoria por id - privado - cualquier persona con un token valido
routerCat.put("/:id", (req, res) => {
  res.json("put");
});

// Borrar categoria por id - privado - Admin
routerCat.delete("/:id", (req, res) => {
  res.json("delete");
});

export default routerCat;
