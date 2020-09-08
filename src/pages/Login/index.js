import React from 'react';
import {Feather} from '@expo/vector-icons';
import {View,Text, Image, TouchableOpacity, Linking, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { TextInput } from 'react-native';


import logoImg from '../../assets/logo.png';

import styles from './styles';
import { AppLoading } from 'expo';


export default function Login(){
    const navigation = useNavigation();
    const message = 'Olá AppLoading, estou entrando em contato pois gostaria de ajudar no caso "Cadelinha atrpelada" com o valor de 120R$';

    function navigateBack() {
        navigation.goBack();
    }

    

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=559891997050?Gtext = ${message}`);
    }

    return(
        <View style = {styles.container}>
            <View style={styles.header}>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name = "arrow-left" size = {28} />
                </TouchableOpacity>
            </View>  

            <View style = {styles.incident}>
                <Text style ={[styles.incidentProperty, {marginTop:0}]}>Email</Text>
                <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    //onChangeText={text => (' ')}
                    value={''}
                />
                <Text style ={[styles.incidentProperty, {marginTop:0}]}>Senha</Text>
                <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    //onChangeText={text => (' ')}
                    value={''}
                />
                <Button
                   title= "login" 
                />

                
            </View>
        </View>
    );
}