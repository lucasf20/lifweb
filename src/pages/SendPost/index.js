import React, {useEffect,useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, Dimensions, View,Text, Image, TouchableOpacity, Button, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import Header from "../../Components/HeaderSp";

import styles from './styles';

import colorStyles from "../../colors";

import PostImage from '../../images/post_image.png'

function Post({source}) {

    function imageResize(source) {
        const screenwidth = Dimensions.get('window').width - 10;
        const {width, height} = Image.resolveAssetSource(source);
        return [screenwidth, height * screenwidth/width] 
    }

    return(
        <View>
            <View style={{alignItems:'center'}}>
                <Image style={{...styles.postImg, width:imageResize(source)[0],height:imageResize(source)[1]}} source={source} />
            </View>
        </View>
    )
}

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
                <Post source={PostImage}/>
            </ScrollView>
        </View>
    );
}

