import React from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import lifweb from '../../assets/logolifweb.png';

import styles from './styles';
import Login from '../Login';
import EmailVal from '../EmailVal';

import colorStyles from "../../colors";


export default function CreateAcc(){

    const dorange = colorStyles.dorange
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome(){
        navigation.navigate(Login);
    }

    function navigateEmail(){
        navigation.navigate(EmailVal);
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

            <MyTextInput/>
                
            <View style = {styles.ButtonView}>
                <Button onPress={navigateEmail}
                    title= "Criar uma Conta" 
                    color= {dorange}
                />             
            </View>
 
        </ScrollView>
    );
}

