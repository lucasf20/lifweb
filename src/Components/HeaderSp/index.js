import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import Icon from '../../images/avatar_stories1.png'
import styles from './styles'
import { SimpleLineIcons, EvilIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'; 


function HeaderSp(){
    const navigation = useNavigation()

    function resizeHome(){
        const {width, height} = Image.resolveAssetSource(home)
        return height*120/width
    }
    
   return(
       <View style={styles.container}>
           <View style={{flexDirection:"row"}}>
           <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Text >
                    Cancelar
                </Text>
           </TouchableOpacity>
           </View>
           <TouchableOpacity onPress={() => {navigation.navigate("Feed")}}>
               <Text>
                   Recentes
               </Text>
           </TouchableOpacity>
           <TouchableOpacity>
               <Text>
                   Próximo
               </Text>
           </TouchableOpacity>
       </View>
   )
}
export default HeaderSp