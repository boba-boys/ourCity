import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { getGroups } from "../../redux/groups";
import { getStatus } from "../../redux/carouselStatus";
import { getTags } from "../../redux/tags";
import axios from "axios";
import CreateGroup from "./CreateGroup";
import { _setGroupIdOnState } from "../../redux/groupState";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.35);

//We can add pagination so users can skip to a certain item in the carousel without having to swipe continuously.  Below I create a state to store the current pagination index.

const CarouselCards = (props) => {
  const isCarousel = useRef(null);
  const CarouselStatus = useSelector((state) => state.carouselStatus);
  const usersGroups = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.id);
  const [email, setEmail] = useState("");

  //below is a hook called useEffect (similar to component did mount) that gets called when the component initially renders.
  useEffect(() => {
    console.log(
      "---------------------ComponentDidMount in CarouselCards:--------------------"
    );
    dispatch(getGroups(userId));
  }, []);

  const onAddToGroup = async (groupId) => {
    try {
      const newGroup = await axios.post(
        "https://my-city-server.herokuapp.com/api/groups/adduser",
        { userEmail: email, groupId: groupId }
      );

      if (await newGroup.data) {
        alert("User added to group!");
        dispatch(getStatus(CarouselStatus));
      } else {
        alert("User not added to group!");
      }
    } catch (error) {
      console.log(error);
      alert("User not added to group!");
    }
  };

  const handleDelete = async (groupId) => {
    // console.log("handleDelete group: ", groupId);
    // console.log("handleDelete userId: ", userId);
    try {
      const deleteGroup = await axios.delete(
        `https://my-city-server.herokuapp.com/api/users/${groupId}/${userId}`
      );
      if (await deleteGroup.data) {
        alert("Group deleted!");
        dispatch(getGroups(userId));
      } else {
        alert("Group not deleted!");
      }
    } catch (error) {
      console.log(error);
      alert("Group not deleted!");
    }
  };

  const Separator = () => <View style={styles.separator} />;
  const CarouselCardItem = ({ index, item }) => {
    // console.log(item.comments[0].groupId, 'this is the item')
    console.log(item.id, 'this is the groupId')
    dispatch(_setGroupIdOnState('2'))
    // useEffect(() => {
    //   // dispatch(getTags(1)); //Hard coded groupId <--might have to be this way
    //    dispatch(setGroupIdOnState(item[0].groupId))// Hard code userId <--DONT UNCOMMENT THIS Creates infinit loop
    // }, []);


    return (
      <ScrollView style={styles.container} key={item.id}>
        <View>
          <Text style={styles.headerGroup}>Groups:</Text>
        </View>
        <Separator />
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Separator />

        <Text style={styles.header} onPress={() => handlePress(item.id)}>
          {item.name}
        </Text>
        <Separator />
        <Text style={styles.body} onPress={() => handlePress(item.id)}>
          {item.body}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={`Put your friend's email here!`}
          name='email'
          autoCapitalize='none'
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <Button title='Add to Group' onPress={() => onAddToGroup(item.id)} />
        <Button title='Leave Group' onPress={() => handleDelete(item.id)} />
      </ScrollView>
    );
  };

  const handlePress = (groupId) => {
    dispatch(getStatus(CarouselStatus));
    dispatch(getTags(groupId));
  };

  return (
    <View /* style={styles.container} */>
      <Carousel
        layout='tinder'
        layoutCardOffset={15}
        ref={isCarousel}
        data={usersGroups}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
      />
      <CreateGroup />
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   //   width: 350,
  //   //   height: 400,
  //   backgroundColor: 'white',
  //   //   alignItems: 'center',
  //   //   justifyContent: 'center',
  //   //   padding: 25,
  //   //   opacity:100,
  //   //   marginBottom:305,
  // },
  backgroundScreen: {
    width: "85%",
    height: "45%",
    marginLeft: 30,
    position: "absolute",
    justifyContent: "flex-start", // moves the content respective the main axis
    alignItems: "center",
    bottom: 50,
    backgroundColor: "blue",
  },
  // container: {
  //   width: 350,
  //   height: 460,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   padding: 0,
  //   opacity: 100,
  //   marginBottom: 0,
  // },
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 125,
  },
  header: {
    color: "#222",
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
  },
  body: {
    color: "#222",
    fontSize: 18,
    //alignSelf: "flex-start",
    alignSelf: "center",
    width: ITEM_WIDTH - 20,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerGroup: {
    color: "#222",
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    width: ITEM_WIDTH - 20,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    //margin: 15,
    alignSelf: "center",
  },
});

export default CarouselCards;
