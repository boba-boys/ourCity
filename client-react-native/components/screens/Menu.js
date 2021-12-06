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
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { CustomButton } from "../CustomButton";

const Menu = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Menu</Text>
      <Text>User Settings</Text>
      <Text>Leave Group</Text>
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
