import express from "express"
import { login, logout, register, upateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {singleUpload} from "../middlewares/multer.js";


const router = express.Router();
router.route("/register").post(singleUpload, register)
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, upateProfile)

export default router