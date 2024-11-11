import Navbar from "../layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar
        items={[
          { item: "Home", url: "/" },
          { item: "Dashboard", url: "/dashboard" },
        ]}
      />
      <h1>Home</h1>
    </>
  );
}
