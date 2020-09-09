import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

import CreateAcc from './pages/CreateAcc';
import Login from './pages/Login';

export default function Routes() {
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions = {{headerShown: false}}>
                <AppStack.Screen  name = "Login" component = {Login}/>
                <AppStack.Screen name = "CreateAcc" component = {CreateAcc}/>
            </AppStack.Navigator>

        </NavigationContainer>

    );
}