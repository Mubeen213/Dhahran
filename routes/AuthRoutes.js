import express from "express";
import {login, logout, register, verifyEmail} from "../controllers/AuthController.js";

const authRoutes = express.Router();

authRoutes.route('/login')
    .post(login)
authRoutes.route('/register')
    .post(register)
authRoutes.route('/logout')
    .get(logout)
authRoutes.route('/verify-email')
    .post(verifyEmail)
export default authRoutes;