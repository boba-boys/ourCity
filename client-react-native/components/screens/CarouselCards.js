import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { getGroups } from "../../redux/groups";
import { getStatus } from "../../redux/carouselStatus";
import { getTags } from "../../redux/tags";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get('window').height; 
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.38);

//We can add pagination so users can skip to a certain item in the carousel without having to swipe continuously.  Below I create a state to store the current pagination index.

const CarouselCards = (props) => {
  const isCarousel = useRef(null);
  const CarouselStatus = useSelector((state) => state.carouselStatus);
  const usersGroups = useSelector((state) => state.groups);
  const dispatch = useDispatch();

  //below is a hook called useEffect (similar to component did mount) that gets called when the component initially renders.
  // useEffect(() => {
  //   console.log('---------------------ComponentDidMount:--------------------')
  //   dispatch(getGroups(1)); // userId hard coded
  // }, []);

  const CarouselCardItem = ({ index, item }) => {
    return (
      <View style={styles.container} key={item.id} >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
        />
        <Text style={styles.header} onPress={() => handlePress(item.id)}>{item.name}</Text>
        <Text style={styles.body} onPress={() => handlePress(item.id)}>{item.body}</Text>
      </View>
    )
  }

  const handlePress = (groupId) => {
    dispatch(getStatus(CarouselStatus));
    dispatch(getTags(groupId))
  }

  return (
    <View /* style={styles.container} */>
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
  // container: {
  //   flex: 1,
  //   //   width: 350,
  //   //   height: 400,
  //   backgroundColor: 'white',
  //   //   alignItems: 'center',
  //   //   justifyContent: 'center',
  //   //   padding: 25,
  //   //   opacity:100,
  //   //   marginBottom:305,
  // },
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
  // container: {
  //   width: 350,
  //   height: 460,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   padding: 0,
  //   opacity: 100,
  //   marginBottom: 0,
  // },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    paddingBottom: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 150,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  }
})

export default CarouselCards;
