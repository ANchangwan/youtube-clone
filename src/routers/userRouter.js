import express from "express";
import {
  remove,
  logout,
  see,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { getUserEdit, postUserEdit } from "../controllers/userController";
import { protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").get(getUserEdit).post(postUserEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/delete", remove);
userRouter.get(":id(\\d+)", see);

export default userRouter;
