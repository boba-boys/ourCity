import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

const Menu = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>YEET</Text>
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
    //justifyContent: "center",
    bottom: 0,
  },
});

export default Menu;
