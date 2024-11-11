import { Route, Routes } from "react-router-dom";

import MainFeed from "../pages/MainFeed";
import NotFound from "../../../common/pages/NotFound";

export default function PostsRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainFeed />} />
      <Route path="*" element={<NotFound props={{pageName: "Posts", pathName: "/posts"}}/>} />
    </Routes>
  );
}
