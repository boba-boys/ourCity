import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addTagStatusFunc } from "../../redux/addTagStatus";
import { getStatus } from "../../redux/carouselStatus";
import { getTags } from "../../redux/tags";
import { setSearchOnState } from "../../redux/searchResultsOnState";
import { setSearchScreenStatus } from "../../redux/SearchScreenStatus";
import { setPhotoOnState } from "../../redux/setPhotoOnState";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.35);

const CreateTag = () => {
  // Global state
  const userId = useSelector((state) => state.users.id);
  const coordinates = useSelector((state) => state.addTagCoordinates);
  const groupId = useSelector((state) => state.setGroupIdOnState);
  const searchResults = useSelector((state) => state.setSearchResultsOnState);
  const searchResultStatus = useSelector((state) => state.searchScreenStatus);
  const pressedResult = useSelector((state) => state.setPressedSearchResultsOnState);
  const imageFromState = useSelector((state) => state.setPhotoOnStateReducer)

// Local state
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [imageUrlFromPromise, setImageUrlFromPromise] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();



  const onSubmit = async () => {
    // console.log('This should be the Coordinates', pressedResult.place_id);

    let placeDetails = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${pressedResult.place_id}&fields=name%2Crating%2Cformatted_phone_number%2Cformatted_address%2Cphotos%2Cgeometry&key=AIzaSyAmYmN1pMqX1g-igPscaRfmqI7D-TPEhx8`);



    let photoArray = placeDetails.data.result.photos.map((photo) => {
      return photo.photo_reference
    })

    const promisedPhotos = photoArray.map(async (photo) => {
      return await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=AIzaSyAmYmN1pMqX1g-igPscaRfmqI7D-TPEhx8`)
    })
   //  photos[0].config.url this is how to getr the photo
  //  setImageUrlFromPromise(photos[0].config.url)
     Promise.all(promisedPhotos).then(photos =>
      dispatch(setPhotoOnState(photos[0].config.url)))

    //  console.log('this is the placeeee of deataailslslslsslslslsllssl' , imageUrlFromPromise
    console.log('this is the photo from state', imageFromState),

    await axios.post("https://my-city-server.herokuapp.com/api/tags/addTag", {
      name: placeDetails.data.result.name,
      long: placeDetails.data.result.geometry.location.lng,
      lat: placeDetails.data.result.geometry.location.lat,
      address: placeDetails.data.result.formatted_address,
      phoneNumber: placeDetails.data.result.formatted_phone_number,
       imageUrl: imageFromState,
      groupId,
      userId,
    })

    // dispatch(getStatus(false))
    dispatch(getTags(groupId));
     dispatch(addTagStatusFunc(true));
  };

  console.log('this is the photo from state', imageFromState)

  const onSearch = async () => {
    // Call to GOOGLE API to get the AutoComplete array
    let formattedSearch = search.split(' ').join('');
    let results = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${formattedSearch}&types=establishment&location=${coordinates.lat}%2C${coordinates.long}&radius=100000&strictbounds=true&key=AIzaSyAmYmN1pMqX1g-igPscaRfmqI7D-TPEhx8`);

    // console.log('these are themadasdasdasdasdasdasdasdadadasdasdadadadasdadadada', results.data.predictions[0])
    // setSearchResult(results.data.results)
    dispatch(setSearchOnState(results.data.predictions))
    dispatch(setSearchScreenStatus(false))

    // // Call to GOOGLE API to get the Place Details array:
     let placeDetails = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${pressedResult.place_id}&fields=name%2Crating%2Cformatted_phone_number%2Cformatted_address%2Cphotos%2Cgeometry&key=AIzaSyAmYmN1pMqX1g-igPscaRfmqI7D-TPEhx8`);


     let photoArray = placeDetails.data.result.photos.map((photo) => {
       return photo.photo_reference
     })

     const promisedPhotos = photoArray.map(async (photo) => {
       return await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=AIzaSyAmYmN1pMqX1g-igPscaRfmqI7D-TPEhx8`)
     })
    //  photos[0].config.url this is how to getr the photo
    //  Promise.all(promisedPhotos).then(photos => console.log('thisssss isssss yheeee photossssss ', placeDetails))

    // // Call to GOOGLE API to get the PHOTOS array:
    // let placeDetails = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uECpmmp3ik8OhHd4AKgLgEfEBnErV084vi34X_kVzFBBGYroBF4dTP_tAjy0xWbIYngZ9Dkd4DjPNNpeb1ItX8YfUu2Jr9m28_QJ1RmkXn3RgWUgTn56IjtJzvJBqekuLyBhYRnQ0vpX_lnZmhp_xBm_YLSBPz7EwWXjmZx6Ba-5weKd&key=AIzaSyAmYmN1pMqX1g-igPscaRfmqI7D-TPEhx8`);
    // console.log('WOOOOOOOOOOHOOOOOOOOOO STATUS', promisedPhotos)
  }



  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create a Pin</Text>
        {/* <TextInput
          style={styles.input}
          placeholder='Pin Name'
          onChangeText={setName}
          value={name}
        /> */}

        <TextInput
          style={styles.input}
          placeholder='Google Search Bar'
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.button} onPress={onSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Create Pin</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    //marginLeft: 30,
    alignSelf: "center",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: 20,
    //height: "50%",
  },
  form: {
    margin: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  button: {
    backgroundColor: "#4286f4",
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CreateTag;
