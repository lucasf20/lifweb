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
import Timeline from './Timeline'
import { useNavigation } from '@react-navigation/native'
import colorStyles from "../../colors";

import capa from '../../images/fotocapa.jpg'
import icon from '../../images/avatar_stories1.png'
import profileIcon from '../../assets/logolifweb.png'

import firebase from '../../../firebaseConfig';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

function Header() {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: 'row', position: 'absolute', justifyContent: 'space-between', width: Dimensions.get('window').width }}>
            <View style={{ position: 'absolute', backgroundColor: 'black', flexDirection: 'row', opacity: 0.4, justifyContent: 'space-between', width: Dimensions.get('window').width, height: 60 }}>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginLeft: 5, marginTop: 30, width: 70 }} onPress={() => { navigation.navigate("Menu") }}>
                    <SimpleLineIcons name="menu" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <Text style={{ fontWeight: 'bold', color: 'white', marginTop: 30, fontSize: 20 }}>
                Perfil
                    </Text>
            <View style={{ flexDirection: 'row', width: 70, marginRight: 5 }}>
                <TouchableOpacity style={{ marginTop: 30 }} onPress={() => { navigation.navigate("Filters") }}>
                    <EvilIcons name="search" size={30} color="white" style={{ paddingRight: 15 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 30 }} onPress={() => { navigation.navigate('Direct') }}>
                    <MaterialCommunityIcons name="message-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default function Profile({ navigation, route }) {

    const user = (route.params.uid) ? route.params.uid : firebase.auth().currentUser.uid

    const [profile, setprofile] = useState(null)
    const [cp, setcp] = useState(null)
    const [personaldata, setpersonaldata] = useState(getPersonalData())

    function getMainPictures() {
        var path = "gs://lifweb-38828.appspot.com/user/" + user
        var capa = firebase.storage().refFromURL(path + '/capa')
        var prof = firebase.storage().refFromURL(path + '/perfil')
        if (!profile) {
            prof.getDownloadURL().then(url => {
                setprofile({ uri: url })
            }).catch(error => {
                setprofile(false)
            })
        }
        if (!cp) {
            capa.getDownloadURL().then(url => {
                setcp({ uri: url })
            }).catch(error => {
                setcp(false)
            })
        }
        return [profile, cp]
    }

    function getPersonalData() {
        var currentUser = (firebase.auth().currentUser.uid == user);
        var nome = ""
        var profissao = ""
        var moto = ""
        var data = {}
        var loaded = false
        firebase.database().ref('user/' + user).on('value', snap => {
            data = snap.val()
        })
        loaded = !(Object.keys(data).length == 0)
        if (loaded) {
            nome = data.apelido
            profissao = data.profissao
            moto = data.modeloDaMoto.moto
        }
        return { currentUser, nome, profissao, moto, loaded }
    }

    function calculateDimensions() {
        return { width: Dimensions.get('window').width, height: Dimensions.get('window').width *(3/4) }
    }

    const nav = useNavigation()
    //const pics = getMainPictures()
    //const personaldata = getPersonalData()

    return (
        <View>
            <ScrollView>
                <Image source={getMainPictures()[1]}
                    style={{ width: calculateDimensions().width, height: calculateDimensions().height }}
                />
                <Header />
                <View style={{ position: "absolute", marginLeft: 25, marginTop: (calculateDimensions().height - 50), flexDirection: 'row' }}>
                    <TouchableOpacity >
                        {(profile) ? (<Svg width="116" height="116" viewBox="0 -3 43 55">
                            <Polygon stroke='#FFFFFF' strokeWidth={5} points="0 10, 22.5 0, 45 10, 45 40, 22.5 50, 0 40" />
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
                                href={getMainPictures()[0]}
                                clipPath="#image"
                            />
                        </Svg>) : (<Image source={profileIcon} style={{ height: 110, width: 95 }} />)}
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 25, marginTop: 50 }}>
                            {(personaldata.loaded)?personaldata.nome:nav.goBack()}
                        </Text>
                        <Text style={{ fontSize: 15, color: 'gray' }}>
                            {personaldata.profissao}
                        </Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {personaldata.moto}
                        </Text>
                    </View>
                </View>
                <View style={{ marginTop: 90, borderWidth: 0.5, marginHorizontal: 20, height: 70, borderBottomColor: 'silver', borderTopColor: 'silver', borderLeftColor: 'transparent', borderRightColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 25, marginTop: 5 }}>
                            300K
                        </Text>
                        <Text style={{ color: 'gray', marginTop: 5 }}>
                            Seguidores
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 25, marginTop: 5 }}>
                            300
                        </Text>
                        <Text style={{ color: 'gray', marginTop: 5 }}>
                            Seguindo
                        </Text>
                    </View>
                    {(!personaldata.currentUser)?(<View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ backgroundColor: colorStyles.dorange, marginVertical: 5, width: 100, borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontSize: 15, marginTop: 17, marginLeft: 25 }}>
                                Seguir
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: colorStyles.dorange, marginVertical: 5, width: 100, borderRadius: 5, marginLeft: 5 }}>
                            <Text style={{ color: 'white', fontSize: 15, marginTop: 17, marginLeft: 10 }}>
                                Mensagem
                        </Text>
                        </TouchableOpacity>
                    </View>):(<View style={{width:210}}/>)}
                </View>
                <Timeline />
            </ScrollView>
            <Cambutton />
        </View>
    )
}
