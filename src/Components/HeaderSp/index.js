import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import Icon from '../../images/avatar_stories1.png'
import styles from './styles'
import home from '../../assets/logo3_lifweb_branco.png'
import { SimpleLineIcons, EvilIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colorStyles from '../../colors'


function HeaderSp() {
    const navigation = useNavigation();
    const inChat = false

    function resizeHome() {
        const { width, height } = Image.resolveAssetSource(home)
        return height * 120 / width
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", backgroundColor:colorStyles.dorange }}>
                <TouchableOpacity onPress={() => { navigation.navigate("Menu") }}>
                    <SimpleLineIcons name="menu" size={24} color={inChat ? '#fff' : 'white'} />
                </TouchableOpacity>
                <EvilIcons name="search" size={30} color="transparent" style={{ paddingRight: 15 }} />
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate("Feed") }}>
                <Image source={home} style={{ height: resizeHome(), width: 120, marginTop:5 }}>
                </Image>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
                <EvilIcons name="search" size={30} color={'white'} style={{ paddingRight: 15 }} onPress={() =>{navigation.navigate('Filters')}}/>
                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate('MinhasMensagens') }}>
                        <MaterialCommunityIcons name="message-outline" size={24} color={ 'white'} />
                        <FontAwesome name="circle" size={10} color="red" style={{position:"absolute", marginLeft:15}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default HeaderSp