import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'

import CustomButton from '../CustomButton'
import CustomInput from '../CustomInput'
import { useNavigation } from '@react-navigation/core'



const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState('');

  const navigation = useNavigation();


  const onSendPressed = () => {

    navigation.navigate('Reset Password')
  }

  const backToSignInPressed = () => {
    console.warn("Glad you remember your password/email!");
    navigation.navigate('signIn')
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />


        <CustomButton
          text='Send'
          type='signIn'
          onPress={onSendPressed}
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
  root: {
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10
  },
  text: {
    color: 'gray',
    marginVertical: 10

  },
  link: {
    color: '#FDB075'
  }
})


export default ForgotPasswordScreen
