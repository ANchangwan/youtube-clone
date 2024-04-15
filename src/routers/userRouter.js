import express from "express";
import {
  remove,
  logout,
  see,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { getUserEdit, postUserEdit } from "../controllers/userController";
import { multerMiddleware, protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getUserEdit)
  .post(multerMiddleware.single("avatar"), postUserEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/delete", remove);
userRouter.get("/:id", see);

export default userRouter;
