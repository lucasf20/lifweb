import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions, View, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colorStyles from "../../colors";
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'
import { EvilIcons } from '@expo/vector-icons';
import MyTextInput from '../../MyTextInput';
import firebase from '../../../firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    const [h, seth] = useState(Dimensions.get('window').width - 40)
    const [w, setw] = useState(Dimensions.get('window').width - 40)

    const postar = async () => {
        const response = await fetch(imagem.uri)
        const blob = await response.blob()
        var user = firebase.auth().currentUser
        var postname = Date.now().toString()
        var metadata ={
            owner:user.uid,
            likes:[],
            shares:[],
            descricao:descricao,
            rotation:rotate(),
            comments:[]
        }
        await firebase.storage().ref().child("user/" + user.uid + "/posts/" + postname).put(blob)
        await firebase.firestore().collection("posts").doc(postname).set(metadata)
    }

    function height(){
        if(!imagem){
            return {h,w}
        }else{
            Image.getSize(imagem.uri, (width, height) => {
                if(rotate() == "0deg"){
                seth(height)
                setw(width)
                }else{
                seth(width)
                setw(height)
                }
              }, (error) => {
                console.error(`Couldn't get the image size: ${error.message}`);
              });
              var wt = Dimensions.get('window').width - 40
              var ht = h * (wt)/w
            return {h:ht,w:wt}
        }
    }

    function rotate(){
        var ang = route.params.coord 
        if(ang.y < 0.5){
            if(ang.x > 0){
                return '270deg'
            }else{
                return '90deg'
            }
        }else{
            return '0deg'
        }
    }

    return (
        <ScrollView>
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
                <View style={{marginHorizontal:20, backgroundColor:'white', height:height().h, marginTop:30, borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity style={{backgroundColor:dorange, height:50, borderRadius:5, justifyContent:'center'}} onPress={pickImage}>
                        <Text style={{color:'white', marginHorizontal:20}}>
                            Selecionar Imagem
                        </Text>
                    </TouchableOpacity>
                    {(imagem)?(<Image source={imagem} style={{position:'absolute', height:(rotate() == '0deg')?(height().h):(height().w), width:(rotate() == '0deg')?(height().w):(height().h), borderRadius:5, transform: [{ rotate: rotate() }]}}/>):(<View/>)}
                </View>
                {(imagem)?(
                     <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                     style={{ flex: 1 }}
                     showsVerticalScrollIndicator={false}>
                <View style={{marginTop:20, marginHorizontal:20, marginBottom:20}}>
                    <Text style={{ ...styles.text, fontWeight: 'bold', marginBottom:10 }}>
                        Descrição:
                    </Text>
                    <MyTextInput placeholder="Descreva seu post"
                    value={descricao}
                    onChangeText={text => setdescricao(text)}
                     />
                </View>
            </KeyboardAwareScrollView>
                ):(<View/>)}
            </ScrollView>
        </ScrollView>
    );
}

