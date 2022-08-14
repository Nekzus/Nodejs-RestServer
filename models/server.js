import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import {
  routerAuth,
  routerBus,
  routerCat,
  routerProd,
  routerUp,
  routerUser,
} from "../routes/index.js";
import { dbConnection } from "../database/config.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      categorias: "/api/categorias",
      productos: "/api/productos",
      uploads: "/api/uploads",
      usuarios: "/api/usuarios",
    };

    // Conectar a la base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();
    // Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, routerAuth);
    this.app.use(this.paths.buscar, routerBus);
    this.app.use(this.paths.categorias, routerCat);
    this.app.use(this.paths.productos, routerProd);
    this.app.use(this.paths.uploads, routerUp);
    this.app.use(this.paths.usuarios, routerUser);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export { Server };
