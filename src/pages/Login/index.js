import React, {useState} from 'react';
//import {Feather} from '@expo/vector-icons';
import {View,Text, Image, TouchableOpacity, Linking, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//import { TextInput } from 'react-native';

import MyTextInput from '../../MyTextInput';

import face from '../../assets/facebooklogin.png';
import google from '../../assets/googlelogin.png';
import apple from '../../assets/appleidlogin.png';
import lifweb from '../../assets/logolifweb.png';

import styles from './styles';


export default function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    function navigateToCreateAcc() {
        navigation.navigate('CreateAcc');
    }

    return(
        <View style = {styles.container}>
            

            <View style = {styles.logo}>
                <Image
                    source = {lifweb}
                />
            </View>
             

            <View style = {styles.container}>

                
                <MyTextInput 
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                
                <MyTextInput 
                    onChangeText={text => setPassword(text)}
                    value={password}
                    placeholder='senha'
                />
                <Button color="#ff5c5c" style ={[{marginTop:0}]}
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

