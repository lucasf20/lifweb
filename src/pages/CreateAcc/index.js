import React, {useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import lifweb from '../../assets/logolifweb.png';

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function CreateAcc(){

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [regEmail, setRegEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [senha2, setSenha2] = useState('');

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome(){
        navigation.navigate('Login');
    }

    function navigateEmail(){
        navigation.navigate('EmailVal');
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
            alert("As senhas inseridas não são iguais!\n\nTente outra vez!")
            return false
        }
        if(password.length < 6){
            alert("A senha deve possuir pelo menos 6 caracteres!\n\nTente outra vez!")
            return false
        }
        if(!(password.match(/[0-9]/))){
            alert("A senha deve possuir pelo menos um número!\n\nTente outra vez!")
            return false
        }
        if(!(password.match(/[a-z]|[A-Z]/))){
            alert("A senha deve possuir pelo menos uma letra!\n\nTente outra vez!")
            return false
        }
        return true
    }

    
    function verifyAvailability(email){
        var res = firebase.auth().fetchSignInMethodsForEmail(email)
        .then(arr =>{
            if(arr.length > 0){
                alert("Este E-mail já está sendo usado!\n\nFaça Login ou tente recuperar sua senha!")
                return false
            }else{
                return true
            }
        }).catch(error => {
            alert("E-mail inválido!");
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
                            firebase.database().ref('user/' + user.uid).set(
                                {
                                    fullName: name,
                                    firstAccess:true
                                }
                            )
                            navigation.navigate('CreateAcc2')
                            alert("Usuário cadastrado com sucesso!")
                        }).catch(function(error) {
                        // An error happened.
                        });
                        //user.sendEmailVerification()
                        //navigation.navigate('Login')
                    })
                    .catch(error =>{
                        alert("Falha ao castrar usuário!")
                    })
                }
            }
        }else{
            alert("Por favor, insira seu nome completo corretamente!")
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
                Nome Completo:
            </Text>

            <MyTextInput 
                onChangeText = {text => setNome(text)}
                value = {nome}
                placeholder = "Nome Completo"
            />

            <Text style={styles.LooseText}>
                Email?
            </Text>

            <MyTextInput 
                onChangeText = {text => setRegEmail(text)}
                value = {regEmail}
                placeholder = "E-mail"
            />

            <Text style={styles.LooseText}>
                Senha
            </Text>

            <MyTextInput 
                secureTextEntry={true}
                onChangeText = {text => setSenha(text)}
                value = {senha}
                placeholder = "Senha"
            />

<           Text style={styles.LooseText}>
                Repita a senha
            </Text>

            <MyTextInput
                secureTextEntry={true} 
                onChangeText = {text => setSenha2(text)}
                value = {senha2}
                placeholder = "Repita a senha"
            />
                
            {/* <View style = {styles.ButtonView}>
                <Button onPress={() => {validateAndRegister(nome, regEmail,senha,senha2)}}
                    title= "Próximo" 
                    color= {dorange}
                />             
            </View>
  */}
        <View style={styles.ButtonView}>
                <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 10 }} onPress={() => { validateAndRegister(nome, regEmail,senha,senha2) }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", padding: 5 }}>
                            PRÓXIMO
                    </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </KeyboardAwareScrollView>
    );
}

