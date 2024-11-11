import "dotenv/config";

import authRoutes from "./src/routes/authRoutes.js";
import cookieParser from "cookie-parser";
import emailRoutes from "./src/routes/emailRoutes.js";
import express from "express";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);

app.listen(PORT, () =>
  console.log(`Server running in http://localhost:${PORT}`)
);
