import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Linking, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MyTextInput from '../../MyTextInput';

import face from '../../assets/facebooklogin.png';
import google from '../../assets/googlelogin.png';
import apple from '../../assets/appleidlogin.png';
import lifweb from '../../assets/logolifweb.png';

const image = { uri: 'https://lifweb.com.br/skin/bglifweb.jpg' };

import styles from './styles';

import colorStyles from "../../colors";
//importações FireBase
import firebase from '../../../firebaseConfig';


export default function Login() {

    const dorange = colorStyles.dorange
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    function navigateToCreateAcc() {
        navigation.navigate('CreateAcc');
    }

    function navigateToFeed() {
        navigation.navigate('Feed');
    }

    function loginFirebase() {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { navigateToFeed })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("O usuário não existe ou a senha está incorreta!");
            });
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                navigation.navigate('Feed');
            }
        });
    }, [])
    return (
        <ScrollView
            style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}
        >
            <ImageBackground source={image} style={styles.image}>
                <Text style={styles.text}>Inside</Text>
                <View style={styles.container}>


                    <View style={styles.logo}>
                        <Image
                            source={lifweb}
                        />
                    </View>




                    <Text style={styles.boldLabel}>
                        Email
                        </Text>
                    <MyTextInput
                        onChangeText={text => setEmail(text)}
                        value={email}
                        placeholder="Informe seu email"
                    />
                    <Text style={styles.boldLabel}>
                        Senha
                        </Text>
                    <MyTextInput
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        placeholder='Informe sua senha'
                    />
                    <View style={styles.loginButton}>
                        <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 10 }} onPress={() => { loginFirebase() }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", padding: 5 }}>
                                    LOGIN
                    </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.LooseText}>
                            <TouchableOpacity onPress={() =>{navigation.navigate('EsqueciMinhaSenha')}}>
                                <Text style={styles.passLabel}>
                                    Esqueci minha senha
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.passLabel}>
                                OU
                    </Text>
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: "#3B5998", height: 50, borderRadius: 10 }}>
                                <View style={{ alignItems: "center", paddingTop: 5}}>
                                    <View style={{ flexDirection:"row"}}>
                                    <Image source={face} style={{height:40, width:40}} />
                                    <Text style={{color:"white", fontSize:20, paddingLeft:10, paddingTop:5}}>Logar com Facebook</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <TouchableOpacity style={{alignItems:"center",  backgroundColor: "white", height: 50, borderRadius: 10 }}>
                                <View style={{alignItems:"center", flexDirection:"row", paddingTop:5}}>
                                    <Image source={google} style={{height:40,width:40}}></Image>
                                    <Text style={{color:"black", fontSize:23, paddingLeft:10}}>
                                        Logar com Google
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: "#7D7D7D", height: 50, borderRadius: 10 }}>
                                <View style={{ alignItems: "center", paddingTop: 5 }}>
                                <View style={{ flexDirection:"row"}}>
                                    <Image source={apple} style={{height:40, width:40}} />
                                    <Text style={{color:"white", fontSize:22, paddingLeft:10,paddingTop:5}}>Logar com Apple ID</Text>
                                </View></View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={(navigateToCreateAcc)}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.label}>
                                    CRIAR UMA CONTA
                        </Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}

