import React from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import lifweb from '../../assets/logolifweb.png';

import styles from './styles';
import Login from '../Login';

import colorStyles from "../../colors";


export default function EmailVal(){

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
                    <Text>
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
                Código de confirmação
            </Text>

            <Text style={styles.LooseText} >
                Digite o código de confirmação que enviamos para "email da pessoa"
            </Text>
            
            <TouchableOpacity>
                <Text style={styles.LooseOrangeText}>
                    Reenviar código
                </Text>            
            </TouchableOpacity> 


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

