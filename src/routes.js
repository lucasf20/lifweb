import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

import CreateAcc from './pages/CreateAcc';
import CreateAcc2 from './pages/CreateAcc2';
import Login from './pages/Login';
import EsqueciMinhaSenha from './pages/EsqueciMinhaSenha';
import LoginRedeSocial from './pages/LoginRedeSocial'
import FindMoto from './pages/FindMoto';
import Feed from './pages/Feed';

export default function Routes() {
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions = {{headerShown: false}}>
                <AppStack.Screen  name = "Login" component = {Login}/>
                <AppStack.Screen name = "CreateAcc2" component = {CreateAcc2}/>
                <AppStack.Screen name = "CreateAcc" component = {CreateAcc}/>
                <AppStack.Screen name = "LoginRedeSocial" component = {LoginRedeSocial}/>
                <AppStack.Screen name = "EsqueciMinhaSenha" component = {EsqueciMinhaSenha}/>
                <AppStack.Screen name = "FindMoto" component = {FindMoto}/>
                <AppStack.Screen name = "Feed" component = {Feed}/>
            </AppStack.Navigator>

        </NavigationContainer>

    );
}