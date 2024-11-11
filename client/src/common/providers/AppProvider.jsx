import ProfileContextProvider from "../../modules/profile/providers/ProfileContextProvider";
import RootRouter from "../routers/RootRouter";

export default function AppProvider() {
  return (
    <ProfileContextProvider>
      <RootRouter />
    </ProfileContextProvider>
  );
}
