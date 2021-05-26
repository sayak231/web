import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { setAccessToken } from "../accessToken";
import { LOGIN_, ME_ } from "../Queries";
import Log from "../components/Login";
import { getErrorMessage } from "../utils/getError";

const Login = ({ history }) => {
  const [error, setError] = useState("");
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
      setError(getErrorMessage(err));
    },
    update: updateCache,
  });

  const handleSubmit = async (email, password) => {
    try {
      const response = await loginUser({
        variables: { email, password },
      });
      if (response && response.data) {
        setAccessToken(response.data.login.accessToken);
      }
      history.push("/protect");
    } catch (e) {
      console.error("error", e);
    }
  };

  return (
    <Log loading={loading} handleSubmit={handleSubmit} graphQlError={error} />
  );
};

export default Login;
