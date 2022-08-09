import mongoose from "mongoose";
import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la BD`);
  }
};

const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email: ${email}, ya está registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const existId = await Usuario.findById(id);
    if (!existId) {
      throw new Error(`El id ${id} no existe en la BD`);
    }
  } else {
    throw new Error(`El id ${id} no es válido`);
  }
};

export { esRolValido, emailExiste, existeUsuarioPorId };
