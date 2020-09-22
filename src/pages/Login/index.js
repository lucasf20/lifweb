import React, {useEffect, useState} from 'react';
import {ScrollView, View,Text, Image, TouchableOpacity, Linking, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MyTextInput from '../../MyTextInput';


import face from '../../assets/facebooklogin.png';
import google from '../../assets/googlelogin.png';
import apple from '../../assets/appleidlogin.png';
import lifweb from '../../assets/logolifweb.png';

import styles from './styles';

import colorStyles from "../../colors";
//importações FireBase
import firebase from '../../../firebaseConfig';


export default function Login(){

    const dorange = colorStyles.dorange
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    function navigateToCreateAcc() {
        navigation.navigate('CreateAcc');
    }
    function loginFirebase(){
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode, errorMessage)
          });
    }
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                console.log(user.uid)
            } else {
                console.log('não logado')
            }
        });
    },[])

    return(
        <ScrollView style = {styles.container}>
            

            <View style = {styles.logo}>
                <Image
                    source = {lifweb}
                />
            </View>
             

            <View style = {styles.Login}>

                
                <MyTextInput 
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                
                <MyTextInput 
                    onChangeText={text => setPassword(text)}
                    value={password}
                    placeholder='senha'
                />
                <Button onPress={()=>{loginFirebase()}} color = {dorange} style ={[{marginTop:0}]}
                   title= "login" 
                />
                <View style = {styles.LooseText}>
                <TouchableOpacity>
                    <Text>
                        Esqueci minha senha
                    </Text>
                </TouchableOpacity> 
                </View>

            </View>
            
            <View style= {styles.SocialNetwork}>
                <Text>
                    OU
                </Text>    
                <TouchableOpacity>
                    <Image
                          source = {face}
                     />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                       source = {google}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source = {apple}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress = {(navigateToCreateAcc)}>
                    <Text>
                        CRIAR UMA CONTA
                    </Text>
                </TouchableOpacity>

            </View>

            
        </ScrollView>
    );
}

