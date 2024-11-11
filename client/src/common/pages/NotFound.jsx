import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";

const NotFound = () => {
  return (
    <main className="main-center fade-in page-404">
      <Navbar
        items={[
          { item: "Home", url: "/" },
          { item: "Dashboard", url: "/dashboard" },
        ]}
      />
      <h1 className="h1-error">404</h1>
      <h2 className="h2-error">ooops ! page not found</h2>
      <p className="p-error">
        Sorry the page you are looking for does not exist, Please return to home
      </p>
      <Link to="/" className="btn error-btn">
        Return Home
      </Link>
    </main>
  );
};

export default NotFound;
