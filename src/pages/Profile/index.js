import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Button, SafeAreaView, Dimensions } from 'react-native';
import Svg, {
    Image as SvgImage,
    Defs,
    ClipPath,
    Polygon,
} from 'react-native-svg';
import { EvilIcons, MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';
import Cambutton from '../../Components/Cambutton'
import Timeline from './Timeline'
import { useNavigation, StackActions } from '@react-navigation/native'
import colorStyles from "../../colors";

import profileIcon from '../../assets/logolifweb.png'

import firebase from '../../../firebaseConfig';

function Header() {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: 'row', position: 'absolute', justifyContent: 'space-between', width: Dimensions.get('window').width }}>
            <View style={{ position: 'absolute', backgroundColor: 'black', flexDirection: 'row', opacity: 0.4, justifyContent: 'space-between', width: Dimensions.get('window').width, height: 80 }}>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginLeft: 5, marginTop: 50, width: 70 }} onPress={() => { navigation.navigate("Feed") }}>
                    <Entypo name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <Text style={{ fontWeight: 'bold', color: 'white', marginTop: 50, fontSize: 20 }}>
                Perfil
                    </Text>
            <View style={{ flexDirection: 'row', width: 70, marginRight: 5 }}>
                <TouchableOpacity style={{ marginTop: 50 }} onPress={() => { navigation.navigate("Filters") }}>
                    <EvilIcons name="search" size={30} color="white" style={{ paddingRight: 15 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 50 }} onPress={() => { navigation.navigate('Direct') }}>
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
    const [personaldata, setpersonaldata] = useState(false)
    const [seguindo, setseguindo] = useState(0)
    const [seguido, setseguido] = useState(0)
    const [segue, setsegue] = useState(false)
    const [grid, setgrid] = useState(true)

    async function getPersonalData() {
        if (!personaldata) {
            await firebase.firestore().collection('user').doc(user).get().then(data => {
                var dados = data.data()
                console.log(dados['apelido'])
                var set = {
                    currentUser: user == firebase.auth().currentUser.uid,
                    nome: dados['apelido'],
                    profissao: dados['profissao'],
                    moto: dados['modeloDaMoto']['moto']
                }
                setpersonaldata(set)
                setseguindo(dados['following'].length)
                setseguido(dados['followed'].length)
                setsegue(dados['followed'].includes(firebase.auth().currentUser.uid))
            })
        }
    }

    getPersonalData()


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

    function calculateDimensions() {
        return { width: Dimensions.get('window').width, height: Dimensions.get('window').width * (3 / 4) }
    }

    const nav = useNavigation()

    async function follow() {
        var phoneOwner = firebase.firestore().collection('user').doc(firebase.auth().currentUser.uid)
        var profileOwner = firebase.firestore().collection('user').doc(user)
        await phoneOwner.get().then(data => { if (!data.exists) { phoneOwner.set({ following: [], followed: [] }) } })
        await profileOwner.get().then(data => { if (!data.exists) { profileOwner.set({ following: [], followed: [] }) } })
        await phoneOwner.update({ following: firebase.firestore.FieldValue.arrayUnion(user) })
        await profileOwner.update({ followed: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid) })
        setseguido(seguido + 1)
        setsegue(true)
    }

    async function unfollow() {
        var phoneOwner = firebase.firestore().collection('user').doc(firebase.auth().currentUser.uid)
        var profileOwner = firebase.firestore().collection('user').doc(user)
        await phoneOwner.get().then(data => { if (!data.exists) { phoneOwner.set({ following: [], followed: [] }) } })
        await profileOwner.get().then(data => { if (!data.exists) { profileOwner.set({ following: [], followed: [] }) } })
        await phoneOwner.update({ following: firebase.firestore.FieldValue.arrayRemove(user) })
        await profileOwner.update({ followed: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid) })
        setseguido(seguido - 1)
        setsegue(false)
    }

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
                            {personaldata.nome}
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
                    <TouchableOpacity onPress={() => { navigation.dispatch(StackActions.popToTop()); navigation.navigate('Follow', { from: "Profile", followed: true, uid: route.params.uid, user: route.params.uid }) }}>
                        <Text style={{ fontSize: 25, marginTop: 5 }}>
                            {seguido}
                        </Text>
                        <Text style={{ color: 'gray', marginTop: 5, fontSize: 10 }}>
                            Seguidores
                        </Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { navigation.dispatch(StackActions.popToTop()); navigation.navigate('Follow', { from: "Profile", followed: false, uid: route.params.uid, user: route.params.uid }) }}>
                        <Text style={{ fontSize: 25, marginTop: 5 }}>
                            {seguindo}
                        </Text>
                        <Text style={{ color: 'gray', marginTop: 5, fontSize: 10 }}>
                            Seguindo
                        </Text>
                    </TouchableOpacity>
                    {(!personaldata.currentUser) ? (<View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ backgroundColor: (segue) ? "#1261A0" : colorStyles.dorange, marginVertical: 5, width: 100, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} onPress={() => { if (segue) { unfollow() } else { follow() } }}>
                            <Text style={{ color: 'white', fontSize: 12 }}>
                                {(segue) ? "Deixar de seguir" : "Seguir"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{ backgroundColor: colorStyles.dorange, marginVertical: 5, width: 70, borderRadius: 5, marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => navigation.navigate("Chat", { idUser: user })}
                        >
                            <Text style={{ color: 'white', fontSize: 12 }}>
                                Mensagem
                        </Text>
                        </TouchableOpacity>
                    </View>) : (<View style={{ width: 210 }} />)} 
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                    <TouchableOpacity style={{ alignItems: 'center', width: ((Dimensions.get('window').width - 40) / 2) }} onPress={() => { setgrid(true) }}>
                        <MaterialCommunityIcons name="grid-large" size={24} color={(grid) ? colorStyles.dorange : 'black'} />
                    </TouchableOpacity>
                    <View style={{ borderLeftWidth: 2, borderLeftColor: 'black' }} />
                    <TouchableOpacity style={{ alignItems: 'center', width: ((Dimensions.get('window').width - 40) / 2) }}>
                        <MaterialIcons name="photo-library" size={24} color={(!grid) ? colorStyles.dorange : 'black'} onPress={() => { setgrid(false) }} />
                    </TouchableOpacity>
                </View>
                <Timeline uid={user} grid={grid} />
            </ScrollView>
            <Cambutton />
        </View>
    )
}
