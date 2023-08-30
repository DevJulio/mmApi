import express from "express";
import {
  createLogin,
  getSolicitations,
  keepSolicitations,
  postCompanySolicitation,
  signInlogin,
} from "./controllers/auth.js";
import { getUser, postUser, putUser } from "./controllers/users.js";
import { imageUploader } from "./controllers/imageUploader.js";
import {
  getCompany,
  getUrlCompany,
  postCompany,
  putCompany,
} from "./controllers/companies.js";
import {
  getCategories,
  postCategory,
  putCategories,
} from "./controllers/categories.js";

const routes = express.Router();
/*SIGNIN*/
routes.post("/login", signInlogin);
routes.post("/create-login", createLogin);
/*USERS*/
routes.post("/users/create", postUser);
routes.get("/users/user", getUser);
routes.put("/users/put/:uid", putUser);

/*COMPANIES*/
routes.post("/companies/create", postCompany);
routes.put("/companies/put/:id", putCompany);
routes.get("/companies/company", getCompany);
routes.get("/companies/url", getUrlCompany);
/*CATEGORIES*/
routes.get("/categories", getCategories);
routes.post("/categories/create", postCategory);
routes.put("/categories/put/:docId", putCategories);
/*UTILS*/
routes.post("/utils/create-solicitation", postCompanySolicitation);
routes.post("/utils/fileUpload", imageUploader);
/*ADEMIRO*/
routes.get("/ademiro/getSolicitations", getSolicitations);
routes.put("/ademiro/putSolicitations/:id", keepSolicitations);

export default routes;
