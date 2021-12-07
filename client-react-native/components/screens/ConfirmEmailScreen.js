import React, {useState} from 'react'
import{View, Text, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'

import CustomButton from '../CustomButton'
import CustomInput from '../CustomInput'
import SocialSignInButtons from '../SocialSignInButtons/SocialSignInButtons'
import { useNavigation } from '@react-navigation/core'


const ConfirmEmailScreen = () => {
  const [code, setCode] = useState('');

  const navigation = useNavigation();


  const onSignInPressed = () =>{
  }



  const onRegisterPressed = () =>{
    navigation.navigate('Home')
  }

  const backToSignInPressed = () => {
    navigation.navigate('signIn')
  }

  const onResendPressed = () => {
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
     <Text style={styles.title}>Confirm your email</Text>

      <CustomInput
       placeholder="Confirm your confirmation code"
       value={code}
       setValue={setCode}
       />


      <CustomButton
      text='Confirm'
       type='signIn'
       onPress={onRegisterPressed}
       />

      <CustomButton
       text="Resend code"
        onPress={onResendPressed}
        type="forgot"
        />

      <CustomButton
       text="Back to sign in"
        onPress={backToSignInPressed}
        type="backToSignIn"
        />
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


export default ConfirmEmailScreen
