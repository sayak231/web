import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { setAccessToken } from "../accessToken";
import { LOGIN_, ME_ } from "../Queries";

const Login = ({ history }) => {
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
