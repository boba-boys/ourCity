import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const groupId = 2;

const getTags = async (id) => {
  try {
    //console.log("getTags");
    const response = await axios.get(`http://10.0.2.15:1337/api/tags/1`);
    //console.log("please work, front end", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export function App(props) {

  // async componentDidMount() {
  //   const list = await getTags(groupId);

  //   this.setState({ tags: list });
  //   console.log("Setting state in comp did mount", this.state);
  // }
  const [tags, setTags] = useState([]);

  // useEffect(async () => {
  //   console.log('Passing through useEffect in App.js');
  //   // const tagsFromServer = await axios.get(`http://10.0.2.15:1337/api/tags/`);
  //   const tagsFromServer= await fetch('http://10.0.2.15:1337/api/tags/');
  //   console.log('This is tagsFromServer variable: ', tagsFromServer);
  //   setTags(tagsFromServer);
  // }, []);

  return (
    // const tags = this.state.tags;
    <>
      {
        (!tags) ? <Text >Loading</Text> :
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* {tags.map((tag) => {
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
          })} */}
          </MapView>
      }
    </>
  )
}

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
  },
});

export default /* connect(null,null) */(App);