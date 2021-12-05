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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

//Need to figure out how to know which user is siged in
const userId = 1;

const CreateGroup = () => {
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
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.form}>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

export default CreateGroup;
