import React, {useState}  from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import styles from './styles'
import home from '../../assets/home_icon.png'
import { SimpleLineIcons, EvilIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation,StackActions } from '@react-navigation/native';
import colorStyles from '../../colors'
import firebase from "../../../firebaseConfig";
import {StatusBar} from 'expo-status-bar';


function HeaderSp() {
    const navigation = useNavigation();
    const inChat = false

    function resizeHome() {
        const { width, height } = Image.resolveAssetSource(home)
        return height * 120 / width
    }
    const [msg, setmsg] = useState(0)
    const [gotmsg, setgotmsg] = useState(false)

    const getMsgs = () => {
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
                setgotmsg(true)
                setmsg(cnt)
            }
        }
    ) 
    } 
    
    if(!gotmsg){
        getMsgs()
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => { navigation.dispatch(StackActions.pop(1));navigation.navigate("Menu") }}>
                    <SimpleLineIcons name="menu" size={24} color={inChat ? '#fff' : 'gray'} style={{padding:10}}/>
                </TouchableOpacity>
                <EvilIcons name="search" size={30} color="transparent" style={{ padding:10 }} />
            </View>
            <TouchableOpacity onPress={() => {navigation.dispatch(StackActions.pop(1)); navigation.navigate("Feed") }}>
                <Image source={home} style={{ height: resizeHome(), width: 120, marginTop:5 }}>
                </Image>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
                <EvilIcons name="search" size={30} color={'gray'} style={{ padding:10}} onPress={() =>{navigation.navigate('Filters')}}/>
                <View>
                    <TouchableOpacity onPress={() => { navigation.dispatch(StackActions.pop(1));navigation.navigate('MinhasMensagens') }} style={{padding:10}}>
                        <MaterialCommunityIcons name="message-outline" size={24} color={ 'gray'} />
                        {msg>0 && <FontAwesome name="circle" size={10} color="red" style={{position:"absolute", marginLeft:15}}/>}
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="dark"/>
        </View>
    )
}
export default HeaderSp