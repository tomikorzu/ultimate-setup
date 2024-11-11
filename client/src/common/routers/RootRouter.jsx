import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import PostsRouter from "../../modules/posts/routers/PostsRouter.jsx";
import ProfileRouter from "../../modules/profile/routers/ProfileRouter.jsx";

export default function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/*" element={<PostsRouter />} />

        <Route path="/profile/*" element={<ProfileRouter />} />

        <Route
          path="*"
          element={<NotFound props={{ pageName: "Home", pathName: "/" }} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
