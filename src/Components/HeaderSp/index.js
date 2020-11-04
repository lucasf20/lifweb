import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import Icon from '../../images/avatar_stories1.png'
import styles from './styles'
import { SimpleLineIcons, EvilIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'; 
import colors from '../../colors'


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
                <Text style={styles.text}>
                    Cancelar
                </Text>
           </TouchableOpacity>
           </View>
           <TouchableOpacity onPress={() => {navigation.navigate("Feed")}} style={{flexDirection:'row'}}>
               <Text style={{...styles.text, fontWeight:'bold'}}>
                   Recentes
               </Text>
               <EvilIcons name="chevron-down" size={30} color="black" />
           </TouchableOpacity>
           <TouchableOpacity>
               <Text style={{...styles.text, color:colors.dorange, fontWeight:'bold'}}>
                   Próximo
               </Text>
           </TouchableOpacity>
       </View>
   )
}
export default HeaderSp