import { request, response } from "express";
import Categoria from "../models/categoria.js";

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json({
      msg: "La categoria ya existe",
    });
  }

  try {
    // Crear data a guardar
    const data = {
      nombre,
      usuario: req.usuario._id,
    };
    // Guardar en la base de datos
    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json({
      categoria,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo salio mal",
    });
  }
};

export { crearCategoria };
