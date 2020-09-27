import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

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
        paddingVertical:50,
    },

    LooseText:{
        paddingTop:5,
        alignItems: 'center',
    },

    SocialNetwork: {
        alignItems: 'center',
    },

    label:{
        fontWeight:"bold"
    }
    
});