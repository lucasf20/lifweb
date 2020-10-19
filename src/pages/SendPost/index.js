import React, {useEffect,useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import Header from "../../Components/HeaderSp";

import styles from './styles';

import colorStyles from "../../colors";

export default function SendPost(){

    const dorange = colorStyles.dorange
    const navigation = useNavigation();


    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome(){
        navigation.navigate('Login');
    }
    
    return(
        <View>
            <Header/>
            <ScrollView>

            </ScrollView>
        </View>
    );
}

