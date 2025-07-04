import express from "express";
import dotenv from "dotenv";

import { connectToDB } from "./database/db.js";

import { router as authRouter } from "./routes/auth_routes.js";
import { router as dashRouter } from "./routes/market_route.js";
import { router as profileRouter} from "./routes/profile_route.js";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

connectToDB();
app.use(express.json());


//routing
app.use("/auth", authRouter);
app.use("/dashboard", dashRouter);
app.use("/profile",profileRouter)

app.listen(PORT, () => {
  console.log(`server is started at port ${PORT}`);
});
