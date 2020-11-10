import React, { useState } from 'react'
import { Text, SafeAreaView, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import firebase from '../../../firebaseConfig'
import { useNavigation, StackActions } from '@react-navigation/native';
import Header from '../../Components/Header'
import profileIcon from '../../assets/logolifweb.png'
import Svg, {
    Image as SvgImage,
    Defs,
    ClipPath,
    Polygon,
} from 'react-native-svg';

function Item({ uid, origin }) {
    const [name, setname] = useState("")
    const [foto, setfoto] = useState(null)
    const nav = useNavigation()

    function getName() {
        var data = {}
        if (name.length == 0) {
            firebase.database().ref('user/' + uid).on('value', snap => {
                data = snap.val()
            })
            if (Object.keys(data).length == 0) {
                (origin.from== "Menu")?nav.navigate("Menu"):nav.navigate("Profile", {uid:origin.user})
            } else {
                setname(data['apelido'])
            }
        }
    }

    async function getFoto() {
        if (foto == null) {
            await firebase.storage().refFromURL("gs://lifweb-38828.appspot.com/user/" + uid + "/perfil").getDownloadURL().then(
                url => setfoto({ uri: url })
            ).catch(erro => setfoto(false))
        }
    }

    getName()
    getFoto()

    return (
        <View style={{ borderColor: 'transparent', height: 100, borderBottomColor: 'silver', borderWidth: 1 }}>
            {(foto) ? (
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {nav.dispatch(StackActions.popToTop());nav.navigate("Profile", {uid:uid})}}>
                    <Svg width="90" height="90" viewBox="0 -3 43 55">
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
                            href={foto}
                            clipPath="#image"
                        />
                    </Svg>
                    <Text style={{marginLeft:20, fontWeight:'bold', fontSize:20}}>
                        {name}
                    </Text>
                </TouchableOpacity>) : (
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {nav.dispatch(StackActions.popToTop());nav.navigate("Profile", {uid:uid})}}>
                        <Image source={profileIcon} style={{ height: 90, width: 78, marginLeft:7 }} />
                        <Text style={{marginLeft:25, fontWeight:'bold', fontSize:20}}>
                            {name}
                        </Text>
                    </TouchableOpacity>
                )}
        </View>
    )
}

export default function Follow({ navigation, route }) {
    const nav = useNavigation()
    const [gotFollows, setgotFollows] = useState(false)
    const [follow, setfollow] = useState([])

    async function getFollows() {
        if (!gotFollows) {
            await firebase.firestore().collection('user').doc(route.params.uid).get().then(
                data => {
                    if (!data.exists) {
                        firebase.firestore().collection('user').doc(route.params.uid).update({ following: [], followed: [] })
                        setgotFollows(false)
                    } else {
                        var cnt = data.data()
                        if (route.params.followed) {
                            setfollow(cnt['followed'])
                        } else {
                            setfollow(cnt['following'])
                        }
                        setgotFollows(true)
                    }
                }
            )
            
        }
    }

    getFollows().then(console.log(follow))

    return (
        <SafeAreaView>
            <View style={{ marginHorizontal: 20, marginVertical: 30 }}>
                <Header/>
                <Text style={{ marginTop: 20, fontSize: 30, fontWeight: "bold" }}>
                    {(route.params.followed) ? "Seguidores" : "Seguindo"}
                </Text>
                <ScrollView>
                    {(gotFollows && follow)?(follow.map((item) => (<Item uid={item} origin={{from:route.params.from, user:route.params.user}}/>))):(console.log(gotFollows))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}