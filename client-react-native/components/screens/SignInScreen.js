import React, {useState} from 'react'
import{View, Text, TextInput, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import myCity from '../../assets/myCity.jpeg'
import CustomButton from '../CustomButton'
import CustomInput from '../CustomInput'
import SocialSignInButtons from '../SocialSignInButtons/SocialSignInButtons'
import { useNavigation } from '@react-navigation/core'
import axios from 'axios'


const SignInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const{height} = useWindowDimensions();
  const navigation = useNavigation();


  const onSignInPressed =  async () =>{


      const user = await axios.post(`https://my-city-server.herokuapp.com/auth/login`, {email, password})


    if(user.data['token']){
    navigation.navigate('Home')
    }else{
      console.warn('incorrect password')
    }
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

       <TextInput
        style={styles.container}
        placeholder='username'
        name="username"
        autoCapitalize="none"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={styles.container}
        placeholder='password'
        name="password"
        autoCapitalize="none"
        password
        value={password}
        onChangeText={password => setPassword(password)}
      />

      {/* <CustomInput placeholder="UserName"  value={username}
        onChangeText={username => setUsername(username)}/>
      <CustomInput placeholder="Password" value={password}
        onChangeText={password => setPassword(password)}
       secureTextEntry
       /> */}
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
  },
  container:{
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 5,
    marginVertical: 2
  },
})


export default SignInScreen
