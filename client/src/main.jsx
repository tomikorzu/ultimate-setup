import "./common/assets/styles/index.css";

import AppProvider from "./common/providers/AppProvider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>
);
