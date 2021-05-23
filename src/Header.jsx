import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { setAccessToken } from "./accessToken";

export const ME_ = gql`
  query {
    me {
      id
      firstname
      lastname
      email
    }
  }
`;

const LOGOUT_ = gql`
  mutation {
    logout
  }
`;

const Header = () => {
  const { loading, error, data } = useQuery(ME_);
  const [logout, { client }] = useMutation(LOGOUT_);

  if (error) {
    console.log(error);
  }

  let body = null;

  if (loading) {
    body = <div>loading...</div>;
  } else if (data && data.me) {
    body = <div>you are logged in as: {data.me.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }

  return (
    <div>
      <header>
        <div>
          <Link to="/">home</Link>
        </div>
        <div>
          <Link to="/register">register</Link>
        </div>
        <div>
          <Link to="/login">login</Link>
        </div>
        <div>
          <Link to="/protect">Protected</Link>
        </div>
        <div>
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
      </header>
      {body}
    </div>
  );
};

export default Header;
