import express from "express";
import {getAllUsers, getCurrentUser, getSingleUser, updatePassword, updateUser} from "../controllers/UserController.js";
import {authenticateUser, authorizePermissions} from "../middlewares/AuthenticateUser.js";

const userRouter = express.Router()


userRouter.route('/')
    .get(authenticateUser, authorizePermissions('admin'), getAllUsers)

userRouter.route('/updateUser')
    .post(authenticateUser, updateUser)

userRouter.route('/currentUser')
    .get(authenticateUser, getCurrentUser)

userRouter.route('/updatePassword')
    .post(authenticateUser, updatePassword)

userRouter.route('/:id')
    .get(authenticateUser, getSingleUser)
export default userRouter