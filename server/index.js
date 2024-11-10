import "dotenv/config";
import express from "express";

import authRoutes from "./src/routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () =>
  console.log(`Server running in http://localhost:${PORT}`)
);
