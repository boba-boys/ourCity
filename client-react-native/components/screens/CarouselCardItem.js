import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({ item, index }) => {
  const onPressCard = () => {
    console.warn('hah!')
    //we want to update the groupId.
    //upon pressing the card, we want the carousel to disappear via conditional rendering.
    // setCarouselStatus(false)
  };

  return (
    <View onPress={onPressCard} style={styles.container} key={index}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.header}>{item.name}</Text>
      {/* <Text style={styles.body}>{item.body}</Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10,
    textAlign: "left",

  },
  body: {
    color: "#222",
    fontSize: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem;
