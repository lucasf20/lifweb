import React from 'react';
import {Feather} from '@expo/vector-icons';
import {ScrollView, View,Text, Image, TouchableOpacity, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import styles from './styles';

import colorStyles from "../../colors";


export default function Feed(){

    const dorange = colorStyles.dorange
    const navigation = useNavigation();

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
                    onPress={(navigateHome)}
                    title="logout"
                    color={dorange}
                />
            </View>
        </ScrollView>
    );
}

