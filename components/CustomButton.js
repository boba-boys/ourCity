import React from 'react'
import{View, Text, TextInput, Image, StyleSheet, Pressable} from 'react-native'


const CustomButton = ({onPress, text, type = 'signIn', bgColor, fgColor}) => {


  return (
    <Pressable onPress={onPress}
    style={[styles.container, styles[`container_${type}`],
    bgColor ? {backgroundColor: bgColor} : {}
    ]} >
      <Text style={[styles.text, styles[`text_${type}`],
    fgColor ? {color: fgColor} : {}
    ]} >{text}</Text>

    </Pressable>
  )
}

const styles = StyleSheet.create({
container:{


  width: '100%',
  padding:15,
  marginVertical: 5,

  alignItems: 'center',
  borderRadius: 5,


},
container_signIn:{
  backgroundColor:'#3B71F3'
},

container_backToSignIn:{
  borderColor: '#3B71F3',
  borderWidth: 2
},

container_forgot:{

},
text: {
  fontWeight: 'bold',
  color: 'white',
},

text_forgot:{
  color: 'purple'
},

text_backToSignIn:{
  color: '#3B71F3'
}

})


export default CustomButton
