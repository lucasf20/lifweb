import React, { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';
import cameraIcon from '../../assets/camera_icon.png'

import Header from "../../Components/Header";

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

export default function Feed() {

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [firstAccess, setFirstAccess] = useState(false)

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome() {
        navigation.navigate('Login');
    }

    return (
        <View>
            <Header />
            <View style={{padding:15}}>
                <EvilIcons name="search" size={30} color="black" style={{position:"absolute", margin:25}}/>
                <MyTextInput
                    placeholder="Buscar"
                    style={{paddingLeft:40}}
                />
            </View>
            <ScrollView>
                {/* <PostsList /> */}
            </ScrollView>
        </View>
    );
}

