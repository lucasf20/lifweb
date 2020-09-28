import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import colorStyles from "../../colors";

const dorange = colorStyles.dorange

export default StyleSheet.create({

    container: {
        paddingHorizontal: 36,
        paddingTop: Constants.statusBarHeight + 40,
        paddingBottom: 50
    },

    logo: {
        flex:3,
        justifyContent:'center',
        flexDirection:'row',
    },

    Login: {
        flex:2,
        paddingVertical:20,
    },

    loginButton: {
        flex:2,
        paddingVertical:10,
    },

    LooseText:{
        paddingTop:5,
        alignItems: 'center',
    },

    SocialNetwork: {
        alignItems: 'center',
    },

    label:{
        color:'white'
    },

    boldLabel:{
        color:'white',
        fontWeight:'bold'
    },

    orangeLabel:{
        color:dorange
    },

    passLabel:{
        color:'orange'
    },

    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
    
});