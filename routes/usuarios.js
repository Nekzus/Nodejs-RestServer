import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
  emailExiste,
  esRolValido,
  existeUsuarioPorId,
} from "../helpers/db-validators.js";
import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} from "../controllers/usuarios.js";

const router = Router();

router.get("/", usuariosGet);
router.put(
  "/:id",
  [
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExiste),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRolValido),
    validarCampos,
  ],

  usuariosPost
);
router.patch("/", usuariosPatch);
router.delete(
  "/:id",
  [check("id").custom(existeUsuarioPorId), validarCampos],
  usuariosDelete
);

export default router;
