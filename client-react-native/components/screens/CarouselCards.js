import React from "react";
import { Modal, StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";
import CarouselData from "./CarouselData";

//We can add pagination so users can skip to a certain item in the carousel without having to swipe continuously.  Below I create a state to store the current pagination index.

const CarouselCards = (props) => {
  const { onTouchOutside, visible } = props;

  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={styles.backgroundScreen} />
    if (!onTouch) return view;
    return (
      <TouchableWithoutFeedback onPress={onTouch} style={styles.container}>
        {view}
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.container} >
      <Modal
        transparent={true}
        visible={visible}
      >
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
        {renderOutsideTouchable(onTouchOutside)}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // root: {
  //   alignItems: 'center',
  //   padding: 20,
  // },
  container: {
    flex: 1,
    //   width: 350,
    //   height: 400,
    backgroundColor: 'white',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   padding: 25,
    //   opacity:100,
    //   marginBottom:305,
  },
  backgroundScreen: {
    width: "85%",
    height: '45%',
    marginLeft: 30,
    position: 'absolute',
    justifyContent: 'flex-start', // moves the content respective the main axis
    alignItems: "center",
    bottom: 50,
    backgroundColor: 'blue',
  },
})

export default CarouselCards;
