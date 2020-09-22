import React from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import styles from './styles';
import Login from '../Login';

import colorStyles from "../../colors";


export default function CreatePass(){

    const dorange = colorStyles.dorange
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome(){
        navigation.navigate(Login);
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

            <Text style={styles.BigText}>
                Vamos Lá!
            </Text>

            <Text style={styles.LooseText} >
                Confirme seus dados de acesso
            </Text>
            
            <MyTextInput
                placeholder='Nome'
            />

            <MyTextInput
                placeholder='Código de confirmação'
            />
                
            <View style = {styles.ButtonView}>
                <Button
                    title= "Próximo"
                    color= {dorange} 
                />             
            </View>
 
        </ScrollView>
    );
}

