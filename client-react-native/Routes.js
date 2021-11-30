import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './components/screens/HomeScreen';
//  import { stack } from '../server/api';
import SignInScreen from './components/screens/SignInScreen';
import SignUpScreen from './components/screens/SignUpScreen';
import ConfirmEmailScreen from './components/screens/ConfirmEmailScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';


const Stack = createNativeStackNavigator();

const Routes = (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name='Reset Password' component={ResetPasswordScreen}/>
            <Stack.Screen name='Forgot Password' component={ForgotPasswordScreen}/>
            <Stack.Screen name='Confirm Email' component={ConfirmEmailScreen}/>
            <Stack.Screen name='signUp' component={SignUpScreen}/>
                <Stack.Screen name='signIn' component={SignInScreen}/>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Routes;
