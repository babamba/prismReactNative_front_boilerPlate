import React, { useState, useRef, createRef } from "react";
import Carousel, {
  ParallaxImage,
  Pagination
} from "react-native-snap-carousel";
import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import { withNavigation } from "react-navigation";

const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = props => {
  const SLIDER_1_FIRST_ITEM = 0;

  //   let carouselRef = useRef();
  const [carouselRef, setCarouselRef] = useState(() => createRef());
  const [activeSlide, setActiveSlide] = useState(SLIDER_1_FIRST_ITEM);
  const { data, navigation } = props;

  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Detail");
        }}
      >
        <View style={styles.item}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Image
            source={{
              uri: item.image ? item.image : ""
            }}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Pagination
        dotsLength={props.data.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotColor={"rgba(130, 130, 130, 0.92)"}
        dotStyle={styles.paginationDot}
        inactiveDotColor={"rgba(196, 196, 196, 0.92)"}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={!!carouselRef}
        carouselRef={carouselRef}
      />
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 90}
        data={data}
        renderItem={data => _renderItem(data)}
        hasParallaxImages={false}
        onSnapToItem={index => setActiveSlide(index)}
        layout={"tinder"}
        enableMomentum={true}
        activeAnimationType={"spring"}
        activeSlideAlignment={"center"}
        inactiveSlideScale={0.97}
        activeAnimationOptions={{
          friction: 4,
          tension: 40
        }}
      />
    </View>
  );
};

export default withNavigation(MyCarousel);

const styles = StyleSheet.create({
  container: {},
  item: {
    width: screenWidth - 100,
    height: screenWidth - 30
  },
  imageContainer: {
    flex: 1,
    //     marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white"
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: Platform.select({ ios: 0, android: 1 }) // Prevent a random Android rendering issue
  },
  paginationContainer: {
    //     paddingBottom: 13,
    //     paddingTop: 6,
    paddingVertical: 10
    //     justifyContent: "flex-start"
    //     backgroundColor: "red",
    //     opacity: 0.5
  },
  paginationDot: {
    width: 15,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  }
});
