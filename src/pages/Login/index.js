import React from 'react';
import {Feather} from '@expo/vector-icons';
import {View,Text, Image, TouchableOpacity, Linking, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { TextInput } from 'react-native';


import face from '../../assets/facebooklogin.png';
import google from '../../assets/googlelogin.png';
import apple from '../../assets/appleidlogin.png';
import lifweb from '../../assets/logolifweb.png';

import styles from './styles';
import { AppLoading } from 'expo';


export default function Login(){
    const navigation = useNavigation();
    const message = 'Olá AppLoading, estou entrando em contato pois gostaria de ajudar no caso "Cadelinha atrpelada" com o valor de 120R$';

    function navigateToCreateAcc() {
        navigation.navigate('CreateAcc');
    }

    return(
        <View style = {styles.container}>
            

            <View styles = {styles.Logo}>
                <Image
                    source = {lifweb}
                />
            </View>
             

            <View style = {styles.container}>

                <Text style ={[styles.incidentProperty, {marginTop:0}]}>Email</Text>
                <TextInput 
                    style={styles.TextBox}
                    //onChangeText={text => (' ')}
                    value={''}
                />
                <Text style ={[styles.incidentProperty, {marginTop:0}]}>Senha</Text>
                <TextInput 
                    style={styles.TextBox}
                    //onChangeText={text => (' ')}
                    value={''}
                />
                <Button style ={[{marginTop:0}]}
                   title= "login" 
                />
                <TouchableOpacity>
                    <Text>
                        Esqueci minha senha
                    </Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.container}>
                

                <View style= {styles.Login}>
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

            </View>
            
        </View>
    );
}

