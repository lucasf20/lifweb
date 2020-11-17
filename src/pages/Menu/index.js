import * as Localization from 'expo-localization'
import i18n from 'i18n-js';
import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import NotifyCircle from '../../Components/NotifyCircle'

import styles from './styles';

import colorStyles from "../../colors";
import firebase from '../../../firebaseConfig';

import profileIcon from '../../assets/logolifweb.png'
import Svg, {
    Image as SvgImage,
    Defs,
    ClipPath,
    Polygon,
} from 'react-native-svg';

import translate from '../../translate';

i18n.translations = translate

i18n.locale = Localization.locale;
i18n.fallbacks = true;


export default function Menu() {

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [profPicture, setprofPicture] = useState(false)


    function logout() {
        firebase.auth().signOut()
            .then(navigation.navigate('Login'))
    }

    function getDisplayName() {
        var user = firebase.auth().currentUser
        return user.displayName
    }

    function getEmail() {
        const user = firebase.auth().currentUser
        return user.email
    }

    function getProfilePicture() {
        var user = firebase.auth().currentUser
        var storage = firebase.storage().refFromURL("gs://lifweb-38828.appspot.com/user/" + user.uid + "/perfil")
        if(!profPicture){
            storage.getDownloadURL().then(url => {
            setprofPicture({ uri: url })
            }).catch(erro => {
                setprofPicture(false)
            })
        }
        if (profPicture || user.photoURL) {
            var img = profPicture
            if(!profPicture){
                img = {uri: user.photoURL}
            }
            return (
                <Svg width="100" height="100" viewBox="0 -3 43 55">
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
                        href={img}
                        clipPath="#image"
                    />
                </Svg>
            )
        } else {
            return (<Image source={profileIcon}  style={{height:100, width:87}}/>)
        }
    }

    const [msg, setmsg] = useState(0)

    setTimeout(() => {
        firebase.firestore().collection('mensagens').where('idDestinatario', "==", firebase.auth().currentUser.uid).get().then(
        data => {
            if(!data.empty){
                var cnt = 0
                data.forEach(
                    item => {
                        
                        if(!item.data()['lida']){
                            cnt++
                        }
                    }
                )
                console.log("cnt",cnt)
                setmsg(cnt)
            }
        }
    ) 
    }, 15000);
    

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate("Feed") }} style={{ marginTop: 40, marginLeft: 5 }}>
                <Ionicons name="md-arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={{ ...styles.container, paddingHorizontal: 18 }}>
                <ScrollView style={{ ...styles.container, paddingHorizontal: 18 }}>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity style={styles.buttons} onPress={() => { navigation.dispatch(StackActions.popToTop());navigation.navigate('Profile', {uid:firebase.auth().currentUser.uid}); }}>
                            <SimpleLineIcons name="picture" size={24} color="white" />
                            <Text style={styles.BigText}>
                                Timeline
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.buttonView}></View>
                        <TouchableOpacity style={{ ...styles.buttons, borderTopColor: 'transparent' }} onPress={() => { navigation.navigate('MinhasMensagens') }}>
                            <SimpleLineIcons name="bubbles" size={24} color="white" />
                            {msg > 0 && (<NotifyCircle text={msg} color='red' style={{ marginTop: 17, position: "absolute", marginLeft: 10 }}></NotifyCircle>)}
                            <Text style={styles.BigText}>
                                {i18n.t('message')}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.buttonView}></View>
                        <TouchableOpacity style={styles.buttons} onPress={()=>{navigation.dispatch(StackActions.popToTop());navigation.navigate('Follow',{from:"Menu",followed:true, uid:firebase.auth().currentUser.uid, user:null})}}>
                            <SimpleLineIcons name="people" size={24} color="white" />
                            <Text style={styles.BigText}>
                                {i18n.t('followers')}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.buttonView}></View>
                        <TouchableOpacity style={styles.buttons} onPress={()=>{navigation.dispatch(StackActions.popToTop());navigation.navigate('Follow',{from:"Menu",followed:false, uid:firebase.auth().currentUser.uid, user:null})}}>
                            <SimpleLineIcons name="user-following" size={24} color="white" />
                            <Text style={styles.BigText}>
                                {i18n.t('following')}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.buttonView}></View>
                        <TouchableOpacity style={styles.buttons}>
                            <SimpleLineIcons name="bell" size={24} color="white" />
                            {/*<NotifyCircle style={{ marginTop: 17, position: "absolute", marginLeft: 10 }}></NotifyCircle>*/}
                            <Text style={styles.BigText}>
                                {i18n.t('notification')}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.buttonView}></View>
                        <TouchableOpacity style={styles.buttons} onPress={() => { navigation.navigate('EditProfile') }}>
                            <SimpleLineIcons name="user" size={24} color="white" />
                            {/*<Ionicons name="ios-remove-circle-outline" size={18} color="white" style={{ marginTop: 17, position: "absolute", marginLeft: 10 }} />*/}
                            {/*<Ionicons name="ios-remove-circle" size={18} color="Transparent" style={{ marginTop: 17, position: "absolute", marginLeft: 10 }} />*/}
                            <Text style={styles.BigText}>
                                {i18n.t('editprofile')}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.buttonView}></View>
                        <TouchableOpacity style={styles.buttons} onPress={()=>{navigation.navigate('Settings')}}>
                            <SimpleLineIcons name="settings" size={24} color="white" />
                            <Text style={styles.BigText}>
                                {i18n.t('configurations')}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.buttonView}></View>
                        <TouchableOpacity style={styles.buttons} onPress={() => { logout() }}>
                            <SimpleLineIcons name="logout" size={24} color="white" />
                            <Text style={styles.BigText}>
                                {i18n.t('logout')}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.buttonView}></View>
                    </View>
                    <View style={{ marginTop: 40, marginBottom: 20 }}>
                        {getProfilePicture()}
                        <Text style={{ fontSize: 25, color: 'white' }}>
                            {getDisplayName()}
                        </Text>
                        <Text style={{ fontSize: 13, color: 'white' }}>
                            {getEmail()}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

