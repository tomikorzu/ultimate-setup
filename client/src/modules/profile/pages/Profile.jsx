import Login from "../components/Login";
import MainLayout from "../../../common/layout/MainLayout";
import useProfile from "../hooks/useProfile";

export default function Profile() {
  const user = useProfile();
  return (
    <MainLayout>{user ? <h1>Hello {user.username}</h1> : <Login />}</MainLayout>
  );
}
