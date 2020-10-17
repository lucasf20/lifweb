import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Button, SafeAreaView, Dimensions } from 'react-native';
import Svg, {
    Image as SvgImage,
    Defs,
    ClipPath,
    Polygon,
} from 'react-native-svg';
import { SimpleLineIcons, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles'
import Cambutton from '../../Components/Cambutton'
import {useNavigation} from '@react-navigation/native'; 

import capa from '../../images/fotocapa.jpg'
import icon from '../../images/avatar_stories1.png'

export default function Profile() {
    function calculateDimensions(img) {
        const { width, height } = Image.resolveAssetSource(img)
        return { width: Dimensions.get('window').width, height: height * Dimensions.get('window').width / width }
    }

    const navigation = useNavigation()

    return (
        <View>
            <View>
                <Image source={capa}
                    style={{ width: calculateDimensions(capa).width, height: calculateDimensions(capa).height }}
                />
                <View style={{position:'absolute', marginTop:20,flexDirection:'row', justifyContent:'space-around', alignContent:'center'}}>
                    <TouchableOpacity style= {{position:'absolute', marginLeft:15, marginTop:20}} onPress={() => { navigation.navigate("Menu") }}>
                        <SimpleLineIcons name="menu" size={24} color="gray" />
                    </TouchableOpacity>
                    <Text style={{fontWeight:'bold', color:'white'}}>
                        Perfil
                    </Text>
                    <View style={{flexDirection:'row', position:'absolute', marginRight:(Dimensions.get('window').width - 15), marginTop:20}}>
                        <EvilIcons name="search" size={30} color="gray" style={{ paddingRight: 15 }} />
                        <TouchableOpacity onPress={() => { navigation.navigate('Direct') }}>
                            <MaterialCommunityIcons name="message-outline" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ position: "absolute", marginLeft: 25, marginTop: (calculateDimensions(capa).height - 50), flexDirection: 'row' }}>
                    <TouchableOpacity >
                        <Svg width="116" height="116" viewBox="0 0 50 50">
                            <Defs>
                                <ClipPath id="image" clipRule="evenodd">
                                    <Polygon points="0 10, 22.5 0, 45 10, 45 40, 22.5 50, 0 40" />
                                </ClipPath>
                            </Defs>
                            <SvgImage
                                x="0"
                                y="0"
                                width="50"
                                height="50"
                                href={icon}
                                clipPath="#image"
                            />
                        </Svg>
                        {/* <Image style={styles.avatar} source={icon} /> */}
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 25, marginTop: 50 }}>
                            Nome da Pessoa
                        </Text>
                        <Text style={{ fontSize: 15, color: 'gray' }}>
                            Profissão
                        </Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            Modelo da Moto
                        </Text>
                    </View>
                </View>
            </View>
            <Cambutton />
        </View>
    )
}