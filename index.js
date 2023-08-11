// Node imports
import express from "express";
import dotEnv from "dotenv";
import cors from "cors";

// Configurando variáveis de ambiente
dotEnv.config();

// App imports
import home from "./controllers/home.js";
import registerUser from "./controllers/registerUser.js";
import getUsers from "./controllers/getUsers.js";
import getUser from "./controllers/getUser.js";
import updateUser from "./controllers/updateUser.js";
import deleteUser from "./controllers/deleteUser.js";
import routes from "./routes.js";
import bodyParser from "body-parser";

// App e Middlewares
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));

// Rotas
app.use("/api", routes);

// Iniciando servidor
app.listen(process.env.PORT, () =>
  console.log("App is listening on url http://localhost:" + process.env.PORT)
);
