import { Router } from "express";
import { check } from "express-validator";
import { crearCategoria } from "../controllers/categorias.js";
import { validarCampos, validarJWT } from "../middlewares/index.js";

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
routerCat.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar categoria por id - privado - cualquier persona con un token valido
routerCat.put("/:id", (req, res) => {
  res.json("put");
});

// Borrar categoria por id - privado - Admin
routerCat.delete("/:id", (req, res) => {
  res.json("delete");
});

export default routerCat;
