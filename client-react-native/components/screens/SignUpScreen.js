

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import SocialSignInButtons from "../SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { loadUserToState } from '../../redux/user'
import { useDispatch } from 'react-redux'


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
      dispatch(loadUserToState(email))
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <TextInput
          style={styles.container}
          placeholder='email'
          name='email'
          autoCapitalize='none'
          value={email}
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          style={styles.container}
          placeholder='password'
          name='password'
          autoCapitalize='none'
          password
          value={password}
          onChangeText={(password) => setPassword(password)}
        />

        <TextInput
          style={styles.container}
          placeholder='first name'
          name='firstName'
          autoCapitalize='none'
          value={firstName}
          onChangeText={(firstName) => setFirst(firstName)}
        />

        <TextInput
          style={styles.container}
          placeholder='last name'
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

        <SocialSignInButtons />

        <CustomButton
          text='Have an account? Sign in'
          onPress={onSignInPressed}
          type='forgot'
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
  container: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 5,
    marginVertical: 2,
  },
});

export default SignUpScreen;
