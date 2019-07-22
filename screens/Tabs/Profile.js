import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import Carousel from "../../components/Carousel";
import gql from "graphql-tag";

export const TEST_ENTRY_QUERY = gql`
  {
    getEntry {
      id
      title
      subTitle
      image
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const { data, error, loading } = useQuery(TEST_ENTRY_QUERY, {
    fetchPolicy: "network-only"
  });

  return (
    <View>
      <Text>Profile</Text>
      {loading ? (
        <Loader />
      ) : (
        data && data.getEntry && <Carousel data={data.getEntry} {...data} />
      )}
    </View>
  );
};
