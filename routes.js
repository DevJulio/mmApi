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
  getUrlCompanyData,
  postCompany,
  putCompany,
} from "./controllers/companies.js";
import {
  deleteCateSolicitations,
  getCateSolicitations,
  getCategories,
  getMyCategories,
  postCategory,
  putCategories,
} from "./controllers/categories.js";
import {
  createSubColections,
  putSubColections,
} from "./controllers/subColections.js";
import { getMyFoods } from "./controllers/foods.js";

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
routes.get("/companies/data", getUrlCompanyData);

/*CATEGORIES*/
routes.get("/categories", getCategories);
routes.get("/categories/my-categories", getMyCategories);
routes.get("/categories/solicitations", getCateSolicitations);
routes.post("/categories/create", postCategory);
routes.put("/categories/put/:docId", putCategories);
routes.delete("/categories/delete/:docId", deleteCateSolicitations);
/*FOODS*/
routes.get("/foods/my-foods", getMyFoods);

/*UTILS*/
routes.post("/utils/create-solicitation", postCompanySolicitation);
routes.post("/utils/fileUpload", imageUploader);
routes.post("/utils/create-sub", createSubColections);
routes.put("/utils/put-sub/:docId", putSubColections);

/*ADEMIRO*/
routes.get("/ademiro/getSolicitations", getSolicitations);
routes.put("/ademiro/putSolicitations/:id", keepSolicitations);

export default routes;
