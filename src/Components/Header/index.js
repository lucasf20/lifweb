import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import Icon from '../../images/avatar_stories1.png'
import styles from './styles'
import home from '../../assets/home_icon.png'
import { SimpleLineIcons, EvilIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'; 


function Header(){
    const navigation = useNavigation()

    function resizeHome(){
        const {width, height} = Image.resolveAssetSource(home)
        return height*120/width
    }
    
   return(
       <View style={styles.container}>
           <TouchableOpacity onPress={() => {navigation.navigate("Menu")}}>
               <SimpleLineIcons name="menu" size={24} color="gray" />
           </TouchableOpacity>
           <TouchableOpacity onPress={() => {navigation.navigate("Feed")}}>
               <Image source={home} style={{height:resizeHome(), width:120}}>
               </Image>
           </TouchableOpacity>
           <View style={{flexDirection:"row"}}>
            <EvilIcons name="search" size={30} color="gray" style={{paddingRight:15}}/>
            <MaterialCommunityIcons name="message-outline" size={24} color="gray" />
           </View>
       </View>
   )
}
export default Header