import React, {useState} from 'react'
import{View, Text, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'

import CustomButton from '../CustomButton'
import CustomInput from '../CustomInput'
import SocialSignInButtons from '../SocialSignInButtons/SocialSignInButtons'
import { useNavigation } from '@react-navigation/core'


const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

const navigation = useNavigation();

  const onSignInPressed = () =>{
    console.warn('sign in')
    navigation.navigate('signIn')
  }



  const onRegisterPressed = () =>{
    console.warn('hahahahah')
    navigation.navigate('Confirm Email')
  }

  const onTermsPressed = () => {
    console.warn('uve been warned')
  }

  const onPrivacyPressed = () => {
    console.warn('uve been warned')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
     <Text style={styles.title}>Create an account</Text>

      <CustomInput
       placeholder="UserName"
       value={username}
       setValue={setUsername}
       />

      <CustomInput
      placeholder="Email"
      value={email}
      setValue={setEmail}
      />
      <CustomInput
      placeholder="Password"
      value={passwordRepeat}
      setValue={setPasswordRepeat}
      secureTextEntry
      />
      <CustomInput
      placeholder="Repeat Password"
       value={password}
        setValue={setPassword}
      secureTextEntry
      />
      <CustomButton
      text='Register'
       type='signIn'
       onPress={onRegisterPressed}
       />
      <Text style={styles.text}>By registering you confirm that you accept our <Text style={styles.link} onPress={onTermsPressed}>Terms of Use</Text> and <Text style={styles.link}
      onPress={onPrivacyPressed}>Privacy Policy</Text></Text>

      <SocialSignInButtons/>


      <CustomButton
       text="Have an account? Sign in"
        onPress={onSignInPressed}
        type="forgot"/>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root:{
    alignItems:'center',
    padding: 20,
  },

  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10
  },
  text:{
    color:'gray',
    marginVertical: 10

  },
  link:{
    color: '#FDB075'
  }
})


export default SignUpScreen
