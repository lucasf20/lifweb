import React, {useState} from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import colorStyles from '../../../colors'
import caveira from '../../../assets/caveira.png'
import caveiralike from '../../../assets/caveiralike.png'
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation, StackActions } from '@react-navigation/native';
import firebase from '../../../../firebaseConfig'

export default function Cards({ imagem, nome, profissao, moto, uid }) {
    const navigator = useNavigation()
    const [segue, setsegue] = useState(false)

    function checkFollowing(){
        firebase.firestore().collection('user').doc(uid).get().then(data => {
            if(data.exists){
                var d = data.data()
                setsegue(d['followed'].includes(firebase.auth().currentUser.uid))
            }
        })
        return segue
    }

    async function follow(){
        var phoneOwner = firebase.firestore().collection('user').doc(firebase.auth().currentUser.uid)
        var profileOwner = firebase.firestore().collection('user').doc(uid)
        await phoneOwner.get().then(data => {if(!data.exists){phoneOwner.set({following:[], followed:[]})}})
        await profileOwner.get().then(data => {if(!data.exists){profileOwner.set({following:[], followed:[]})}})
        await phoneOwner.update({following:firebase.firestore.FieldValue.arrayUnion(uid)})
        await profileOwner.update({followed:firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)})
        setsegue(true)
    }

    async function unfollow(){
        var phoneOwner = firebase.firestore().collection('user').doc(firebase.auth().currentUser.uid)
        var profileOwner = firebase.firestore().collection('user').doc(uid)
        await phoneOwner.get().then(data => {if(!data.exists){phoneOwner.set({following:[], followed:[]})}})
        await profileOwner.get().then(data => {if(!data.exists){profileOwner.set({following:[], followed:[]})}})
        await phoneOwner.update({following:firebase.firestore.FieldValue.arrayRemove(uid)})
        await profileOwner.update({followed:firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid)})
        setsegue(false)
    }

    return (
        <View style={{ borderRadius: 15, height: 320, width: 170, backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => {navigator.dispatch(StackActions.popToTop());navigator.navigate("Profile",{uid:uid})}}>
                <Image source={imagem} style={{ height: 170, width: 170, borderRadius: 15 }} />
            </TouchableOpacity>
            <Text style={{ marginTop: 15, marginHorizontal: 15, fontSize: 15 }}>
                {nome}
            </Text>
            <Text style={{ marginHorizontal: 15, fontSize: 15, fontWeight: 'bold', color: colorStyles.dorange }}>
                {profissao}
            </Text>
            <Text style={{ marginHorizontal: 15, fontSize: 15, fontWeight: 'bold' }}>
                {moto}
            </Text>
            {(!(uid == firebase.auth().currentUser.uid))?(<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 280, position: 'absolute', width: 150 }}>
                <AntDesign name="adduser" size={24} color={(checkFollowing())?"gold":"silver"} onPress={()=>{if(segue){unfollow()}else{follow()}}}/>
                <Feather name="message-square" size={24} color="silver" />
            </View>):(<View/>)}
            <FontAwesome name="circle" size={35} color="white" style={{ position: "absolute", marginLeft: 127, marginTop: 10 }} />
            <View style={{ position: 'absolute' }}>
                <Image source={caveira} style={{ height: 25, width: 25, marginLeft: 130, marginTop: 15 }} />
            </View>
        </View>
    )
}