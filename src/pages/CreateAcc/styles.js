import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        paddingHorizontal: 36,
        paddingTop: Constants.statusBarHeight + 50,
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
        paddingVertical:10,
        alignItems: 'center',
    },


    BigText:{
        fontSize:80,
        paddingVertical:10,
        alignItems: 'center',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

   
});