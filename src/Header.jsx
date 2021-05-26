import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { setAccessToken } from "./accessToken";
import { ME_ } from "./Queries";
import { LOGOUT_ } from "./Queries";

const Header = () => {
  const { loading, error, data } = useQuery(ME_);
  const [logout, { client }] = useMutation(LOGOUT_);

  if (error) {
    console.log(error);
  }
  console.log(data);
  let body = null;

  if (loading) {
    body = <div>loading...</div>;
  } else if (data && data.me) {
    body = <div>you are logged in as: {data.me.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">Navbar</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/protect">Protected</Link>
            </li>
          </ul>
        </div>
        {body}
        {!loading && data && data.me ? (
          <button
            onClick={async () => {
              await logout();
              setAccessToken("");
              await client.resetStore();
            }}
          >
            logout
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Header;
