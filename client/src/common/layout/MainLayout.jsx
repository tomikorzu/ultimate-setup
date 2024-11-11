import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar
        items={[
          { item: "Home", url: "/" },
          { item: "Dashboard", url: "/dashboard" },
        ]}
      />
      <main className="fade-in">{children}</main>
      <footer></footer>
    </>
  );
}
