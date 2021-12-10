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
import { getGroupStatus } from "../../redux/groupStatus";
import { getTags } from "../../redux/tags";
import axios from "axios";
import CreateGroup from "./CreateGroup";
import { _setGroupIndexOnState } from "../../redux/groupIndexState";
import { _setGroupIdOnState } from "../../redux/groupState";


const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.35);

//We can add pagination so users can skip to a certain item in the carousel without having to swipe continuously.  Below I create a state to store the current pagination index.

const GroupScreen = (props) => {
  const isCarousel = useRef(null);
  const dispatch = useDispatch();

  const groupStatus = useSelector((state) => state.groupStatus);
  const usersGroups = useSelector((state) => state.groups);
  const userId = useSelector((state) => state.users.id);
  const indexOfSelectedGroup = useSelector((state) => state.setGroupIndexOnState);

  const [email, setEmail] = useState("");
  // const [indexOfSelectedGroup, setIndexOfSelectedGroup] = useState(0);

  //below is a hook called useEffect (similar to component did mount) that gets called when the component initially renders.
  useEffect(() => {
    console.log(
      "---------------------ComponentDidMount in GroupScreen:--------------------"
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
        dispatch(getGroupStatus(groupStatus));
      } else {
        alert("User not added to group!");
      }
    } catch (error) {
      console.log(error);
      alert("User not added to group!");
    }
  };

  const handleDelete = async (groupId) => {
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
    return (
      <ScrollView style={styles.container} key={item.id}>
        <View>
          <Text style={styles.headerGroup}>Groups:</Text>
        </View>
        <Separator />
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Separator />

        <Text style={styles.header} onPress={() => handlePress(item.id, index)}>
          {item.name}
        </Text>
        <Separator />
        <Text style={styles.body} onPress={() => handlePress(item.id, index)}>
          {item.body}
        </Text>
        <Separator />
        <TextInput
          style={styles.input}
          placeholder={`Put your friend's email here!`}
          name='email'
          autoCapitalize='none'
          value={email}
          keyboardType='email-address'
          onChangeText={(email) => setEmail(email)}
        />
        <Button title='Add to Group' onPress={() => onAddToGroup(item.id)} />
        <Button title='Leave Group' color='red' onPress={() => handleDelete(item.id)} />
      </ScrollView>
    );
  };

  const handlePress = (groupId, index) => {
    console.log('Thiis the index when pressed the carousel ', index);
    console.log('Thiis the GROUPID when pressed the carousel ', groupId);
    dispatch(_setGroupIndexOnState(index));
    dispatch(_setGroupIdOnState(groupId));
    dispatch(getGroupStatus(groupStatus));
    dispatch(getTags(groupId));
    // setIndexOfSelectedGroup(index)
  };
  // console.log('Thiis the index of the slected group', indexOfSelectedGroup);
  return (
    <View style={styles.view} /* style={styles.container} */>
      <View style={styles.carouselContainer}>
        <Carousel
          layout='tinder'
          layoutCardOffset={15}
          ref={isCarousel}
          data={usersGroups}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          firstItem={indexOfSelectedGroup}
          // loop
          useScrollView={true}
        />
      </View>
      <View >
        <CreateGroup />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: ITEM_WIDTH,
    height: '66%',
    justifyContent: 'space-between',
    // backgroundColor: 'green',
  },
  carouselContainer: {
    marginTop: 5,
    height: '90%',
    // backgroundColor: 'red',
    alignSelf: 'center',
    // width: ITEM_WIDTH, // This fixes the background but moves the carousel
  },
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4.65,
    elevation: 7,
    // bottom: 0,
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
    alignSelf: "center",
    // width: ITEM_WIDTH - 20,
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
    alignSelf: "center",
  },
});

export default GroupScreen;
