import { Router } from "express";
import { check } from "express-validator";
import { actualizarImagen, cargarArchivo } from "../controllers/index.js";
import { coleccionesPermitidas, existeArchivoPorId } from "../helpers/index.js";
import { validarArchivoSubir, validarCampos } from "../middlewares/index.js";

const routerUp = Router();

routerUp.post("/", validarArchivoSubir, cargarArchivo);

routerUp.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El id es obligatorio").custom(existeArchivoPorId),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagen
);

export { routerUp };
