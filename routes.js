import express from "express";
import {
  aproveSolicitation,
  createLogin,
  getSolicitations,
  postCompanySolicitation,
  signInlogin,
} from "./controllers/auth.js";
import { getUser, postUser } from "./controllers/users.js";
import { imageUploader } from "./controllers/imageUploader.js";
import { postCompany, putCompany } from "./controllers/companies.js";

const routes = express.Router();
/*SIGNIN*/
routes.post("/login", signInlogin);
routes.post("/create-login", createLogin);
/*USERS*/
routes.post("/users/create", postUser);
routes.get("/users/user", getUser);
/*COMPANIES*/
routes.post("/companies/create", postCompany);
routes.put("/companies/put/:id", putCompany);
routes.get("/companies/get", getUser);
/*UTILS*/
routes.post("/utils/create-solicitation", postCompanySolicitation);
routes.post("/utils/fileUpload", imageUploader);
/*ADEMIRO*/
routes.get("/ademiro/getSolicitations", getSolicitations);
routes.put("/ademiro/putSolicitations/:id", aproveSolicitation);

export default routes;
