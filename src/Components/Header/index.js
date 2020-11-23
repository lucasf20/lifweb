import React, {useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import styles from './styles'
import home from '../../assets/home_icon.png'
import { SimpleLineIcons, EvilIcons, MaterialCommunityIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation,StackActions } from '@react-navigation/native';
import firebase from "../../../firebaseConfig";


function Header() {
    const navigation = useNavigation();
    const inChat = false

    

    function resizeHome() {
        const { width, height } = Image.resolveAssetSource(home)
        return height * 120 / width
    }
    const [msg, setmsg] = useState(0)
    setTimeout(() => {
        firebase.firestore().collection('mensagens').where('idDestinatario', "==", firebase.auth().currentUser.uid).get().then(
        data => {
            if(!data.empty){
                var cnt = 0
                data.forEach(
                    item => {
                        
                        if(!item.data()['lida']){
                            cnt++
                        }
                    }
                )
                console.log("cnt",cnt)
                setmsg(cnt)
            }
        }
    ) 
    }, 15000); 

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => { navigation.dispatch(StackActions.pop(1));navigation.navigate('Feed') }}>
                    <Entypo name="chevron-left" size={24} color="gray" />
                </TouchableOpacity>
                <EvilIcons name="search" size={30} color="transparent" style={{ paddingRight: 15 }} />
            </View>
             <TouchableOpacity onPress={() => { navigation.dispatch(StackActions.pop(1)); navigation.navigate("Feed") }}>
                <Image source={home} style={{ height: resizeHome(), width: 120, marginTop:5 }}>
                </Image>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
                <EvilIcons name="search" size={30} color={ 'gray'} style={{ paddingRight: 15 }} onPress={() =>{navigation.navigate('Filters')}}/>
                <View>
                    <TouchableOpacity onPress={() => {navigation.dispatch(StackActions.pop(1)); navigation.navigate('MinhasMensagens') }}>
                        <MaterialCommunityIcons name="message-outline" size={24} color={ 'gray'} />
                        {msg>0 && <FontAwesome name="circle" size={10} color="red" style={{position:"absolute", marginLeft:15}}/>}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default Header