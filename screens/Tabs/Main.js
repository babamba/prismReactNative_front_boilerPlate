import React, { useState, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";

// element

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Main_Text = styled.Text`
  font-size: 40px;
`;

const Sub_Text = styled.Text`
  font-size: 20px;
`;

export const TEST_QUERY = gql`
  {
    sayHello
  }
`;

// return view
export default () => {
  const [isReady, setIsReady] = useState(false);

  const { loading, data, error } = useQuery(TEST_QUERY, {
    fetchPolicy: "network-only"
  });

  // Component Did Mount 스크린이 붙고 난 후.
  useEffect(() => {
    console.log("mount screen ");
  }, []);

  // Component State Effect
  useEffect(() => {
    console.log("isReady ? : ", isReady);
  }, [isReady]);

  // Data Loading Effect
  useEffect(() => {
    if (loading) {
      console.log("data loading");
    }
    if (data) {
      if (data.sayHello) {
        console.log("load complete data : ", data);
        setIsReady(true);
      }
    }
  }, [data]);

  return (
    <View>
      <Main_Text>Main</Main_Text>
      {loading ? <Loader /> : data && <Sub_Text>{data.sayHello}</Sub_Text>}
    </View>
  );
};
