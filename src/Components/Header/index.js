import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import Icon from '../../images/avatar_stories1.png'
import styles from './styles'
import home from '../../assets/home_icon.png'
import { SimpleLineIcons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'; 


function Header(){
    const navigation = useNavigation()
    
   return(
       <View style={styles.container}>
           <TouchableOpacity onPress={() => {navigation.navigate("Menu")}}>
               <SimpleLineIcons name="menu" size={24} color="black" />
           </TouchableOpacity>
           <TouchableOpacity onPress={() => {navigation.navigate("Feed")}}>
               <Image source={home} style={{height:50, width:170}}>
               </Image>
           </TouchableOpacity>
           <View style={{flexDirection:"row"}}>
            <SimpleLineIcons name="magnifier" size={24} color="black" style={{paddingRight:15}}/>
            <SimpleLineIcons name="bubbles" size={24} color="black" />
           </View>
       </View>
   )
}
export default Header