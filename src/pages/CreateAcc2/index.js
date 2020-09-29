import React, {useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import lifweb from '../../assets/logolifweb.png';

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';


export default function CreateAcc2(){

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [Name, setName] = useState('');
    const [data, setData] = useState('');
    const [moto, setMoto] = useState('');
    const [profissao, setProfissao] = useState('');

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome(){
        navigation.navigate('Login');
    }

    function navigateEmail(){
        navigation.navigate('EmailVal');
    }
    
    function getFullName(){
        const user = firebase.auth().currentUser
        var FullName = "" 
        firebase.database().ref('user/'+user.uid+"/fullName").on('value',function get(snapshot){
            FullName = snapshot.val()
        })
        return FullName
    }

    
    return(
        
        <ScrollView style = {styles.container}>

            <View style={styles.header}>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name = "arrow-left" size = {28} />
                </TouchableOpacity>

            </View>  

            <View style = {styles.logo}>
                <Image
                    source = {lifweb}
                />
            </View>

            <Text style={styles.BigText}>
                {getFullName()}, 
            </Text>

            <Text style={styles.LooseText}>
                Como você gostaria de ser chamado?
            </Text>

            <MyTextInput 
                onChangeText = {text => setName(text)}
                value = {Name}
                placeholder = 'Nome'
            />
            <Text style={styles.LooseText}>
                Qual a sua moto?
            </Text>
            <MyTextInput 
                onChangeText = {text => setMoto(text)}
                value = {moto}
                placeholder = 'Modelo da moto'
            />
            <Text style={styles.LooseText}>
                Qual a sua profissão?
            </Text>
            <MyTextInput 
                onChangeText = {text => setProfissao(text)}
                value = {profissao}
                placeholder = 'Profissão'
            />
            <Text style={styles.LooseText}>
                Qual a sua data de nascimento?
            </Text>
            <MyTextInput 
                onChangeText = {text => setData(text)}
                value = {data}
                placeholder = 'Data de Nascimento'
            />
                
            <View style = {styles.ButtonView}>
                <Button
                    title= "Finalizar" 
                    color= {dorange}
                />             
            </View>
 
        </ScrollView>
    );
}

