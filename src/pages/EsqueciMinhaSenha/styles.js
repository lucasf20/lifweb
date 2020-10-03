import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import colorStyles from "../../colors";

const dorange = colorStyles.dorange

export default StyleSheet.create({
    container: {
        paddingHorizontal: 36,
        paddingTop: Constants.statusBarHeight + 15,
        paddingBottom: 50
    },

    logo: {
        flex:3,
        justifyContent:'center',
        flexDirection:'row',
    },

    ButtonView: {
        paddingTop:90,
    },

    LooseText:{
        paddingVertical:10,
        alignItems: 'center',
    },

    LooseOrangeText:{
        paddingVertical:10,
        alignItems: 'center',
        color: dorange
    },


    BigText:{
        fontSize:30,
        paddingVertical:10,
        alignItems: 'center',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

   
});