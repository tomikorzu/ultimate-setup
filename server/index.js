import "dotenv/config";
import express from "express";
import morgan from "morgan";

import authRoutes from "./src/routes/authRoutes.js";
import emailRoutes from "./src/routes/emailRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);

app.listen(PORT, () =>
  console.log(`Server running in http://localhost:${PORT}`)
);
