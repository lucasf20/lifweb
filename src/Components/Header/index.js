import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import Icon from '../../images/avatar_stories1.png'
import styles from './styles'
import { SimpleLineIcons } from '@expo/vector-icons'; 


function Header(){
   return(
       <View style={styles.container}>
           <SimpleLineIcons name="camera" size={24} color="black" />
           <Text style={styles.title}>Lifweb</Text>
           <SimpleLineIcons name="paper-plane" size={24} color="black" />
       </View>
   )
}
export default Header