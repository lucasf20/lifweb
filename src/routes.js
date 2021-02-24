import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
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
import SendPost2 from './pages/SendPost2';
import Filters from './pages/Filters';
import EditProfile from './pages/EditProfile';
import Follow from './pages/Follow'
import Comments from './pages/Comments'
import Settings from './pages/Settings'
import MinhasMensagens from './pages/MinhasMensagens';
import Chat from './pages/Chat';
import firebase from '../firebaseConfig'

export default function Routes(){
    return (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{tabBarVisible:false}}>
            <Tab.Screen name="Login" component={Stack} />
            <Tab.Screen name="Feed" component={Feed} initialParams={{reload:false}}/>
            <Tab.Screen name="MinhasMensagens" component={MinhasMensagens}/>
            <Tab.Screen name="Filters" component={Filters} />
            <Tab.Screen name="Menu" component={Menu} />
          </Tab.Navigator>
        </NavigationContainer>
      );
}

function Stack() {
  const[user, setUser] = useState(false)
  firebase.auth().onAuthStateChanged(u => { setUser(u)})
    return (
      (!user)?(
        <AppStack.Navigator screenOptions = {{headerShown: false}}>
            <AppStack.Screen name = "Login" component = {Login}/>
            <AppStack.Screen name = "CreateAcc" component = {CreateAcc}/>
            <AppStack.Screen name = "EsqueciMinhaSenha" component = {EsqueciMinhaSenha}/>
        </AppStack.Navigator>
      ):(
        <AppStack.Navigator screenOptions = {{headerShown: false}}>
            <AppStack.Screen name = "Menu" component = {Menu}/>
            <AppStack.Screen name = "CreateAcc2" component = {CreateAcc2}/>
            <AppStack.Screen name = "LoginRedeSocial" component = {LoginRedeSocial}/>
            <AppStack.Screen name = "Direct" component = {Direct}/>
            <AppStack.Screen name = "Profile" component = {Profile} initialParams={{uid:null}}/>
            <AppStack.Screen name = "SendPost" component = {SendPost}/>
            <AppStack.Screen name = "SendPost2" component = {SendPost2}/>
            <AppStack.Screen name = "Filters" component = {Filters}/>
            <AppStack.Screen name = "EditProfile" component = {EditProfile}/>
            <AppStack.Screen name = "MinhasMensagens" component = {MinhasMensagens}/>
            <AppStack.Screen name = "Comments" component = {Comments}/>
            <AppStack.Screen name = "Chat" component = {Chat}/>
            <AppStack.Screen name = "Settings" component = {Settings}/>
            <AppStack.Screen name = "Follow" component = {Follow} initialParams={{followed:false, uid:null}}/>
        </AppStack.Navigator>
      )   
    );
}

// function FeedSt(){
//   return(
//     <FeedStack.Navigator screenOptions = {{headerShown: false}} initialRouteName='Feed2'>
//       <FeedStack.Screen name = "Feed2" component = {Feed}/>
//       <FeedStack.Screen name = "FeedReload" component = {BlankPage}/>
//     </FeedStack.Navigator>
//   )
// }