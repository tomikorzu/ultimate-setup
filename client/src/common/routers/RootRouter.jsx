import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "../pages/NotFound";

export default function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
