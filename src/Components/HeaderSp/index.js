import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import Icon from '../../images/avatar_stories1.png'
import styles from './styles'
import home from '../../assets/home_icon.png'
import { SimpleLineIcons, EvilIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


function HeaderSp(props) {
    const navigation = useNavigation();
    const { inChat } = props;

    function resizeHome() {
        const { width, height } = Image.resolveAssetSource(home)
        return height * 120 / width
    }

    return (
        <View style={[styles.container, inChat && { backgroundColor: '#f25c05' }]}>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => { navigation.navigate("Menu") }}>
                    <SimpleLineIcons name="menu" size={24} color={inChat ? '#fff' : 'gray'} />
                </TouchableOpacity>
                <EvilIcons name="search" size={30} color="transparent" style={{ paddingRight: 15 }} />
            </View>
            { !inChat && <TouchableOpacity onPress={() => { navigation.navigate("Feed") }}>
                <Image source={home} style={{ height: resizeHome(), width: 120, marginTop:5 }}>
                </Image>
            </TouchableOpacity> }
            <View style={{ flexDirection: "row" }}>
                <EvilIcons name="search" size={30} color={inChat ? '#fff' : 'gray'} style={{ paddingRight: 15 }} onPress={() =>{navigation.navigate('Filters')}}/>
                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate('MinhasMensagens') }}>
                        <MaterialCommunityIcons name="message-outline" size={24} color={inChat ? '#fff' : 'gray'} />
                        <FontAwesome name="circle" size={10} color="red" style={{position:"absolute", marginLeft:15}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default Header