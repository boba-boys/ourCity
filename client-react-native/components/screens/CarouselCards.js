import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import { SafeAreaView, StyleSheet, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";
import CarouselData from "./CarouselData";
import { getGroups } from "../../redux/groups";


//We can add pagination so users can skip to a certain item in the carousel without having to swipe continuously.  Below I create a state to store the current pagination index.

const CarouselCards = () => {
  const isCarousel = useRef(null);
  // const [index, setIndex] = useState(0);
  //might not need the above line.
  const usersGroups = useSelector((state) => state.groups);
  const dispatch = useDispatch();

  //below is a hook called useEffect (similar to component did mount) that gets called when the component initially renders.

  useEffect((userId) => {
    dispatch(getGroups(1));
  }, []);


  return (
    <View style={styles.container}>
      <Carousel
        layout="tinder"
        layoutCardOffset={30}
        ref={isCarousel}
        data={usersGroups}
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
