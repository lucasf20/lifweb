import React, {useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import styles from './styles';

import colorStyles from "../../colors";

export default function FindMoto(){

    const dorange = colorStyles.dorange
    const navigation = useNavigation();

    const [moto, setMoto] = useState('')

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome(){
        navigation.navigate('Login');
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
                Selecione o modelo da sua moto
            </Text>
            
            <MyTextInput
                placeholder='Modelo da moto'
            />
 
        </ScrollView>
    );
}

