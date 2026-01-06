import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, upadateComapny } from "../controllers/company.controller.js";

const router = express.Router();
router.route("/register").post(isAuthenticated ,registerCompany)
router.route("/get").get(isAuthenticated, getCompany)
router.route("/get/:id").get(isAuthenticated, getCompanyById)
router.route("/update/:id").put(isAuthenticated, upadateComapny)

export default router