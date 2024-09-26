import express from "express";
import { userLogin } from "../controller/userLogin.controller.js";

const userLoginRouter = express.Router();

// POST route for user login
userLoginRouter.post('/', userLogin);

export default userLoginRouter;
