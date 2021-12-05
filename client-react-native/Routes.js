import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './components/screens/HomeScreen';
//  import { stack } from '../server/api';
import SignInScreen from './components/screens/SignInScreen';

import CarouselCards from './components/screens/CarouselCards';
import { StyleSheet, SafeAreaView } from "react-native";

import SignUpScreen from './components/screens/SignUpScreen';
import ConfirmEmailScreen from './components/screens/ConfirmEmailScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';
import TagScreen from './components/screens/TagScreen';



const Stack = createNativeStackNavigator();

const Routes = (props) => {
    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={{headerShown:false}}>

            {/* <Stack.Screen name='signIn' component={SignInScreen}/> */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name='signUp' component={SignUpScreen}/>
            <Stack.Screen name='Confirm Email' component={ConfirmEmailScreen}/>
            <Stack.Screen name='Forgot Password' component={ForgotPasswordScreen}/>
            <Stack.Screen name='Reset Password' component={ResetPasswordScreen}/>
            <Stack.Screen name="My Groups" component={CarouselCards} />
            <Stack.Screen name="Tag Screen" component={TagScreen} />


            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Routes;
