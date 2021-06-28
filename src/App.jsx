import React, { useState, useEffect, useContext } from "react";
import { InMemoryCache } from "@apollo/client/cache";
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  Observable,
  HttpLink,
} from "@apollo/client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import Routes from "./Routes";
import { getAccessTokenContext } from "./contexts/accessToken.js";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundImage: theme.palette.spinnerBackground.default,
  },
  circularProgress: {
    color: theme.palette.spinner.main,
  },
}));

const App = () => {
  const { accessToken, setAccessToken } = useContext(getAccessTokenContext());

  const cache = new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: ["id"],
        fields: {
          tasks_assigned: {
            merge(existing = [], incoming) {
              return { ...existing, ...incoming };
              // this part of code is depends what you actually need to do, in my
              // case i had to save my incoming data as single object in cache
            },
          },
        },
      },
    },
  });

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle;
        Promise.resolve(operation)
          .then((operation) => {
            if (accessToken) {
              operation.setContext({
                headers: {
                  authorization: `Bearer ${accessToken}`,
                },
              });
            }
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

  const client = new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([
      new TokenRefreshLink({
        accessTokenField: "accessToken",
        isTokenValidOrUndefined: () => {
          if (!accessToken) {
            return true;
          }
          try {
            const { exp } = jwtDecode(accessToken);
            if (Date.now() >= exp * 1000) {
              return false;
            } else {
              return true;
            }
          } catch {
            return false;
          }
        },
        fetchAccessToken: () => {
          return fetch("http://localhost:4000/refresh_token", {
            method: "POST",
            credentials: "include",
          });
        },
        handleFetch: (accessToken) => {
          setAccessToken(accessToken);
        },
        handleError: (err) => {
          console.warn("Your refresh token is invalid. Try to relogin");
          console.error("index err", err);
        },
      }),
      requestLink,

      new HttpLink({
        uri: "http://localhost:4000/graphql",
        credentials: "include",
      }),
    ]),
    cache,
  });
  const [loading, setLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress className={classes.circularProgress} />
      </Backdrop>
    );
  }
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};

export default App;
