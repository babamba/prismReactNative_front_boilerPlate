import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { AsyncStorage } from "react-native";
import { ThemeProvider } from "styled-components";

import styles from "./constants/Styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";

import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

// Apollo client
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { setContext } from "apollo-link-context";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo-hooks";
import { onError } from "apollo-link-error";
import { ApolloLink, split, concat } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition, toIdValue } from "apollo-utilities";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [locationStatus, setLocationStatus] = useState(false);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("jwt");
    if (token) {
      return token;
    } else {
      return "";
    }
  };

  const ask = async () => {
    // const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // setNotificationStatus(status);
    // let token = await Notifications.getExpoPushTokenAsync();
    // console.log(token);
    // Notifications.setBadgeNumberAsync(0);

    const { status: locationstatus } = await Permissions.askAsync(
      Permissions.LOCATION
    );
    setLocationStatus(locationstatus);

    console.log("ask ----");
  };

  const preLoad = async () => {
    let token = await getToken();
    try {
      console.log("preLoad start @@@");
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/images/robot-dev.png")]);

      const cache = new InMemoryCache();

      await persistCache({
        cache,
        storage: AsyncStorage
      });

      const httpLink = new HttpLink({
        uri: "http://localhost:4000"
      });

      const wsLink = new WebSocketLink({
        uri: `ws://localhost:4000/`,
        options: {
          connectionParams: {
            Bearer: token
          },
          reconnect: true
        }
      });

      const authheader = setContext(async (req, { headers }) => {
        const token = await AsyncStorage.getItem("jwt");
        console.log("token", token);
        return {
          headers: {
            // ...headers,
            Authorization: token ? `Bearer ${token}` : ""
          }
        };
      });

      const combinedLinks = split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        httpLink
      );

      const client = new ApolloClient({
        cache,
        link: ApolloLink.from([
          onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
              graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
              );
            if (networkError) console.log(`[Network error]: ${networkError}`);
          }),
          concat(authheader, combinedLinks)
        ])
      });

      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
    //ask(); // if you used App Loading Permission.
  }, []);

  useEffect(() => {
    console.log("Auth effect !");
  }, [isLoggedIn]);

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn} client={client}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
