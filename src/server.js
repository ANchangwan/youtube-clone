import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;
const app = express();
const logger = morgan("dev");
app.use(logger);

app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/", globalRouter);

const handleListening = () => {
  console.log(`server listening on localhost:${PORT}`);
};

app.listen(PORT, handleListening);