import React from 'react';
import {Feather} from '@expo/vector-icons';
import {View,Text, Image, TouchableOpacity, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { TextInput } from 'react-native';

import lifweb from '../../assets/logolifweb.png';

import styles from './styles';


export default function CreateAcc(){
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack();
    }
    
    return(
        <View style = {styles.container}>
            <View style={styles.header}>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name = "arrow-left" size = {28} />
                </TouchableOpacity>
            </View>  

            <View style = {styles.container}>

                <View styles = {styles.Login}>
                    <Image
                        source = {lifweb}
                    />
                </View>

                <Text style ={[styles.incidentProperty, {marginTop:0}]}>Email</Text>
                <TextInput 
                    style={styles.TextBox}
                    //onChangeText={text => (' ')}
                    value={''}
                />
                
                
               
            </View>

            <View style = {styles.container}>
                    <Button style ={[{marginTop:300}]}
                        title= "Criar uma Conta" 
                    />
            </View>
            
        </View>
    );
}

