import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar
        items={[
          { item: "Home", url: "/" },
          { item: "Dashboard", url: "/dashboard" },
          { item: "Posts", url: "/posts" },
        ]}
      />
      <main className="fade-in">{children}</main>
    </>
  );
}
