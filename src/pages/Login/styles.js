import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import colorStyles from "../../colors";

const dorange = colorStyles.dorange

export default StyleSheet.create({

    container: {
        paddingHorizontal: 36,
        paddingTop: Constants.statusBarHeight + 40,
        paddingBottom: 50,
        flex: 1
    },

    logo: {
        justifyContent:'center',
        flexDirection:'row',
    },

    

    Login: {
        flex:2,
        paddingVertical:20,
    },

    SocialNetwork: {
        alignItems: 'center',
    },

    loginButton: {
        flex:2,
        paddingVertical:10,
    },

    LooseText:{
        paddingTop:5,
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
        paddingTop:40,
        color:"#FD6A02",
        fontWeight:'bold',
        fontSize:15
    },

    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
    
});