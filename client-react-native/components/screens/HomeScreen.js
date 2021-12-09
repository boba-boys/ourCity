import { CurrentRenderContext } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, {
  Component,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import { getAllTagsScreenStatus } from "../../redux/allTagsScreenStatus";
import { getStatus } from "../../redux/carouselStatus";
import { getGroups } from "../../redux/groups";
import { getTags } from "../../redux/tags";
import Menu from "./Menu";
import { MaterialIcons } from "@expo/vector-icons";
import CreateGroup from "./CreateGroup";
import { getTagScreenStatus } from "../../redux/tagScreenStatus";
import { getGroupStatus } from "../../redux/groups";
import { addTagCoordinatesFunc } from "../../redux/TagCoordinates";
import AllTagsScreen from "./AllTagsScreen";
import CarouselCards from "./GroupsScreen";
import TagScreen from "./SingleTagScreen";
import CreateTag from "./CreateTag";
import axios from "axios";
import { addTagStatusFunc } from "../../redux/addTagStatus";
import SearchResultScreen from "./SearchResultsScreen";
import { setSearchScreenStatus } from "../../redux/SearchScreenStatus";

const HomeScreen = (props) => {
  const userState = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const mapReference = createRef();

  // Redux Store (useSelector is Hook!)
  const tags = useSelector((state) => state.tags);
  const CarouselStatus = useSelector((state) => state.carouselStatus);
  const tagScreenStatus = useSelector((state) => state.tagScreenStatus);
  const allTagsStatus = useSelector((state) => state.allTagsScreenStatus);
  const addTagsStatus = useSelector((state) => state.addTagsStatus);
  const groupId = useSelector((state) => state.setGroupIdOnState);
  const searchResultStatus = useSelector((state) => state.searchScreenStatus);



  const createGroupStatus = useSelector((state) => state.createGroupStatus);

  // Local State
  const [menuStatus, setMenuStatus] = useState(false);
  const [tagId, setTagId] = useState(undefined);
  const [initialState, setInitialState] = useState({
    // This has to be current location
    latitude: 40.7091089,
    longitude: -74.0058052,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // ComponentDidMount
  useEffect(() => {
    dispatch(getStatus(CarouselStatus));

    console.log("USer State", userState);

    dispatch(getTags(groupId)); //Hard coded groupId <--might have to be this way
    dispatch(getGroups(userState.id)); // Hard code userId <--DONT UNCOMMENT THIS Creates infinit loop
  }, []);

  useEffect(() => {
    dispatch(getGroups(userState.id)); // Hard code userId <--DONT UNCOMMENT THIS Creates infinit loop
  }, [userState]);

  const onPressGroup = () => {
    console.log(
      "Inside onPressGroup before pressing the Group text: ",
      CarouselStatus
    );
    //upon pressing the group name, we want the carousel to pop up via conditional rendering.
    dispatch(getStatus(CarouselStatus));
  };

  const onPressMap = async (event) => {
    let long = event.nativeEvent.coordinate.longitude;
    let lat = event.nativeEvent.coordinate.latitude;
    let coordinates = { long: long, lat: lat };

    dispatch(addTagCoordinatesFunc(coordinates));
    const isTag = tags.filter((tag) => {
      if (
        tag.latitude === coordinates.lat &&
        tag.longitude === coordinates.long
      ) {
        return true;
      } else {
        return null;
      }
    });
    if (isTag.length === 0) {
      console.log("inside of if(tag.length) HomeScreen", isTag.length);
      dispatch(addTagStatusFunc(addTagsStatus));
      dispatch(addTagCoordinatesFunc(coordinates));
    }
    // Notice that this is always called when we interact with the map!!
    // setMenuStatus(false);
    //  dispatch(getStatus(true));
    //  dispatch(getAllTagsScreenStatus(true));
    //  dispatch(getTagScreenStatus(true));
     dispatch(setSearchScreenStatus(true))
    //  setCreateGroupStatus(false);

  };

  const onPressTag = (tagId) => {
    console.log(
      "Inside onPressTag before pressing the Marker/Tag: ",
      tagScreenStatus
    );
    // console.log('This trigers when pressed: ', event.nativeEvent);
    //dispatch(addTagStatusFunc(true));
    dispatch(getTagScreenStatus(tagScreenStatus));
    setTagId(tagId);
    dispatch(addTagStatusFunc(true));
  };

  const onPressAllTags = () => {
    dispatch(getAllTagsScreenStatus(allTagsStatus));
  };

  const onPressOpenMenu = () => {
    setMenuStatus(!menuStatus);
  };

  return (
    <MapView
      onPress={onPressMap}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={initialState}
      ref={mapReference}
      showUserLocation={true}
    >
      <Text style={styles.groupsText} onPress={onPressGroup}>
        {"My Groups"}
      </Text>
      <Text style={styles.allPlacesText} onPress={onPressAllTags}>
        {"All Places"}
      </Text>
      <View style={styles.allGroups}>
        {CarouselStatus == true ? <CarouselCards /> : null}
      </View>
      <View>
        {menuStatus === true ? <Menu style={{ position: "absolute" }} /> : null}
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
            onPress={() => onPressTag(tag.id)}
          />
        );
      })}
      <View style={styles.tagContainer}>
        {tagScreenStatus === true ? <TagScreen tagId={tagId} /> : null}
      </View>
      <View>
        {addTagsStatus === true ? (
          <CreateTag style={{ position: "absolute" }} />
        ) : null}
      </View>
      <View>
        {searchResultStatus === true ? (
          <SearchResultScreen style={{ position: "absolute" }} />
        ) : null}
      </View>

      <View style={styles.tagContainer}>
        {allTagsStatus === true ? (
          <AllTagsScreen mapRef={mapReference} />
        ) : null}
      </View>
      <MaterialIcons
        name='menu'
        size={50}
        onPress={onPressOpenMenu}
        style={{ position: "absolute", bottom: 30, right: 35 }}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  groupsText: {
    paddingTop: 50,
    marginLeft: 60,
    fontFamily: "Cochin",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
    width: "25%",
    bottom: 0,

    // backgroundColor: "blue",
  },
  allPlacesText: {
    paddingTop: 50,
    //marginLeft: 250,
    // fontFamily: "Cochin",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
    width: "25%",
    height: "30%",
    //bottom: 0,
    right: 25,
    position: "absolute",
    top: 0,

    // backgroundColor:'red',
  },
  allGroups: {
    //backgroundColor: "grey",
    //top: 0,
    marginTop: 50,
    bottom: 50,
    position: "absolute",
    // backgroundColor: "red",
  },
  tagContainer: {
    position: "absolute",
    bottom: 90,
    // marginBottom: 40,
    // backgroundColor: "red",
  },
  menu: {
    top: 550,
    width: "85%",
    // backgroundColor: "red",
  },
  createGroup: {
    top: 550,
    width: "85%",
    //backgroundColor: "red",
  },
  allGroups: {
    // backgroundColor:'grey',
    top: -250,
    // backgroundColor: "red",
  },
});

export default HomeScreen;
