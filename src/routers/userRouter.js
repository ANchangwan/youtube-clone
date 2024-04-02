import express from "express";
import {
  remove,
  logout,
  see,
  editProfile,
} from "../controllers/userController";
import { getEdit } from "../controllers/videoController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", getEdit);
userRouter.get("/delete", remove);
userRouter.get(":id(\\d+)", see);

export default userRouter;
