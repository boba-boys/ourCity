import React, {useState} from 'react'
import{View, Text, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'

import CustomButton from '../CustomButton'
import CustomInput from '../CustomInput'



const ResetPasswordScreen = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');




  const onSignInPressed = () =>{
    console.warn('sign in')
  }





  const backToSignInPressed = () => {
    console.warn('uve been warned')
  }

  const onSubmitPressed = () => {
    console.warn('uve been warned')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
     <Text style={styles.title}>Reset your password</Text>

      <CustomInput
       placeholder="Code"
       value={code}
       setValue={setCode}
       />

       <CustomInput
       placeholder="Enter new password"
       value={newPassword}
       setValue={setNewPassword}
       />


      <CustomButton
      text='Submit'
       type='signIn'
       onPress={onSubmitPressed}
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


export default ResetPasswordScreen
