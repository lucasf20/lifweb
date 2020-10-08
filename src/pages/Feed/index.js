import React, {useEffect,useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';
import cameraIcon from '../../assets/camera_icon.png'
import Stories from "../../Components/Stories";
import Header from "../../Components/Header";
import StoriesList from "../../Components/Stories";
import PostsList from "../../Components/PostsList";


import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

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
        <View>
            <Header />
            <ScrollView>
                <Stories />
                <PostsList />
            </ScrollView>
            <TouchableOpacity style={{
                ...styles.cameraIcon,
                ...styles.alignItemsEnd,
                ...styles.positionAbsolute,
                ...styles.paddingDefault,
                ...styles.floatRight,
            }}
            onPress={() =>{}}
            >
                <Image source={cameraIcon} style={{height:60, width:60}}></Image>
            </TouchableOpacity>
        </View>
    );
}

