import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        justifyContent: 'space-between',
        paddingTop: Constants.statusBarHeight + 20,
    },

    Login: {
        alignItems: 'center',
    },

    logo: {
        justifyContent:'center',
        flexDirection:'row'
    },

    TextBox: {
        height: 40, 
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
    },

});