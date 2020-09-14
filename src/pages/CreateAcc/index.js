import React from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import lifweb from '../../assets/logolifweb.png';

import styles from './styles';


export default function CreateAcc(){
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack();
    }
    
    return(
        
        <ScrollView style = {styles.container}>

            <View style={styles.header}>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name = "arrow-left" size = {28} />
                </TouchableOpacity>
                <TouchableOpacity>
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

            <MyTextInput/>
                
            <Button 
                style = {styles.Login}
                title= "Criar uma Conta" 
            />
        </ScrollView>
    );
}

