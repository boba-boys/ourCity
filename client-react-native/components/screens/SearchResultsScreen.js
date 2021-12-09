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
import { getSearchOnState } from "../../redux/pressedSearch";
import { setSearchScreenStatus } from "../../redux/SearchScreenStatus";
import { setPhotoOnState } from "../../redux/setPhotoOnState";


const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.35);

const SearchResultScreen = () => {
  const userId = useSelector((state) => state.users.id);
  const coordinates = useSelector((state) => state.addTagCoordinates);
  const placesArray = useSelector((state) => state.setPlacesArrayOnStateReducer);



  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const dispatch = useDispatch();
  const groupId = useSelector((state) => state.setGroupIdOnState);
  const searchResults = useSelector((state) => state.setSearchResultsOnState);

  const navigation = useNavigation();

  const onSubmit = async (resultObj) => {

    let placeDetails = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${resultObj.place_id}&fields=name%2Crating%2Cformatted_phone_number%2Cformatted_address%2Cphotos%2Cgeometry&key=AIzaSyAmYmN1pMqX1g-igPscaRfmqI7D-TPEhx8`);

    console.log(placeDetails)

    let photoArray = placeDetails.data.result.photos.map((photo) => {
      return photo.photo_reference
    })


    const promisedPhotos = photoArray.map(async (photo) => {
      return await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=AIzaSyAmYmN1pMqX1g-igPscaRfmqI7D-TPEhx8`)
    })

    Promise.all(promisedPhotos).then(photos =>
      dispatch(setPhotoOnState(photos[0].config.url)))




    dispatch(getSearchOnState(resultObj));
    dispatch(setSearchScreenStatus(true))
  };


// console.log('this is the places array all the way over in the search results screen!!!!',placesArray[0])
  return (
    ( !placesArray) ? <Text>Selected!</Text> :
    <ScrollView style={styles.container} >
      {placesArray.map((result) => {
        return (
          <View >
            <Text >
              {result.data.result.name}
              {/* <Image
            source={{ uri: .imageUrl }}
            style={styles.image}
          /> */}

              {result.data.result.formatted_address}
              {result.data.result.formatted_phone_number}


              <TouchableOpacity style={styles.button} onPress={() => onSubmit(result)} >
                <Text style={styles.buttonText}>Choose location</Text>
              </TouchableOpacity>
            </Text>
          </View>

        )
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    width: 350,
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

export default SearchResultScreen;
