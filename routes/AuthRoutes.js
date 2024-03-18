import express from "express";
import {
    getOauthAppDetails,
    handleGoogleCallbackAndExchangeCodes,
    login,
    logout,
    register
} from "../controllers/AuthController.js";

const authRoutes = express.Router();

authRoutes.route('/login')
    .post(login)
authRoutes.route('/register')
    .post(register)
authRoutes.route('/logout')
    .get(logout)
authRoutes.route('/oauthDetails')
    .get(getOauthAppDetails)

authRoutes.route('/oauth/callback')
    .get(handleGoogleCallbackAndExchangeCodes)
export default authRoutes;