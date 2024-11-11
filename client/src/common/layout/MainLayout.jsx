import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar
        items={[
          { item: "Home", url: "/" },
          { item: "Dashboard", url: "/dashboard" },
          { item: "Posts", url: "/posts" },
          { item: "Profile", url: "/profile" },
        ]}
      />
      <main className="fade-in">{children}</main>
    </>
  );
}
