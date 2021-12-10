import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import myCity from "../../assets/myCity.jpeg";
import CustomButton from "../CustomButton";
import MapView from "react-native-maps";
import CustomInput from "../CustomInput";
import SocialSignInButtons from "../SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUserToState } from "../../redux/user";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSignInPressed = async () => {
    const user = await axios.post(
      `https://my-city-server.herokuapp.com/auth/login`,
      { email, password }
    );
    console.log(user);
    dispatch(loadUserToState(email));

    console.log("user", user.data);

    if (user.data["token"]) {
      navigation.navigate("Home");
    } else {
      alert("incorrect password");
    }
  };

  const onForgotPassWordPressed = () => {
    navigation.navigate("Forgot Password");
  };

  const onSignUpPressed = () => {
    navigation.navigate("signUp");
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 40.7091089,
        longitude: -74.0058052,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>OurCity</Text>
      </View>
      <View style={styles.root}>
        <TextInput
          style={styles.container}
          placeholderTextColor={"black"}
          placeholder='email'
          name='email'
          autoCapitalize='none'
          keyboardType='email-address'
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.container}
          placeholderTextColor={"black"}
          placeholder='password'
          name='password'
          autoCapitalize='none'
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <Button
          title='Sign In'
          text='Sign In'
          type='signIn'
          onPress={onSignInPressed}
        />
        <CustomButton
          text='Forgot Password?'
          onPress={onForgotPassWordPressed}
          type='forgot'
        />
        <Button
          title='Sign up'
          text='Sign Up'
          onPress={onSignUpPressed}
          type='forgot'
        />
      </View>
    </MapView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginTop: 75,
    fontWeight: "bold",
  },
  root: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    marginTop: 100,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
    height: 20,
    width: "75%",
    marginBottom: 100,
    borderRadius: 20,
  },
  map: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
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
    fontSize: 50,
    fontWeight: "bold",
  },
});

export default SignInScreen;
