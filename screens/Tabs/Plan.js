import React from "react";
import { Button, TouchableOpacity } from "react-native";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => (
  <View>
    <Text>Plan</Text>
    <TouchableOpacity
      //onLongPress={() => testAlert(id)}
      onPress={() => navigation.navigate("Detail")}
      activeOpacity={0.3}
    >
      <Text>Detail Open </Text>
    </TouchableOpacity>
  </View>
);
