import { response } from "express";
import bcryptjs from "bcryptjs";
import Usuario from "../models/usuario.js";
import generarJWT from "../helpers/generar-jwt.js";

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "El usuario/password no son correctos - email",
      });
    }

    // Verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "El usuario/password no son correctos - estado: false",
      });
    }

    // Verificar si el password es correcto
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "El usuario/password no son correctos - password",
      });
    }

    // Crear el JWT
    const token = await generarJWT(usuario.id);
    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo salio mal",
    });
  }
};

export { login };
