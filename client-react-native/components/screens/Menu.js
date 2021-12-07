import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { CustomButton } from "../CustomButton";

const Menu = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Thank you for checking out our project!</Text>
      <Text>Team Members: </Text>
      <Text> Chase Holt </Text>
      <Text
        style={{ color: "blue" }}
        onPress={() =>
          Linking.openURL("https://www.linkedin.com/in/chase-holt/")
        }
      >
        Chase's linkedin
      </Text>
      <Text> Hector Gomez </Text>
      <Text
        style={{ color: "blue" }}
        onPress={() =>
          Linking.openURL("https://www.linkedin.com/in/hector-nevarez/")
        }
      >
        Hector's Linkedin
      </Text>
      <Text> Brad Plunkett </Text>
      <Text
        style={{ color: "blue" }}
        onPress={() =>
          Linking.openURL("https://www.linkedin.com/in/bradleyplunkett/")
        }
      >
        Brad's Linkedin
      </Text>
      <Text> Scott Wilson </Text>
      <Text
        style={{ color: "blue" }}
        onPress={() =>
          Linking.openURL("https://www.linkedin.com/in/scottwilson91/")
        }
      >
        {" "}
        Scott's Linkedin{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // alignItems: "center",
    // justifyContent: "flex-end",
    //padding: 20,
  },
  container: {
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    //position: "absolute",
    //justifyContent: "center",
    bottom: 0,
  },
});

export default Menu;
