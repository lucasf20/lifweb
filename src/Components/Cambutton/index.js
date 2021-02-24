import React from 'react';
import {TouchableOpacity,Image} from 'react-native';
import styles from './styles';
import cameraIcon from '../../assets/camera_icon.png';
import {useNavigation, StackActions} from '@react-navigation/native';


export default function Cambutton(){

    const navigation = useNavigation();

    return(
        <TouchableOpacity style={{
            ...styles.cameraIcon,
            ...styles.alignItemsEnd,
            ...styles.positionAbsolute,
            ...styles.paddingDefault,
            ...styles.floatRight,
        }}
        onPress={() => {navigation.dispatch(StackActions.popToTop()); navigation.navigate('SendPost')}}
        >
            <Image source={cameraIcon} style={{height:60, width:60}}></Image>
        </TouchableOpacity>
    )
}