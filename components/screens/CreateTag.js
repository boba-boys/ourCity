import Constants from "expo-constants";
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
  Button,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addTagStatusFunc } from "../../redux/addTagStatus";
import { getTags } from "../../redux/tags";
import { setSearchOnState } from "../../redux/searchResultsOnState";
import { setSearchScreenStatus } from "../../redux/SearchScreenStatus";
import { setPhotoOnState } from "../../redux/setPhotoOnState";
import { setPlacesArrayOnStateFunc } from "../../redux/setPlacesArrayOnState";
import {setSearchResultsPhotosArrayOnState} from "../../redux/setSearchResultPhotosOnState";
import noImage from '../../assets/noImage.jpeg'


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

    // console.log('This should be the Coordinates',pressedResult );

    //  let placeDetails = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${pressedResult.place_id}&fields=name%2Crating%2Cformatted_phone_number%2Cformatted_address%2Cphotos%2Cgeometry&key=${Constants.manifest.extra.API_KEY}`);



    //  console.log('this is the photo from state', placeDetails),
if(imageFromState){
    await axios.post("https://my-city-server.herokuapp.com/api/tags/addTag", {
      name: pressedResult.data.result.name,
      long: pressedResult.data.result.geometry.location.lng,
      lat: pressedResult.data.result.geometry.location.lat,
      address: pressedResult.data.result.formatted_address,
      phoneNumber: pressedResult.data.result.formatted_phone_number,
       imageUrl: imageFromState,

      groupId,
      userId,
    })

    // dispatch(getStatus(false))
    dispatch(getTags(groupId));
    dispatch(addTagStatusFunc(true));
  }else{
    await axios.post("https://my-city-server.herokuapp.com/api/tags/addTag", {
      name: pressedResult.data.result.name,
      long: pressedResult.data.result.geometry.location.lng,
      lat: pressedResult.data.result.geometry.location.lat,
      address: pressedResult.data.result.formatted_address,
      phoneNumber: pressedResult.data.result.formatted_phone_number,
       imageUrl: noImage,

      groupId,
      userId,
    })
  }
  };

  // console.log('this is the photo from state', imageFromState)

  const onSearch = async () => {
    // Call to GOOGLE API to get the AutoComplete array
    let formattedSearch = search.split(' ').join('');
    let results = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${formattedSearch}&types=establishment&location=${coordinates.lat}%2C${coordinates.long}&radius=100000&strictbounds=true&key=${Constants.manifest.extra.API_KEY}`);



    const promisedKeys = results.data.predictions.map(async (place) => {
      return await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name%2Crating%2Cformatted_phone_number%2Cformatted_address%2Cphotos%2Cgeometry&key=${Constants.manifest.extra.API_KEY}`);
    })



    Promise.all(promisedKeys).then(places =>
      dispatch(setPlacesArrayOnStateFunc(places)))

      Promise.all(promisedKeys).then(places => {
        let placeData = places.filter((place) => {
          // console.log('this is the place inside the filter', place, 'this is the place inside the filter')
          if(place.data.result.photos){
              // console.log(place,'ehhyyyoyoooo this is the place inside the iffff')
          return place.data.result.photos
          }
        })

        //  console.log('why would i not log this when i need to check whats in it you dummy', placeData, 'why would i not log this when i need to check whats in it you dummy')
       let photoArray = placeData.map((photo) => {

          return photo.data.result.photos


        })

        let photoRefs = photoArray.map((photo) => {
          return photo[0].photo_reference
        })

        let promisedPhotoRefs = photoRefs.map(async (photo) => {
          return await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${Constants.manifest.extra.API_KEY}`)
        })

        Promise.all(promisedPhotoRefs).then(photos => {
          let searchPhotos = photos.map((photo) => {
            // console.log(photo.config.url)
             return photo.config.url
          }
          )
          dispatch(setSearchResultsPhotosArrayOnState(searchPhotos))
          // console.log(searchPhotos)
        }


          // console.log('dashjasdsaasjkasdjkasjkdasjdkjkasdkjasdkjasdjkasdjkasdjkasdjkasdasdlkadskjasdasd', photos[0].config.url , 'adhasdajhkaskdjasdjkjaskdadsjasdasdjkasdjkasdkjasdjkasdkjkjasd')
          // dispatch(setPhotoSearchArrayOnState(photos[0].config.url)))
        )




        // console.log(places[0].data.result)
          //  console.log(promisedPhotoRefs, 'this is the place data inside promise')
      })



    // console.log('these are the place id keys maped from places calls', placeIdKeys)

    // setSearchResult(results.data.results)
    dispatch(setSearchOnState(results.data.predictions))
    dispatch(setSearchScreenStatus(false)); // This pops the SearchResultsScreen

  }

  const handlePressClose = () =>  {

    dispatch(addTagStatusFunc(true))
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
        <View>
          <Button style = {styles.closeButton} color={"red"} title='Close' onPress={handlePressClose} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1
    backgroundColor: '#FEFFFE',


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
    borderColor: 'black',
    borderWidth: .5
    //height: "50%",
  },
  form: {
    margin: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,


    alignSelf: "center",
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
    borderWidth: .5,
    borderColor: 'black',
    borderRadius: 9,

    width: 150,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CreateTag;
