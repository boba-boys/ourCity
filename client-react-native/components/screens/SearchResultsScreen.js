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

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.35);

const SearchResultScreen = () => {
  const userId = useSelector((state) => state.users.id);
  const coordinates = useSelector((state) => state.addTagCoordinates);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const dispatch = useDispatch();
  const groupId = useSelector((state) => state.setGroupIdOnState);
  const searchResults = useSelector((state) => state.setSearchResultsOnState);

  const navigation = useNavigation();

  const onSubmit = async () => {

    dispatch(addTagStatusFunc(true));
    await axios.post("https://my-city-server.herokuapp.com/api/tags/addTag", {
      name,
      long: coordinates.long,
      lat: coordinates.lat,
      groupId,
      userId,
    });
    // dispatch(getStatus(false))
    dispatch(getTags(groupId));
  };

  const onSearch = async () => {
    let results = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&key=AIzaSyAmYmN1pMqX1g-igPscaRfmqI7D-TPEhx8&location=${coordinates.lat}, ${coordinates.long}`)

    // console.log( 'these are themadasdasdasdasdasdasdasdadadasdasdadadadasdadadada' ,results.data.results[0])
    setSearchResult(results.data.results)

  }

 console.log('WOOOOOOOOOOHOOOOOOOOOO' , searchResults[0])

  return (
    <ScrollView style={styles.container}>
      {searchResults.map((result) => {
                    return (
                        <View >
                            <Text>
                              {result.name}
                              {result.formatted_address}
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

export default SearchResultScreen;
