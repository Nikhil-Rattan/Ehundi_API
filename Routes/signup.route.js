import express from "express";
import { userSignup, getUsers, getUser, updateUser, deleteUser } from "../controllers/signup.controller.js";

const signupRouter = express.Router();

signupRouter.post('/', userSignup);

signupRouter.get('/', getUsers);

signupRouter.get('/:id', getUser);

signupRouter.put('/:id', updateUser);

signupRouter.delete('/:id', deleteUser);

export default signupRouter;
