import * as Localization from 'expo-localization'
import i18n from 'i18n-js';
import React, {useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import lifweb from '../../assets/logolifweb.png';

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import translate from '../../translate';

i18n.translations = translate

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function CreateAcc(){

    async function rebase(){
        const { locale } = await Localization.getLocalizationAsync();
        return locale
    }
    

    const [local,setLocal] = useState(null);

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [regEmail, setRegEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [senha2, setSenha2] = useState('');

    rebase().then((locale)=>{if (!local) setLocal(locale)})

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome(){
        navigation.navigate('Login');
    }

    function navigateEmail(){
        navigation.navigate('EmailVal');
    }

    function resize(scale, img){
        const {width, height} = Image.resolveAssetSource(img);
        return {width:scale*width, height:scale*height}
    }

    function verifyName(name){
        var res = false
        if(name.split(" ").length > 1){
          res = true
        }
        return res
    }

    function verifyPassword(password, password2){
        if(!(password2 == password)){
            Alert.alert(i18n.t('verpass'))
            return false
        }
        if(password.length < 6){
            Alert.alert( "Verifique as senhas inseridas!", "A senha deve possuir pelo menos 6 caracteres!\n\nTente outra vez!")
            return false
        }
        if(!(password.match(/[0-9]/))){
            Alert.alert( "Verifique as senhas inseridas!", "A senha deve possuir pelo menos um número!\n\nTente outra vez!")
            return false
        }
        if(!(password.match(/[a-z]|[A-Z]/))){
            Alert.alert( "Verifique as senhas inseridas!", "A senha deve possuir pelo menos uma letra!\n\nTente outra vez!")
            return false
        }
        return true
    }

    
    function verifyAvailability(email){
        var res = firebase.auth().fetchSignInMethodsForEmail(email)
        .then(arr =>{
            if(arr.length > 0){
                Alert.alert("Este E-mail já está sendo usado!","Faça Login ou tente recuperar sua senha!")
                return false
            }else{
                return true
            }
        }).catch(error => {
            Alert.alert("E-mail inválido!","Tente novamente!");
            return false
        })
        return res
    }

    function validateAndRegister(name, email, password, password2){      
        if(verifyName(name)){
            if(verifyAvailability(email)){
                if(verifyPassword(password,password2)){
                    firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then(() => {
                        var user = firebase.auth().currentUser;

                        user.updateProfile({
                        displayName: name
                        }).then(function() {
                            firebase.firestore().collection('user').doc(user.uid).set(
                                {
                                    fullName:name,
                                    firstAccess:true
                                }
                            )
                            navigation.navigate('CreateAcc2')
                            //alert("Usuário cadastrado com sucesso!")
                        }).catch(function(error) {
                        // An error happened.
                        });
                        //user.sendEmailVerification()
                        //navigation.navigate('Login')
                    })
                    .catch(error =>{
                        //alert("Falha ao castrar usuário!")
                    })
                }
            }
        }else{
            Alert.alert("Nome incorreto","Por favor, insira seu nome completo corretamente!")
        }
    }    
    
    return(
        <KeyboardAwareScrollView  keyboardShouldPersistTaps={'always'}
        style={{flex:1}}
        showsVerticalScrollIndicator={false}>
        <ScrollView style = {styles.container}>

            <View style={styles.header}>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name = "arrow-left" size = {28} />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateHome}>
                    <Text style={styles.LooseOrangeText}>
                        {i18n.t('start')} 
                    </Text>
                </TouchableOpacity>

            </View>  

            <View style = {styles.logo}>
                <Image
                    source = {lifweb}
                    style={{height:resize(0.7,lifweb).height, width:resize(0.7,lifweb).width}}
                />
            </View>

            <Text style={styles.BigText}>
                {i18n.t('welcome')} 
            </Text>

            <Text style={styles.LooseText}>
                {i18n.t('phrase')}
            </Text>

            <Text style={styles.LooseText}>
                {i18n.t('fullname')}:
            </Text>

            <MyTextInput 
                onChangeText = {text => setNome(text)}
                value = {nome}
                placeholder = {i18n.t('fullname')} 
            />

            <Text style={styles.LooseText}>
                Email:
            </Text>

            <MyTextInput 
                onChangeText = {text => setRegEmail(text)}
                value = {regEmail}
                placeholder = {i18n.t('emailfield')} 
            />

            <Text style={styles.LooseText}>
                {i18n.t('passw')}:
            </Text>

            <MyTextInput 
                secureTextEntry={true}
                onChangeText = {text => setSenha(text)}
                value = {senha}
                placeholder = {i18n.t('passw')} 
            />

<           Text style={styles.LooseText}>
                {i18n.t('rpassw')}: 
            </Text>

            <MyTextInput
                secureTextEntry={true} 
                onChangeText = {text => setSenha2(text)}
                value = {senha2}
                placeholder = {i18n.t('rpassw')} 
            />
                
            {/* <View style = {styles.ButtonView}>
                <Button onPress={() => {validateAndRegister(nome, regEmail,senha,senha2)}}
                    title= "Próximo" 
                    color= {dorange}
                />             
            </View>
  */}
        <View style={styles.ButtonView}>
                <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 5 }} onPress={() => { validateAndRegister(nome, regEmail,senha,senha2) }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", padding: 15 }}>
                        {i18n.t('next')} 
                    </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </KeyboardAwareScrollView>
    );
}

