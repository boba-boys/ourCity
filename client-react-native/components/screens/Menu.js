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
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "75%",
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Menu;
