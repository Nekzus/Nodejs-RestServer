import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: { type: Boolean, default: true, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  const uid = _id;
  return { uid, ...usuario };
};

export default model("Categoria", CategoriaSchema);
