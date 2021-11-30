import React, {useState} from 'react'
import{View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import myCity from '../../assets/myCity.jpeg'
import CustomButton from '../CustomButton'
import CustomInput from '../CustomInput'
import SocialSignInButtons from '../SocialSignInButtons/SocialSignInButtons'
import { useNavigation } from '@react-navigation/core'


const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const{height} = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = () =>{

    //validate
    navigation.navigate('Home')
  }

  const onForgotPassWordPressed = () =>{

    navigation.navigate('Forgot Password')
  }



  const onSignUpPressed = () =>{

    navigation.navigate('signUp')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Image source={myCity}
       style={[styles.myCity, {height: height * 0.3}]}
       resizeMode="contain" />

      <CustomInput placeholder="UserName" value={username} setValue={setUsername}/>
      <CustomInput placeholder="Password" value={password} setValue={setPassword}
      secureTextEntry/>
      <CustomButton text='Sign In' type='signIn' onPress={onSignInPressed}/>
      <CustomButton text='Forgot Password?' onPress={onForgotPassWordPressed} type="forgot"/>
      <SocialSignInButtons/>
      <CustomButton text="Sign Up" onPress={onSignUpPressed} type="forgot"/>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root:{
    alignItems:'center',
    padding: 20,
  },
  myCity:{
    width:'70%',
    maxWidth: 300,
    maxHeight: 300
  }
})


export default SignInScreen
