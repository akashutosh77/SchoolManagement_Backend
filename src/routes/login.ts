import express from "express";
import * as loginController from "../controllers/login"
const loginRouter = express.Router();
loginRouter.post("", loginController.getLoginDetails);
export default loginRouter;