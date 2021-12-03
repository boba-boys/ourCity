import { CurrentRenderContext } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
// import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import { getTags } from "../../redux/tags";
import CarouselCards from "./CarouselCards";
import getCarouselStatus from "../../redux/carouselStatus";



const HomeScreen = (props) => {
  const tags = useSelector((state) => state.tags);
  const carouselStatus = useSelector((state) => state.carouselStatus);
  console.log('FUCK!', carouselStatus)
  const dispatch = useDispatch();
  const [titleText, setTitleText] = useState("Group Name");
  // const [CarouselStatus, setCarouselStatus] = useState(false);

  const onPressGroup = () => {
    //upon pressing the group name, we want the carousel to pop up via conditional rendering.
    dispatch(getCarouselStatus(carouselStatus))
  };

  const onPressMap = () => {
    //upon pressing the group name, we want the carousel to pop up via conditional rendering.
    dispatch(getCarouselStatus(carouselStatus))
  };

  // const [tags, setTags] = useState([]);

  useEffect((groupId) => {

    dispatch(getTags(1)); // Hard coded group id
  }, []);

  return (
    <>
      {!tags ? (
        <Text>Loading</Text>
      ) : (
        <MapView
          onPress = {onPressMap}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            // This has to be current location
            latitude: 40.7091089,
            longitude: -74.0058052,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Text style={styles.titleText} onPress={onPressGroup}>
            {titleText}
          </Text>

          <View>
          {carouselStatus === true
           ? (<CarouselCards />)
           : null
          }
        </View>




          {tags.map((tag) => {
            return (
              <Marker
                key={tag.id}
                coordinate={{
                  latitude: tag.latitude,
                  longitude: tag.longitude,
                }}
                title={tag.name}
                description={tag.description}
              />
            );
          })}
        </MapView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  titleText: {
    paddingTop: 50,
    // fontFamily: "Cochin",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  megaButton: {
    backgroundColor: 'white',
    width: 100,
    shadowColor: "black",
  }
});

export default HomeScreen;
