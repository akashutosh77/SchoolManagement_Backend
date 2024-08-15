import express from "express";
import * as masterDataController from "../controllers/masterData"
const masterDataRouter = express.Router();
masterDataRouter.get("", masterDataController.getMasterData);
export default masterDataRouter;
