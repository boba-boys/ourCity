import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './components/screens/HomeScreen';
//  import { stack } from '../server/api';
import SignInScreen from './components/screens/SignInScreen';
import CarouselCards from './components/screens/CarouselCards';
import { StyleSheet, SafeAreaView } from "react-native";


const Stack = createNativeStackNavigator();

const Routes = (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='signIn' component={SignInScreen}/>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="My Groups" component={CarouselCards} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Routes;
