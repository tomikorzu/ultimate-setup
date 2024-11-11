import { Route, Routes } from "react-router-dom";

import NotFound from "../../../common/pages/NotFound";
import Profile from "../pages/Profile";

export default function ProfileRouter() {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route
        path="*"
        element={
          <NotFound props={{ pageName: "Profile", pathName: "/profile" }} />
        }
      />
    </Routes>
  );
}
