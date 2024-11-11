import "./common/assets/styles/index.css";

import RootRouter from "./common/routers/RootRouter";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>
);
