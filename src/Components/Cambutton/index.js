import React from 'react'
import {TouchableOpacity,Image} from 'react-native'
import styles from './styles'
import cameraIcon from '../../assets/camera_icon.png'

export default function Cambutton(){
    return(
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
    )
}