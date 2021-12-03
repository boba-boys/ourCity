import { CurrentRenderContext } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity, Pressable } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";// useSelector is mapState & useDispatch is mapDispatch
import { getTags } from "../../redux/tags";
import TagScreen from './TagScreen';

const HomeScreen = (props) => {
  const tags = useSelector((state) => state.tags);
  const dispatch = useDispatch();
  // let popupRef = useRef();
  const [titleText, setTitleText] = useState("NYC Public Restrooms");// This is the name of the group
  const [CarouselStatus, setCarouselStatus] = useState(false);
  const [tagView, setTagView] = useState(false);

  const onPressGroup = () => {
    //upon pressing the group name, we want the carousel to pop up via conditional rendering.
    setTitleText("");
    setCarouselStatus(true)
  };

  // const [tags, setTags] = useState([]);
  useEffect((groupId) => {
    // console.log('Passing through useEffect in App.js');
    dispatch(getTags(1)); // Hard coded group id
  }, []);

  // const handleShow = () => {
  //   setTagView(true);
  // }

  // const handleClose = () => {
  //   setShow(false);
  // }

  // const handleSelection = (event) => {
  //   console.log('This trigers when pressed: ', event.nativeEvent);
  //   // <TouchableOpacity style={styles.overlay}>
  //   //   <Text style={styles.text}>Touchable Opacity</Text>
  //   // </TouchableOpacity>
  //   handleShow();
  // }

  return (
    <>
      {!tags ? (
        <Text>Loading</Text>
      ) : (
        <View style={styles.map}>
          <MapView
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
              {CarouselStatus == true
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
                  onPress={() => { setTagView(!tagView) }}
                />
              );
            })}
          </MapView>
          {/* <TagScreen
            visible={tagView}
            onTouchOutside={null}// How can I do this
          /> */}
          <View style={{ flex: 1, alignItems: "center", position: 'absolute',
    bottom: 50,}}>
            {tagView === true
              ? (<TagScreen
                title="Testing tag view"
                visible={tagView}
                onTouchOutside={null}// How can I do this
              />)
              : null
            }
          </View>
        </View>
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
    fontFamily: "Cochin",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  text: {
    color: 'black'
  }
});

export default HomeScreen;
