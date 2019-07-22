import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";
import { useApolloClient } from "react-apollo-hooks";

export const AuthContext = createContext();

export const AuthProvider = ({
  isLoggedIn: isLoggedInProp,
  children
  // client
}) => {
  const client = useApolloClient();
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  // const logoutMutation = useMutation(LOG_OUT, {
  //   fetchPolicy: "no-cache"
  // });

  const logUserIn = async token => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("jwt", token);
      //await client.resetStore();
      //await client.resetStore();
      console.log("jwt : ", token);

      console.log("isLoggedIn : true ");
      setIsLoggedIn(true);
      console.log("login ");
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      // await client.clearStore().then(() => {
      //   client.resetStore();
      //   client.cache.reset();
      // });

      // const logout = await logoutMutation();
      // console.log(logout);
      client.clearStore().then(() => {
        client.resetStore();
      });
      await AsyncStorage.setItem("isLoggedIn", "false");
      await AsyncStorage.setItem("jwt", "");

      //await client.clearStore();

      await setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};
