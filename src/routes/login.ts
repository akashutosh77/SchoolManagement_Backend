import express from "express";
import * as loginController from "../controllers/login"
const loginRouter = express.Router();
loginRouter.get("", loginController.getLoginDetails);
loginRouter.get("/getLoginDetailsByEmail", loginController.getLoginDetailsByEmail);
export default loginRouter;