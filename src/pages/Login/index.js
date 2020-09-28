import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Linking, Button,ImageBackground } from 'react-native';
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
        .then(()=>{navigateToFeed})
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
            <ScrollView >
                <ImageBackground source={image} style={styles.image}>
                    <Text style={styles.text}>Inside</Text>
                <View style={styles.container}>
                

                    <View style={styles.logo}>
                        <Image
                            source={lifweb}
                        />
                    </View>


                    <View style={styles.Login}>
                        
                        <Text style={styles.label}>
                            Email
                        </Text>
                        <MyTextInput
                            onChangeText={text => setEmail(text)}
                            value={email}
                            placeholder="Informe seu email"
                            placeholderTextColor='lightgray'
                        />
                        <Text style={styles.label}>
                            Senha
                        </Text>
                        <MyTextInput
                            secureTextEntry={true}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            placeholder='Informe sua senha'
                            placeholderTextColor='lightgray'
                        />
                        <Button onPress={() => {loginFirebase(); }} color={dorange} style={[{ marginTop: 0 }]}
                            title="login"
                        />
                        <View style={styles.LooseText}>
                            <TouchableOpacity>
                                <Text style={styles.label}>
                                    Esqueci minha senha
                    </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.SocialNetwork}>
                        <Text>
                            OU
                    </Text>
                        <TouchableOpacity>
                            <Image
                                source={face}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={google}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={apple}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={(navigateToCreateAcc)}>
                            <Text style={styles.label}>
                                CRIAR UMA CONTA
                        </Text>
                        </TouchableOpacity>

                    </View>
                    
                </View>
                </ImageBackground>
            </ScrollView>
        );
}
