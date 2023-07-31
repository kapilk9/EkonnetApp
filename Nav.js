import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "./navigation/tabs";
import { CoinDetails } from './screens';
const Stack = createStackNavigator();
const Nav = () => {
    return (
  
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'MainLayout'}
            >
                <Stack.Screen
                    name="MainLayout"
                    component={Tabs}
                />
                <Stack.Screen
                    name="CoinDetails"
                    component={CoinDetails}
                />
            </Stack.Navigator>
        </NavigationContainer>
       
    )
}

export default Nav