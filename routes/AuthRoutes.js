
import express from "express";
import {login, register} from "../controllers/AuthController.js";
const authRoutes = express.Router();

authRoutes.route('/login')
        .post(login)
authRoutes.route('/register')
        .post(register)

export default authRoutes;