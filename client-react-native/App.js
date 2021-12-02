import React from "react";
// import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import store from "./redux/store/index";
// import Navbar from './components/Navbar';
import Routes from "./Routes";
import { StyleSheet } from "react-native";


//brad added SafeAreaView to the below line...
// import { StyleSheet } from "react-native";
// //brad added this line too.
// import CarouselCards from "./components/screens/CarouselCards";

export default function App() {
  return (
    <Provider store={store}>
      <Routes styles={styles.root} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f9fbfc'
  }
})
