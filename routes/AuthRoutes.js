import express from "express";
import {login, logout, register} from "../controllers/AuthController.js";

const authRoutes = express.Router();

authRoutes.route('/login')
    .post(login)
authRoutes.route('/register')
    .post(register)
authRoutes.route('/logout')
    .get(logout)

export default authRoutes;