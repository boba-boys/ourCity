import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getSearchOnState } from "../../redux/pressedSearch";
import { setSearchScreenStatus } from "../../redux/SearchScreenStatus";
import { setPhotoOnState } from "../../redux/setPhotoOnState";
import noImage from "../../assets/noImage.jpeg";

const DEFAULT_IMAGE = Image.resolveAssetSource(noImage).uri;

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.35);

const SearchResultScreen = () => {
  const userId = useSelector((state) => state.users.id);
  const coordinates = useSelector((state) => state.addTagCoordinates);
  const placesArray = useSelector(
    (state) => state.setPlacesArrayOnStateReducer
  );
  const placesPhotosArray = useSelector(
    (state) => state.setSearchResultsPhotosArrayOnStateReducer
  );

  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const dispatch = useDispatch();
  const groupId = useSelector((state) => state.setGroupIdOnState);
  const searchResultStatus = useSelector((state) => state.searchScreenStatus);
  const searchResults = useSelector((state) => state.setSearchResultsOnState);

  const navigation = useNavigation();

  const Separator = () => <View style={styles.separator} />;
  const SeparatorNewMessage = () => <View style={styles.separatorNewMessage} />;

  const onSubmit = async (resultObj) => {
    if (resultObj.data.result.photos) {
      let photoArray = resultObj.data.result.photos.map((photo) => {
        return photo.photo_reference;
      });

      const promisedPhotos = photoArray.map(async (photo) => {
        return await axios.get(
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${Constants.manifest.extra.API_KEY}`
        );
      });

      Promise.all(promisedPhotos).then((photos) =>
        dispatch(setPhotoOnState(photos[0].config.url))
      );
    } else {
      dispatch(setPhotoOnState(DEFAULT_IMAGE));
    }

    dispatch(getSearchOnState(resultObj));
    dispatch(setSearchScreenStatus(true));
  };

  const handlePressClose = () => {
    dispatch(setSearchScreenStatus(true));
  };

  return !placesArray ? (
    <Text>Selected!</Text>
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>
          Search Results:
          <View style={styles.closeButton}>
            <Button
              color={"red"}
              title="Close"
              alignSelf="right"
              onPress={handlePressClose}
            />
          </View>
        </Text>
        <Separator />
        <ScrollView>
          {placesArray.map((place, index) => {
            // console.log('Comment inside map function in Comment:', comment)
            return (
              <TouchableOpacity key={index} onPress={() => onSubmit(place)}>
                <View>
                  <View style={styles.commentContainer}>
                    <View style={styles.lefContainer}>
                      <Image
                        source={{
                          uri: placesPhotosArray[index],
                        }}
                        style={styles.profilePicture}
                      />

                      <View style={styles.midContainer}>
                        <Text style={styles.username}>
                          {place.data.result.name}
                        </Text>
                        <Text
                          // numberOfLines={2}
                          style={styles.commentBody}
                        >
                          {place.data.result.formatted_address}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rightContainer}>
                      <Text style={styles.time}>
                        {place.data.result.formatted_phone_number}
                      </Text>
                    </View>
                    {/* <TouchableOpacity style={styles.button} onPress={() => onSubmit(place)} >
              <Text style={styles.buttonText}>Choose location</Text>
            </TouchableOpacity> */}
                  </View>
                  <Separator />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <SeparatorNewMessage />
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    backgroundColor: "white",
    flex: 1,
    width: ITEM_WIDTH * 1.19,
    // height: "50%",
    marginLeft: 35,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "black",
    // paddingTop:50, // This affect affects the elements inside the view
    // position: 'absolute',
    // bottom: 138,
    // top: -310,
    // opacity: .9,
  },
  header: {
    color: "#222",
    fontSize: 20,
    // alignSelf: "left",
    fontWeight: "bold",
  },
  newMessage: {
    bottom: 0,
    flexDirection: "row",
  },
  textBox: {
    flex: 4,
    // width: '75%',
    alignSelf: "flex-end",
    // backgroundColor:'lightgrey',
    borderColor: "black",
    height: "100%",
    // margin: 5,
    borderWidth: 1,
    // padding: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#4286f4",
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 13,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separatorNewMessage: {
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  commentContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    flex: 1,
    // backgroundColor:'red',
  },
  lefContainer: {
    flexDirection: "row",
    // backgroundColor:'green',
    flex: 4,
  },
  midContainer: {
    justifyContent: "space-around",
    // backgroundColor:'yellow',
    width: "72%",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  commentBody: {
    fontSize: 16,
    color: "black",
  },
  rightContainer: {
    flex: 1,
  },
  time: {
    fontSize: 18,
    color: "black",
    flex: 1,
  },
  closeButton: {
    flex: 1,
    alignSelf: "right",
  },
};

export default SearchResultScreen;
