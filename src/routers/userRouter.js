import express from "express";
import { remove, logout, see } from "../controllers/userController";
import { getUserEdit, postUserEdit } from "../controllers/userController";
import { protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").get(getUserEdit).post(postUserEdit);
userRouter.get("/delete", remove);
userRouter.get(":id(\\d+)", see);

export default userRouter;
