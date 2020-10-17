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
import { useNavigation } from '@react-navigation/native'
import colorStyles from "../../colors";

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
                <TouchableOpacity style={{ position: 'absolute', marginLeft: 15, marginTop: 30 }} onPress={() => { navigation.navigate("Menu") }}>
                    <SimpleLineIcons name="menu" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', color: 'white', position: 'absolute', marginLeft: (Dimensions.get('window').width / 2 - 15), marginTop: 30, fontSize: 20 }}>
                    Perfil
                    </Text>
                <TouchableOpacity style={{ position: 'absolute', marginLeft: (Dimensions.get('window').width - 80), marginTop: 30 }}>
                    <EvilIcons name="search" size={30} color="white" style={{ paddingRight: 15 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', marginLeft: (Dimensions.get('window').width - 40), marginTop: 30 }} onPress={() => { navigation.navigate('Direct') }}>
                    <MaterialCommunityIcons name="message-outline" size={24} color="white" />
                </TouchableOpacity>
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
                <View style={{ marginTop: 90, borderWidth: 0.5, marginHorizontal: 20, height: 70, borderBottomColor: 'silver', borderTopColor: 'silver', borderLeftColor: 'transparent', borderRightColor: 'transparent', flexDirection:'row', justifyContent:'space-between' }}>
                    <View>
                        <Text style={{fontSize:25, marginTop:5}}>
                            300K
                        </Text>
                        <Text style={{color:'gray', marginTop:5}}>
                            Seguidores
                        </Text>
                    </View>
                    <View>
                        <Text style={{fontSize:25, marginTop:5}}>
                            300
                        </Text>
                        <Text style={{color:'gray', marginTop:5}}>
                            Seguindo
                        </Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor:colorStyles.dorange, marginVertical:5, width:150, borderRadius:5}}>
                        <Text style={{color:'white', marginTop:15, marginLeft:45, fontSize:20}}>
                            Seguir
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Cambutton />
        </View>
    )
}