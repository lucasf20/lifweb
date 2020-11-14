import React, {useEffect,useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';
import Cambutton from '../../Components/Cambutton'

import Stories from "../../Components/Stories";

import HeaderSp from "../../Components/HeaderSp";
import StoriesList from "../../Components/Stories";
import Post from './Post'


import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Feed(){

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const[firstAccess, setFirstAccess] = useState(false)

    //login required
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user =>{
            if(!user){
                navigation.navigate('Login')
            }else{ 
                firebase.database().ref('user/'+user.uid+'/firstAccess').on('value',snapshot => {
                    setFirstAccess(snapshot.val())
                })
                if (firstAccess){
                    navigation.navigate('CreateAcc2')
                }
            }
        })
    })

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome(){
        navigation.navigate('Login');
    }
    
    return(
        <SafeAreaView>
            <HeaderSp/>
            <ScrollView>
                <Stories />
                <Post/>
            </ScrollView>
            <Cambutton/>
        </SafeAreaView>
    );
}

