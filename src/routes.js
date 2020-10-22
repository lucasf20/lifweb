import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

import CreateAcc from './pages/CreateAcc';
import CreateAcc2 from './pages/CreateAcc2';
import Login from './pages/Login';
import EsqueciMinhaSenha from './pages/EsqueciMinhaSenha';
import LoginRedeSocial from './pages/LoginRedeSocial'
import Menu from './pages/Menu';
import Feed from './pages/Feed';
import Direct from './pages/Direct';
import Profile from './pages/Profile';
import SendPost from './pages/SendPost';
import Filters from './pages/Filters';

export default function Routes() {
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions = {{headerShown: false}}>
                <AppStack.Screen  name = "Login" component = {Login}/>
                <AppStack.Screen name = "CreateAcc2" component = {CreateAcc2}/>
                <AppStack.Screen name = "CreateAcc" component = {CreateAcc}/>
                <AppStack.Screen name = "LoginRedeSocial" component = {LoginRedeSocial}/>
                <AppStack.Screen name = "EsqueciMinhaSenha" component = {EsqueciMinhaSenha}/>
                <AppStack.Screen name = "Menu" component = {Menu}/>
                <AppStack.Screen name = "Feed" component = {Feed}/>
                <AppStack.Screen name = "Direct" component = {Direct}/>
                <AppStack.Screen name = "Profile" component = {Profile}/>
                <AppStack.Screen name = "SendPost" component = {SendPost}/>
                <AppStack.Screen name = "Filters" component = {Filters}/>
            </AppStack.Navigator>

        </NavigationContainer>

    );
}