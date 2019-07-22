import { StyleSheet, Dimensions } from "react-native";

const provideStyle = {
  blackColor: "#262626",
  greyColor: "#FAFAFA",
  darkGreyColor: "#999",
  lightGreyColor: "rgb(230, 230, 230)",
  redColor: "#ED4956",
  blueColor: "#3897f0",
  darkBlueColor: "#003569"
};

const commonStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default { commonStyle, provideStyle, width, height };
