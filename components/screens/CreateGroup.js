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
import { getGroupStatus } from "../../redux/groupStatus";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.35);

const CreateGroup = () => {
  const userId = useSelector((state) => state.users.id);
  const dispatch = useDispatch();

  const groupStatus = useSelector((state) => state.groupStatus);

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupImage, setGroupImage] = useState(
    "https://i.imgur.com/7k7nFm7.png"
  );
  const navigation = useNavigation();

  const onSubmit = async () => {
    const response = await axios.post(
      "https://my-city-server.herokuapp.com/api/groups/create",
      {
        name: groupName,
        body: groupDescription,
        imageUrl: groupImage,
        userId: userId,
      }
    );
    dispatch(getGroupStatus(groupStatus));
  };

  return (
    // <View
    //   style={styles.container}
    //   //behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >
    <ScrollView style={styles.container}>
      <View >
        <Text style={styles.title}>Create a Group</Text>
        <TextInput
          style={styles.input}
          placeholder='Group Name'
          value={groupName}
          onChangeText={setGroupName}
        />
        <TextInput
          style={styles.input}
          placeholder='Group Description'
          value={groupDescription}
          onChangeText={setGroupDescription}
        />
        <TextInput
          style={styles.input}
          placeholder='Group Image'
          value={groupImage}
          onChangeText={setGroupImage}
        />
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // width: '100%',
    // alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: .5,
    borderColor: 'black'
    // height: "70%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",

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

export default CreateGroup;
