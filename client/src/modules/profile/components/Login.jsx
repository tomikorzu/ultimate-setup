import MainLayout from "../../../common/layout/MainLayout";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submitLogin(e) {
    e.preventDefault();
    
  }

  return (
    <MainLayout>
      <form
        className="form-class form"
        id="sign-in-form"
        onSubmit={submitLogin}
      >
        <h2 className="form-title">Sign In</h2>
        <div className="inputs-container">
          <input
            type="text"
            className="input-form input"
            id="email-username"
            placeholder="Email or User Name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            className="input-form input"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type="submit"
          id="submit-signin-btn"
          className="accept-btn form-btn btn"
        >
          Submit
        </button>
        <p className="already-account-p">
          Aleready you do not have an account?
          <button className="already-account-btn" id="go-to-sign-up">
            Sign up
          </button>
        </p>
      </form>
    </MainLayout>
  );
}
