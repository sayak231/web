import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { getAccessTokenContext } from "../contexts/accessToken.js";
import { LOGIN_, ME_ } from "../Queries";
import Log from "../components/Login";
import { getErrorMessage } from "../utils/getError";
import { Redirect } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const { setAccessToken } = useContext(getAccessTokenContext());
  const [shouldRedirect, setShouldRedirect] = useState(false);
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

  const [loginUser, { loading, error }] = useMutation(LOGIN_, {
    update: updateCache,
  });

  const handleSubmit = async (email, password) => {
    try {
      const response = await loginUser({
        variables: { email, password },
      });
      if (response && response.data) {
        setAccessToken(response.data.login.accessToken);
        setIsLoggedIn(true);
        setShouldRedirect(true);
      }
    } catch (e) {
      console.error("error", e);
    }
  };
  if (shouldRedirect) return <Redirect to="/dashboard" />;
  return (
    <Log
      loading={loading}
      handleSubmit={handleSubmit}
      graphQlError={error ? getErrorMessage(error) : null}
    />
  );
};

export default Login;
