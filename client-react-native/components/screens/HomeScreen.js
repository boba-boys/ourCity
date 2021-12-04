import { CurrentRenderContext } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState, } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity, Pressable } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";// useSelector is mapState & useDispatch is mapDispatch
import { getStatus } from "../../redux/carouselStatus";
import { getGroups } from "../../redux/groups";
import { getTags } from "../../redux/tags";
import CarouselCards from "./CarouselCards";
import TagScreen from './TagScreen';

const HomeScreen = (props) => {
  // Hook
  const dispatch = useDispatch();
  // Redux Store (useSelector is Hook!)
  const tags = useSelector((state) => state.tags);
  const CarouselStatus = useSelector((state) => state.carouselStatus);

  // Local State
  const [titleText, setTitleText] = useState("NYC Public Restrooms");// This is the name of the group
  const [tagView, setTagView] = useState(false);
  const [tagId, setTagId] = useState(null);

  // ComponentDidMount
  useEffect(() => {
    dispatch(getTags(1)); // Hard coded groupId
    dispatch(getGroups(1))// Hard code userId
  }, []);
  

  const onPressGroup = () => {
    console.log('Inside onPressGroup before pressing the Group text: ', CarouselStatus);
    //upon pressing the group name, we want the carousel to pop up via conditional rendering.
    dispatch(getStatus(CarouselStatus));
  };

  const onPressMap = () => {
    console.log('Inside onPressMap before pressing the MAP: ', CarouselStatus);
    //upon pressing the group name, we want the carousel to pop up via conditional rendering.
    // dispatch(getStatus(CarouselStatus))
  };

  const handleSelection = (event) => {
    // console.log('This trigers when pressed: ', event.nativeEvent);
    setTagView(!tagView);
    setTagId(event.nativeEvent.id);
    setCarouselStatus(false)
  }

  return (
    <>
      {!tags ? (
        <Text>Loading</Text>
      ) : (
        /* <MapView
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
            <View style={styles.carouselTextContainer}>
              <Text style={styles.titleText} onPress={onPressGroup}>
                {titleText}
              </Text>
              {CarouselStatus == true
                ? (<CarouselCards
                  visible={CarouselStatus}
                  onTouchOutside={() => { setCarouselStatus(!CarouselStatus) }}
                />)
                : null
              }
            </View> */
        < MapView
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
          <View>

            {CarouselStatus == true
              ? (<CarouselCards
              // visible={CarouselStatus}
              // onTouchOutside={() => { setCarouselStatus(!CarouselStatus) }}
              />)
              : null
            }
          </View>
          {tags.map((tag) => {
            return (
              <Marker
                key={`${tag.longitude}_${tag.latitude}`}
                coordinate={{
                  latitude: tag.latitude,
                  longitude: tag.longitude,
                }}
                title={tag.name}
                description={tag.description}
                identifier={`${tag.id}`}
                onPress={handleSelection}
              />
            );
          })}
          <View /* style={styles.tagScreenContainer}  */>
            {tagView === true
              ? (<TagScreen
              // tagId={tagId}
              // title="Testing tag view"
              // visible={tagView}
              // onTouchOutside={() => { setTagView(!tagView) }}
              />)
              : null
            }
          </View>
        </MapView>
      )
      }
    </>
  );
};

const styles = StyleSheet.create({
  // generalContainer: {
  //   flex: 1,
  //   // justifyContent: 'space-between',
  //   // flexDirection: "column",
  //   // height: '100%',
  //   // width: '100%',
  //   // ...StyleSheet.absoluteFillObject,
  // },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: "600",
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: "400",
  // },
  // highlight: {
  //   fontWeight: "700",
  // },
  carouselTextContainer: {
    backgroundColor: 'red',
    width: '60%',
    height: '8%',
    marginTop: 20,
    flexDirection: 'row',
    // justifyContent: "center",
    marginLeft: 70,
  },
  titleText: {
    paddingTop: 50,
    marginLeft: 100,
    fontFamily: "Cochin",
    // alignItems: "center",
    // fontFamily: "Cochin",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
    width: '100%',
    bottom: 0,
  },
  tagScreenContainer: {
    // width: "85%",
    // height: '55%',
    // marginLeft: 30,
    // position: 'absolute',
    // justifyContent: 'flex-start', // moves the content respective the main axis
    // alignItems: "center",
    // bottom: 5,
    // backgroundColor: 'lightblue',
  },
  // overlay: {
  //   position: 'absolute',
  //   bottom: 50,
  //   backgroundColor: 'rgba(255, 255, 255, 1)',
  // },
  text: {
    color: 'black'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // alignItems: "center",
    // flex:1,
  },
  megaButton: {
    backgroundColor: 'white',
    width: 100,
    shadowColor: "black",
  }
});

export default HomeScreen;
