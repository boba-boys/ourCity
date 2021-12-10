import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ImageBackground,
} from "react-native";

import CustomButton from "../CustomButton";
import MapView from "react-native-maps";
import CustomInput from "../CustomInput";
import SocialSignInButtons from "../SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { loadUserToState } from "../../redux/user";
import { useDispatch } from "react-redux";
import MapBackground from "../../assets/MapBackground.jpg";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSignInPressed = () => {
    console.warn("Glad you remember your password/email!");
    navigation.navigate("signIn");
  };

  const onRegisterPressed = async () => {
    const user = await axios.post(
      "https://my-city-server.herokuapp.com/auth/signup",
      { email, password, firstName, lastName }
    );

    if (user.data.createdAt) {
      dispatch(loadUserToState(email));
      navigation.navigate("Home");
    } else {
      alert(`${user.data}...Perhaps you already have an account?`);
    }
  };

  const onTermsPressed = () => {
    console.warn("uve been warned");
  };

  const onPrivacyPressed = () => {
    console.warn("uve been warned");
  };

  return (
    <ImageBackground source={MapBackground} style={styles.map}>
      <Text style={styles.titleText}>Create an account</Text>
      <View style={styles.root}>
        <TextInput
          style={styles.container}
          placeholderTextColor='white'
          placeholder='email'
          name='email'
          autoCapitalize='none'
          keyboardType='email-address'
          value={email}
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          style={styles.container}
          placeholder='password'
          placeholderTextColor='white'
          name='password'
          autoCapitalize='none'
          password
          value={password}
          onChangeText={(password) => setPassword(password)}
        />

        <TextInput
          style={styles.container}
          placeholder='first name'
          placeholderTextColor='white'
          name='firstName'
          autoCapitalize='none'
          value={firstName}
          onChangeText={(firstName) => setFirst(firstName)}
        />

        <TextInput
          style={styles.container}
          placeholder='last name'
          placeholderTextColor='white'
          name='lastName'
          autoCapitalize='none'
          password
          value={lastName}
          onChangeText={(lastName) => setLast(lastName)}
        />
        <CustomButton
          text='Register'
          type='signIn'
          onPress={onRegisterPressed}
        />
        <Text style={styles.text}>
          By registering you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsPressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text='Have an account? Sign in'
          onPress={onSignInPressed}
          type='forgot'
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // root: {
  //   alignItems: "center",
  //   padding: 20,
  // },

  // title: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   color: "#051C60",
  //   margin: 10,
  // },
  text: {
    color: "white",
    marginVertical: 10,
  },
  // link: {
  //   color: "#FDB075",
  // },
  // container: {
  //   backgroundColor: "white",
  //   width: "100%",

  //   borderColor: "#e8e8e8",
  //   borderWidth: 1,
  //   borderRadius: 5,

  //   paddingHorizontal: 5,
  //   marginVertical: 2,
  // },
  title: {
    fontSize: 30,
    marginTop: 100,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  root: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    marginTop: 100,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
    maxHeight: 550,
    width: "75%",
    marginBottom: 100,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 4,
    // position: "absolute",
  },
  map: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    //backgroundImage: "../../assets/MapBackground.png",
  },
  container: {
    backgroundColor: "rgba(100, 100, 100, 0.5)",
    width: "75%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 35,
    paddingHorizontal: 5,
    marginVertical: 2,
    alignSelf: "center",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    right: 0,
    marginTop: 100,
  },
  textInputs: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
});

export default SignUpScreen;
