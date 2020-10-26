import {StyleSheet, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import colorStyles from "../../colors";

const dorange = colorStyles.dorange

export default StyleSheet.create({
    cameraIcon:{
        alignItems:"flex-end", 
        position:"absolute",
        padding:20, 
        marginTop: Dimensions.get('window').height - 90,
        right:0
    }
   
});