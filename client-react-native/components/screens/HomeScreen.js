import { CurrentRenderContext } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
// import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import { getTags } from "../../redux/tags";
import CarouselCards from "./CarouselCards";
import Menu from "./Menu";
import { MaterialIcons } from "@expo/vector-icons";
import CreateGroup from "./CreateGroup";

const HomeScreen = (props) => {
  const tags = useSelector((state) => state.tags);
  const dispatch = useDispatch();
  const [titleText, setTitleText] = useState("NYC Public Restrooms");
  const [CarouselStatus, setCarouselStatus] = useState(false);
  const [menuStatus, setMenuStatus] = useState(false);
  const [createGroupStatus, setCreateGroupStatus] = useState(false);

  const onPressGroup = () => {
    //upon pressing the group name, we want the carousel to pop up via conditional rendering.
    setCarouselStatus(true);
  };

  const onPressMap = () => {
    //upon pressing the group name, we want the carousel to pop up via conditional rendering.
    setCarouselStatus(false);
    setMenuStatus(false);
    setCreateGroupStatus(false);
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
          onPress={onPressMap}
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

          <View>{CarouselStatus == true ? <CarouselCards /> : null}</View>
          <View>{createGroupStatus === true ? <CreateGroup /> : null}</View>
          <View style={styles.menu}>
            {menuStatus === true ? <Menu /> : null}
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
          <MaterialIcons
            name='menu'
            size={50}
            onPress={() => setCreateGroupStatus(!createGroupStatus)}
            style={{ position: "absolute", bottom: 30, right: 35 }}
          />
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
    backgroundColor: "white",
    width: 100,
    shadowColor: "black",
  },
  menu: {
    top: 550,
    width: "85%",
  },
  createGroup: {
    top: 550,
    width: "85%",
  },
});

export default HomeScreen;
