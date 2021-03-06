import React, { useEffect } from "react";
import { useIsLoggedIn } from "../AuthContext";
//import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";
import Loader from "./Loader";

export default () => {
  const isLoggedIn = useIsLoggedIn();

  // const {
  //   data: recom_data,
  //   loading: recom_loading,
  //   error: recom_error
  // } = useQuery(RECOMMEND_USER, {
  //   fetchPolicy: "network-only"
  // });

  // const {
  //   data: plan_data,
  //   loading: plan_loading,
  //   error: plan_error
  // } = useQuery(SEE_PLAN, {
  //   fetchPolicy: "network-only"
  // });

  useEffect(() => {
    if (isLoggedIn) {
      console.log("log in user ");
    } else {
      console.log("log out user ");
    }
  }, [isLoggedIn]);

  // if (isLoggedIn) {
  //   console.log("isLoggedin");

  //   // useEffect(() => {
  //   //   const onCompleted = data => {
  //   //     console.log("onCompleted recommend ");
  //   //   };
  //   //   const onError = error => {
  //   //     console.log("error initial load data");
  //   //   };
  //   //   if (onCompleted || onError) {
  //   //     if (onCompleted && !recom_loading && !recom_error) {
  //   //       onCompleted(data);
  //   //     } else if (onError && !recom_loading && recom_error) {
  //   //       onError(error);
  //   //     }
  //   //   }
  //   // }, [recom_loading, recom_error]);

  //   // useEffect(() => {
  //   //   const onCompleted = data => {
  //   //     console.log("onCompleted plan ");
  //   //   };
  //   //   const onError = error => {
  //   //     console.log("error initial load data");
  //   //   };
  //   //   if (onCompleted || onError) {
  //   //     if (onCompleted && !plan_loading && !plan_error) {
  //   //       onCompleted(data);
  //   //     } else if (onError && !plan_loading && plan_error) {
  //   //       onError(error);
  //   //     }
  //   //   }
  //   // }, [plan_loading, plan_error]);

  //   //return recom_loading || plan_loading ? <Loader /> : <MainNavigation />;
  // } else {
  //   console.log("Log in please");
  //   //return <AuthNavigation />;
  // }`

  // return isLoggedIn ? (
  //   recom_loading ? (
  //     <Loader />
  //   ) : (
  //     <MainNavigation />
  //   )
  // ) : (
  //   <AuthNavigation />
  // );

  //return isLoggedIn ? <MainNavigation /> : <AuthNavigation />;
  return <MainNavigation />;
};
