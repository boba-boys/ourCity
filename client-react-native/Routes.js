import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './components/screens/HomeScreen';
//  import { stack } from '../server/api';
import SignInScreen from './components/screens/SignInScreen';

const Stack = createNativeStackNavigator();

const Routes = (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='signIn' component={SignInScreen}/>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Routes;
