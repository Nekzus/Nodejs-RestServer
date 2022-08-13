import { request, response } from "express";
import mongoose from "mongoose";
import { Usuario, Categoria, Producto, Role } from "../models/index.js";
const { ObjectId } = mongoose.Types;

const coleccionesPermitidas = ["usuarios", "productos", "categorias", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    res.json({
      results: usuario ? [usuario] : [],
    });
  }
};

const buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son : ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      break;
    case "productos":
      break;

    default:
      res.status(500).json({
        msg: "Se le olvido hacer esta busqueda",
      });
  }
};

export { buscar };
