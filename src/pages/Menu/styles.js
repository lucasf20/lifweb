import {StyleSheet, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import colorStyles from "../../colors";

const dorange = colorStyles.dorange

export default StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#021740"
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
        fontSize:20,
        paddingLeft:15,
        alignItems: 'center',
        color:"white",
        paddingLeft:10
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttons:{
        flex:1,
        height:75,
        flexDirection: 'row',
        width:Dimensions.get('window').width/2,
        alignItems:'center'
    },
    viewLogout:{
        //backgroundColor:"#021740",
        position:"absolute",
        paddingTop: Dimensions.get('window').height - 100,
        right:0,
        paddingBottom: 50
    },
    logoutButon:{
        height:75,
        width:90,
        padding:5,
        flexDirection: 'row',
        backgroundColor:'red',
        borderRadius:5
    },
    buttonView:{
        borderColor:'transparent',
        borderBottomColor:'white',
        borderWidth:1,
    }   
});