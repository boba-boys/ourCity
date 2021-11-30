import React from 'react'
import { View, Text } from 'react-native'
import CustomButton from '../CustomButton'

const SocialSignInButtons = () => {

  const onSignInFacebook = () =>{
    console.warn('hahahahah')
  }

  const onSignInGoogle = () =>{
    console.warn('hahahahah')
  }

  const onSignInApple = () =>{
    console.warn('hahahahah')
  }


  return(
    <>
      <CustomButton
      text='Sign In with Facebook'
       type='signIn'
       onPress={onSignInFacebook}
        bgColor='#E7EAF4'
         fgColor="#4765A9"
         />

      <CustomButton
      text='Sign In with Google'
       type='signIn'
        onPress={onSignInGoogle}
         bgColor='#FAE9EA'
         fgColor="#DD4D44"
         />

      <CustomButton
      text='Sign In with Apple'
       type='signIn'
        onPress={onSignInApple}
        bgColor='#e3e3e3'
         fgColor="#363636"
         />
    </>
  )
}

export default SocialSignInButtons
