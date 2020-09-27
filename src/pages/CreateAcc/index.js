import React, {useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import lifweb from '../../assets/logolifweb.png';

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';


export default function CreateAcc(){

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [regEmail, setRegEmail] = useState('');

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome(){
        navigation.navigate('Login');
    }

    function navigateEmail(){
        navigation.navigate('EmailVal');
    }

    function generateCode(){
        var a = ""
        for (i = 0; i < 6; i++){
          a += Math.floor(Math.random()*10)
        }
        return a
    }

    function verifyAvailability(email){
        firebase.auth().fetchSignInMethodsForEmail(email)
        .then(arr =>{
            if(arr.length > 0){
                alert("Este E-mail já está sendo usado!\n\nFaça Login ou tente recuperar sua senha!")  
            }else{
                navigateEmail();
            }
        }).catch(error => {
            alert("E-mail inválido!");
        })
    }

    
    
    return(
        
        <ScrollView style = {styles.container}>

            <View style={styles.header}>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name = "arrow-left" size = {28} />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateHome}>
                    <Text style={styles.LooseOrangeText}>
                        INICIO 
                    </Text>
                </TouchableOpacity>

            </View>  

            <View style = {styles.logo}>
                <Image
                    source = {lifweb}
                />
            </View>

            <Text style={styles.BigText}>
                Seja Bem Vindo(a)
            </Text>

            <Text style={styles.LooseText}>
                Vamos iniciar a criação da sua conta
            </Text>

            <Text style={styles.LooseText}>
                Qual é seu email?
            </Text>

            <MyTextInput 
                onChangeText = {text => setRegEmail(text)}
                value = {regEmail}
            />
                
            <View style = {styles.ButtonView}>
                <Button onPress={() => {verifyAvailability(regEmail)}}
                    title= "Criar uma Conta" 
                    color= {dorange}
                />             
            </View>
 
        </ScrollView>
    );
}

