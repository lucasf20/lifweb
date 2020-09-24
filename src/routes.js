import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

import CreateAcc from './pages/CreateAcc';
import Login from './pages/Login';
import EmailVal from './pages/EmailVal';
import CreatePass from './pages/CreatePass';
import Feed from './pages/Feed';

export default function Routes() {
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions = {{headerShown: false}}>
                <AppStack.Screen  name = "Login" component = {Login}/>
                <AppStack.Screen name = "CreateAcc" component = {CreateAcc}/>
                <AppStack.Screen name = "EmailVal" component = {EmailVal}/>
                <AppStack.Screen name = "CreatePass" component = {CreatePass}/>
                <AppStack.Screen name = "Feed" component = {Feed}/>
            </AppStack.Navigator>

        </NavigationContainer>

    );
}