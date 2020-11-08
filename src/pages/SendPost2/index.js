import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions, View, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colorStyles from "../../colors";
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'
import { EvilIcons } from '@expo/vector-icons';
import MyTextInput from '../../MyTextInput';
import firebase from '../../../firebaseConfig';

export default function SendPost2({navigate, route}) {

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (!result.cancelled) {
            setImagem({uri: result.uri});
        }
    };

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [imagem, setImagem] = useState(route.params.photo)
    const [descricao, setdescricao] = useState("")

    const postar = async () => {
        const response = await fetch(imagem.uri)
        const blob = await response.blob()
        var user = firebase.auth().currentUser
        var postname = Date.now().toString()
        var metadata ={
            owner:user.uid,
            likes:[],
            shares:[],
            descricao:descricao
        }
        await firebase.storage().ref().child("user/" + user.uid + "/posts/" + postname).put(blob)
        await firebase.firestore().collection("posts").doc(postname).set(metadata)
    }

    function height(){
        if(!imagem){
            return (Dimensions.get('window').width - 40)
        }else{
            return (Dimensions.get('window').width - 40)*(3/4)
        }
    }

    return (
        <View>
            <View style={{flexDirection:'row', marginTop:30, justifyContent:'space-between', marginHorizontal:10}}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Text style={styles.text}>
                            Cancelar
                </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate("Feed") }} style={{ flexDirection: 'row' }}>
                    <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                        Recentes
               </Text>
                    <EvilIcons name="chevron-down" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{if(imagem && descricao.length>0){postar().then(navigation.navigate("Feed"))}}}>
                    <Text style={{ ...styles.text, color: dorange, fontWeight: 'bold' }}>
                        Próximo
               </Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{marginHorizontal:20, backgroundColor:'white', height:height(), marginTop:30, borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity style={{backgroundColor:dorange, height:50, borderRadius:5, justifyContent:'center'}} onPress={pickImage}>
                        <Text style={{color:'white', marginHorizontal:20}}>
                            Selecionar Imagem
                        </Text>
                    </TouchableOpacity>
                    {(imagem)?(<Image source={imagem} style={{position:'absolute', height:height(), width:Dimensions.get('window').width-40, borderRadius:5}}/>):(<View/>)}
                </View>
                {(imagem)?(
                <View style={{marginTop:20, marginHorizontal:20}}>
                    <Text style={{ ...styles.text, fontWeight: 'bold', marginBottom:10 }}>
                        Descrição:
                    </Text>
                    <MyTextInput placeholder="Descreva seu post"
                    value={descricao}
                    onChangeText={text => setdescricao(text)}
                     />
                </View>
                ):(<View/>)}
            </ScrollView>
        </View>
    );
}

