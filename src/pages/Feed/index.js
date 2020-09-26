import React, {useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

export default function Feed(){

    const dorange = colorStyles.dorange
    const navigation = useNavigation();

    //login required
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user =>{
            if(!user){
                navigation.navigate('Login')
            }
        })
    }, [])

    function logout(){
        firebase.auth().signOut()
        .then(navigation.navigate('Login'))
    }

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome(){
        navigation.navigate('Login');
    }
    
    return(
        
        <ScrollView>
            <View style = {styles.container}>
                <Button 
                    onPress={() => {logout()}}
                    title="logout"
                    color={dorange}
                />
            </View>
        </ScrollView>
    );
}

