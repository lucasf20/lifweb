import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import CreateAcc from "./pages/CreateAcc";
import CreateAcc2 from "./pages/CreateAcc2";
import Login from "./pages/Login";
import EsqueciMinhaSenha from "./pages/EsqueciMinhaSenha";
import LoginRedeSocial from "./pages/LoginRedeSocial";
import Menu from "./pages/Menu";
import Feed from "./pages/Feed";
import Direct from "./pages/Direct";
import Profile from "./pages/Profile";
import SendPost from "./pages/SendPost";
import SendPost2 from "./pages/SendPost2";
import Filters from "./pages/Filters";
import EditProfile from "./pages/EditProfile";
import Follow from "./pages/Follow";
import MinhasMensagens from "./pages/MinhasMensagens";
import Chat from "./pages/Chat";
import AddComment from "./pages/AddComment";
import Repost from "./pages/Repost";

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="CreateAcc2" component={CreateAcc2} />
        <AppStack.Screen name="CreateAcc" component={CreateAcc} />
        <AppStack.Screen name="LoginRedeSocial" component={LoginRedeSocial} />
        <AppStack.Screen
          name="EsqueciMinhaSenha"
          component={EsqueciMinhaSenha}
        />
        <AppStack.Screen name="Menu" component={Menu} />
        <AppStack.Screen name="Feed" component={Feed} />
        <AppStack.Screen name="Direct" component={Direct} />
        <AppStack.Screen
          name="Profile"
          component={Profile}
          initialParams={{ uid: null }}
        />
        <AppStack.Screen name="SendPost" component={SendPost} />
        <AppStack.Screen name="SendPost2" component={SendPost2} />
        <AppStack.Screen name="Filters" component={Filters} />
        <AppStack.Screen name="EditProfile" component={EditProfile} />
        <AppStack.Screen name="MinhasMensagens" component={MinhasMensagens} />
        <AppStack.Screen name="Chat" component={Chat} />
        <AppStack.Screen name="AddComment" component={AddComment} />
        <AppStack.Screen name="Repost" component={Repost} />
        <AppStack.Screen
          name="Follow"
          component={Follow}
          initialParams={{ followed: false, uid: null }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
