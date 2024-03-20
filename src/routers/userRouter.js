import express from "express";
import { remove, logout, see } from "../controllers/userController";
import { edit } from "../controllers/videoController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get(":id(\\d+)", see);

export default userRouter;
