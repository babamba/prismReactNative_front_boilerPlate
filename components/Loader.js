import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => (
  <Container>
    <ActivityIndicator color={styles.blackColor} />
  </Container>
);

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
});
