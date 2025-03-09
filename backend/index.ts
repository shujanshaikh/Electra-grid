import express from "express";
import { authRouter } from "./routes/auth";
import { evStation } from "./routes/evstation";
import { energyRouter } from "./routes/energy";
import { chatBot } from "./routes/chatbot";

const app = express();
app.use(express.json());

app.use("/", authRouter);
app.use("/", energyRouter);
app.use("/", evStation);
app.use("/", chatBot);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});