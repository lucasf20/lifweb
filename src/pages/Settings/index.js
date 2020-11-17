import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions, View, Text, Image, TouchableOpacity, Alert, Linking } from 'react-native';
import firebase from '../../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import colorStyle from "../../colors"
import logo from '../../assets/logolifweb.png'
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
    const nav = useNavigation()

    async function excluir() {
        var user = firebase.auth().currentUser
        await user.delete()  
        await firebase.storage().ref("user/" + user.uid).delete().catch(console.log("firestore"))
        await firebase.firestore().collection("user/").doc(user.uid).delete().catch(console.log("eror"))
        await firebase.database().ref("user/" + user.uid).remove().catch(console.log("eror"))
         
    }

    return (
        <View>
            <Ionicons name="md-arrow-back" size={24} color="black" style={{ marginTop: 30, marginLeft: 5 }} onPress={() => nav.navigate("Menu")} />
            <View style={{ alignItems: 'center', width: '100%', marginTop: 30 }}>
                <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width: "50%", marginTop: 30, marginLeft: 20, justifyContent: 'center', alignItems: 'center', height: 70 }} onPress={
                    () => {
                        Alert.alert(
                            'Deletar conta?',
                            'Você tem certeza que deseja deletar sua conta?',
                            [
                                {
                                    text: 'Deletar',
                                    onPress: () => excluir()
                                },
                                {
                                    text: 'Cancelar',
                                    onPress: () => console.log("Cancelou"),
                                    style: 'cancel'
                                }
                            ],
                            { cancelable: true }
                        );
                    }}>
                    <Text style={{ color: 'white' }}>
                        Excluir conta?
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: colorStyle.dorange, borderRadius: 5, width: "50%", marginTop: 30, marginLeft: 20, justifyContent: 'center', alignItems: 'center', height: 70 }} onPress={() => { Linking.openURL('https://lifweb.com.br/contato/') }}>
                    <Text style={{ color: 'white' }}>
                        Fale Conosco
                </Text>
                </TouchableOpacity>

                <Image source={logo} style={{ marginTop: 100 }} />
                <Text style={{ color: 'gray' }}>
                    LifWeb v1.0.0
                </Text>
            </View>
        </View>
    )
}