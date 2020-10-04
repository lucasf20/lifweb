import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';

import styles from './styles';

import colorStyles from "../../colors";
import firebase from '../../../firebaseConfig';

export default function Menu() {

    const dorange = colorStyles.dorange
    const navigation = useNavigation();

    function logout(){
        firebase.auth().signOut()
        .then(navigation.navigate('Login'))
    }

    return (
        <View style={{...styles.container,paddingTop:25, paddingHorizontal:18}}>
            <TouchableOpacity onPress={() => {navigation.navigate("Feed")}}>
               <SimpleLineIcons name="menu" size={24} color="white" style={{marginTop:23, paddingHorizontal:(-18)}}/>
           </TouchableOpacity>
            <ScrollView style={{...styles.container, paddingHorizontal:18}}>
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
                        <SimpleLineIcons name="bell" size={24} color="white" style={{ paddingVertical: 20 }} />
                        <Text style={styles.BigText}>
                            Notificação
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <SimpleLineIcons name="user" size={24} color="white" style={{ paddingVertical: 20 }} />
                        <Text style={styles.BigText}>
                            Perfil
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <SimpleLineIcons name="settings" size={24} color="white" style={{ paddingVertical: 20 }} />
                        <Text style={styles.BigText}>
                            Configurações
                </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.viewLogout}>
                <TouchableOpacity style={styles.logoutButon} onPress={()=>{logout()}}>
                    <SimpleLineIcons name="logout" size={24} color="white" style={{ paddingVertical: 20 }} />
                    <Text style={styles.BigText}>
                        Sair
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

