import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { setAccessToken } from "../accessToken";
import { ME_ } from "../Header";

const Login = ({ history }) => {
  const LOGIN_ = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        user {
          id
          firstname
          lastname
          email
        }
        accessToken
      }
    }
  `;

  const updateCache = (cache, { data }) => {
    if (!data) {
      return null;
    }
    cache.writeQuery({
      query: ME_,
      data: {
        me: data.login.user,
      },
    });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_, {
    onError: (err) => {
      console.log("onError", err);
    },
    update: updateCache,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
          const response = await loginUser({
            variables: { email, password },
          });
          if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
          }
          history.push("/");
        } catch (e) {
          console.error("error", e);
        }
      }}
    >
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button disabled={loading} type="submit">
        login
      </button>
    </form>
  );
};

export default Login;
