import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";
import CarouselData from "./CarouselData";

//We can add pagination so users can skip to a certain item in the carousel without having to swipe continuously.  Below I create a state to store the current pagination index.

const CarouselCards = () => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        layout="tinder"
        layoutCardOffset={30}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root:{
    alignItems:'center',
    padding: 20,
  },
   container: {
    width: 350,
    height: 460,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    opacity:100,
    marginBottom:0,
  },
})

export default CarouselCards;
