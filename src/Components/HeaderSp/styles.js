import { StyleSheet } from 'react-native'
import colorStyles from '../../colors'

const styles = StyleSheet.create({
    container:{
        ...Platform.select({
            android:{
                paddingTop:23,
                padding:5,   
                justifyContent:'space-between',
                flexDirection:'row',
                alignItems:'center',  
            },
            ios:{
                marginTop:-5,
                paddingTop:40,
                padding:5,   
                justifyContent:'space-between',
                flexDirection:'row',
                alignItems:'center'

            }
        })
    },
    title:{
        fontSize:18,
        fontWeight:'bold'
    }
})
module.exports = styles