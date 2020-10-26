import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import NotifyCircle from '../../Components/NotifyCircle'

import styles from './styles';

import colorStyles from "../../colors";
import firebase from '../../../firebaseConfig';

import profileIcon from '../../assets/logolifweb.png'


export default function Menu() {

    const dorange = colorStyles.dorange
    const navigation = useNavigation();


    function logout() {
        firebase.auth().signOut()
            .then(navigation.navigate('Login'))
    }

    function resizeProfile(scale_factor) {
        const { width, height } = Image.resolveAssetSource(profileIcon)
        return { width: width * scale_factor, height: height * scale_factor }
    }

    function getName() {
        var name;
        const user = firebase.auth().currentUser
        firebase.database().ref('user/' + user.uid + '/apelido/').on('value', snapshot => {
            name = snapshot.val()
        })
        return name
    }

    function getDisplayName() {
        var user = firebase.auth().currentUser
        return user.displayName
    }

    function getEmail() {
        const user = firebase.auth().currentUser
        return user.email
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ marginTop: 40, marginLeft: 5 }}>
                <Ionicons name="md-arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={{ ...styles.container, paddingHorizontal: 18 }}>
                <ScrollView style={{ ...styles.container, paddingHorizontal: 18 }}>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity style={styles.buttons} onPress={() => { navigation.navigate('Profile') }}>
                            <SimpleLineIcons name="picture" size={24} color="white" style={{ paddingVertical: 20 }} />
                            <Text style={styles.BigText}>
                                Timeline
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.buttons, borderTopColor: 'transparent' }} onPress={() => { navigation.navigate("Direct") }}>
                            <SimpleLineIcons name="bubbles" size={24} color="white" style={{ paddingVertical: 20 }} />
                            <NotifyCircle text="1" color='red' style={{ marginTop: 17, position: "absolute", marginLeft: 10 }}></NotifyCircle>
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
                        <TouchableOpacity style={styles.buttons}>
                            <SimpleLineIcons name="bell" size={24} color="white" style={{ paddingVertical: 20 }} />
                            <NotifyCircle text="8" color='#00C48C' style={{ marginTop: 17, position: "absolute", marginLeft: 10 }}></NotifyCircle>
                            <Text style={styles.BigText}>
                                Notificação
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} onPress={()=>{navigation.navigate('EditProfile')}}>
                            <SimpleLineIcons name="user" size={24} color="white" style={{ paddingVertical: 20 }} />
                            <Ionicons name="ios-remove-circle-outline" size={18} color="white" style={{ marginTop: 17, position: "absolute", marginLeft: 10 }} />
                            <Ionicons name="ios-remove-circle" size={18} color="red" style={{ marginTop: 17, position: "absolute", marginLeft: 10 }} />
                            <Text style={styles.BigText}>
                                Editar Perfil
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
                    <View style={{ marginTop: 40, marginBottom: 20 }}>
                        <Image source={profileIcon} style={{ height: resizeProfile(0.5).height, width: resizeProfile(0.5).width }} />
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

