import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';

import styles from './styles';

import colorStyles from "../../colors";
import firebase from '../../../firebaseConfig';


import profileIcon from '../../assets/logolifweb.png'

import sino from '../../assets/sino.png'
import perfil from '../../assets/perfil.png'


export default function Menu() {

    const dorange = colorStyles.dorange
    const navigation = useNavigation();


    function logout() {
        firebase.auth().signOut()
            .then(navigation.navigate('Login'))
    }

    function resizeProfile(scale_factor){
        const {width, height} = Image.resolveAssetSource(profileIcon)
        return {width: width*scale_factor, height:height*scale_factor}
    }

    function getName(){
        var name;
        const user =firebase.auth().currentUser
        firebase.database().ref('user/' + user.uid + '/apelido/').on('value', snapshot=>{
            name = snapshot.val()
        })
        return name
    }
    
    function getDisplayName(){
        var user = firebase.auth().currentUser
        return user.displayName
    }

    function getEmail(){
        const user = firebase.auth().currentUser
        return user.email
    }
    return (
        <View style={{ ...styles.container, paddingTop: 25, paddingHorizontal: 18 }}>
            <TouchableOpacity onPress={() => { navigation.navigate("Feed") }}>
                <SimpleLineIcons name="menu" size={24} color="white" style={{ marginTop: 23, paddingHorizontal: (-18) }} />
            </TouchableOpacity>
            <ScrollView style={{ ...styles.container, paddingHorizontal: 18 }}>

                <View style={{ paddingTop: 75 }}>
                    <TouchableOpacity style={{ ...styles.buttons, borderTopColor: 'transparent' }}>
                        <SimpleLineIcons name="bubbles" size={24} color="white" style={{ paddingVertical: 20 }} />
                        <Text style={styles.BigText}>
                            Mensagem
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <SimpleLineIcons name="people" size={24} color="white" style={{ paddingVertical: 20 }} />
                        <Text style={styles.BigText}>
                            Seguidores
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <SimpleLineIcons name="user-following" size={24} color="white" style={{ paddingVertical: 20 }} />
                        <Text style={styles.BigText}>
                            Seguindo
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={() => { navigation.navigate("Feed") }}>
                        <SimpleLineIcons name="picture" size={24} color="white" style={{ paddingVertical: 20 }} />
                        <Text style={styles.BigText}>
                            Timeline
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        {/* <SimpleLineIcons name="bell" size={24} color="white" style={{ paddingVertical: 20 }} /> */}
                        <Image source={sino} style={{height:30, width:30, marginTop:15}}/>
                        <Text style={{...styles.BigText, paddingLeft:5}}>
                            Notificação
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        {/* <SimpleLineIcons name="user" size={24} color="white" style={{ paddingVertical: 20 }} /> */}
                        <Image source={perfil} style={{height:30, width:30, marginTop:15}}/>
                        <Text style={{...styles.BigText, paddingLeft:5}}>
                            Perfil
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <SimpleLineIcons name="settings" size={24} color="white" style={{ paddingVertical: 20 }} />
                        <Text style={styles.BigText}>
                            Configurações
                </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttons} onPress={() => { logout() }}>
                        <SimpleLineIcons name="logout" size={24} color="white" style={{ paddingVertical: 20 }} />

                        <Text style={styles.BigText}>
                            Fazer Logoff
                </Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 40, marginBottom:20}}>
                    <Image source={profileIcon} style={{height:resizeProfile(0.5).height,width:resizeProfile(0.5).width}}/>
                    <Text style={{fontSize:25, color:'white'}}>
                        {(getName())?getName():getDisplayName()}
                    </Text>
                    <Text style={{fontSize:13, color:'white'}}>
                        {getEmail()}
                    </Text>
                </View>

            </ScrollView>
        </View>
    );
}

