import * as Localization from 'expo-localization'
import i18n from 'i18n-js';
import React, {useState} from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import lifweb from '../../assets/logolifweb.png';

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import translate from '../../translate';

i18n.translations = translate

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function EsqueciMinhaSenha() {

    const [email, setEmail] = useState('')

    const dorange = colorStyles.dorange
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome() {
        navigation.navigate('Login');
    }

    function navigatePass() {
        navigation.navigate('CreatePass');
    }

    function recoverPass(){
        firebase.auth().fetchSignInMethodsForEmail(email)
        .then(() =>{
            firebase.auth().sendPasswordResetEmail(email)
            .then( () =>{
                alert("O e-mail de recuperação de senha foi enviado!\nVerifique sua caixa de e-mail!")
                navigation.navigate('Login')
            })
            .catch(erro => {
                alert("O e-mail informado não consta como um usuário LifWeb!\nRegistre-se no nosso app!")
                navigation.navigate('CreateAcc')   
            })
        }
        ).catch(erro => {
            alert("Falha ao enviar e-mail!")
        })
    }

    return (
        <KeyboardAwareScrollView  
        keyboardShouldPersistTaps={'always'}
        style={{flex:1}}
        showsVerticalScrollIndicator={false}>
            <ScrollView style={styles.container}>

                <View style={styles.header}>

                    <TouchableOpacity onPress={navigateBack}>
                        <Feather name="arrow-left" size={28} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateHome}>
                        <Text style={styles.LooseOrangeText}>
                            {i18n.t('start')} 
                    </Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.logo}>
                    <Image
                        source={lifweb}
                    />
                </View>

                <Text style={styles.BigText}>
                    {i18n.t('passwrecover')} 
            </Text>
            <Text style={{color:'gray', paddingBottom:10, fontSize:15}}>
                {i18n.t('passwrphrase')} 
            </Text>
                <View>
                    <Text style={{ color: 'black', fontWeight: 'bold', paddingBottom: 10 }}>
                        E-mail
                </Text>
                </View>


                <MyTextInput
                    placeholder={i18n.t('emailfield')} 
                    value={email}
                    onChangeText={text => setEmail(text)}
                />


                <View style={styles.ButtonView}>
                    <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 10 }} onPress={() => { recoverPass() }}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", padding: 5, paddingTop: 14 }}>
                                {i18n.t('next')} 
                    </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

