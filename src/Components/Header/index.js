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
           <SimpleLineIcons name="menu" size={24} color="black" />
           <TouchableOpacity onPress={() => {navigation.navigate("Feed")}}>
               <Image source={home} style={{height:50, width:170}}>
               </Image>
           </TouchableOpacity>
           <SimpleLineIcons name="bubbles" size={24} color="black" />
       </View>
   )
}
export default Header