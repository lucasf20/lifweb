import * as Localization from 'expo-localization'
import i18n from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import colorStyles from "../../colors";
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'
import { MaterialIcons } from '@expo/vector-icons';
import MyTextInput from '../../MyTextInput';
import firebase from '../../../firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from "../../Components/Header";

import translate from '../../translate';

i18n.translations = translate

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function SendPost2({ navigate, route }) {

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
            aspect: [1, 1],
            quality: 0.2,
            base64: true
        });
        if (!result.cancelled) {
            setImagem({ uri: result.uri });
        }
    };

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [imagem, setImagem] = useState(route.params.photo)
    const [descricao, setdescricao] = useState("")
    const [h, seth] = useState(Dimensions.get('window').width - 40)
    const [w, setw] = useState(Dimensions.get('window').width - 40)
    const [rot, setrot] = useState(0)
    const [showproximo, setshowproximo] = useState(true)

    const postar = async () => {
        const response = await fetch(imagem.uri)
        const blob = await response.blob()
        var user = firebase.auth().currentUser
        var postname = Date.now().toString()
        var upload = await firebase.storage().ref().child("user/" + user.uid + "/posts/" + postname).put(blob)
        var metadata = {
            owner: user.uid,
            likes: [],
            descricao: descricao,
            rotation: manualRotation(),
            comments: [],
            repost: false
        }
        await firebase.firestore().collection("posts").doc(postname).set(metadata)
        await firebase.firestore().collection('user').doc(user.uid).update({ posts: firebase.firestore.FieldValue.arrayUnion(postname) })
    }

    function height() {
        if (!imagem) {
            return { h, w }
        } else {
            Image.getSize(imagem.uri, (width, height) => {
                if (rotate() == "0deg") {
                    seth(height)
                    setw(width)
                } else {
                    seth(width)
                    setw(height)
                }
            }, (error) => {
                console.error(`Couldn't get the image size: ${error.message}`);
            });
            var wt = Dimensions.get('window').width - 40
            var ht = h * (wt) / w
            return { h: ht, w: wt }
        }
    }

    function rotate() {
        var ang = route.params.coord
        if (ang.y < 0.5) {
            if (ang.x > 0) {
                return 270
            } else {
                return 90
            }
        } else {
            return 0
        }
    }

    function manualRotation(){
        var inival = rotate() + ((rot%4) * 90)
        switch(inival){
            case 0:
                return "0deg"
            case 90:
                return "90deg"
            case 180:
                return "180deg"
            case 270:
                return "270deg"
        }
    }

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}>
                <View style={{marginTop:20}}>
                    <Header />
                </View>
            <ScrollView>
                <View style={{ marginHorizontal: 20, backgroundColor: 'white', height: Dimensions.get('window').width - 40, marginTop: 30, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 5, justifyContent: 'center' }} onPress={pickImage}>
                        <Text style={{ color: 'white', marginHorizontal: 20 }}>
                            {i18n.t('selectimage')} 
                        </Text>
                    </TouchableOpacity>
                    {(imagem) ? (<Image source={imagem} style={{ position: 'absolute', height: Dimensions.get('window').width - 40, width: Dimensions.get('window').width - 40, borderRadius: 5, transform: [{ rotate: manualRotation() }] }} />) : (<View />)}
                </View>
                {(imagem) ? (
                    <View style={{ marginTop: 20, marginHorizontal: 20, marginBottom: 20 }}>
                        <MyTextInput placeholder={i18n.t('typehere')} 
                            value={descricao}
                            onChangeText={text => setdescricao(text)}
                        />
                    </View>
                ) : (<View />)}

                {(showproximo) ? (
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', marginHorizontal: 20, alignItems:'center' }}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Text style={styles.text}>
                                    {i18n.t('cancel')} 
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <MaterialIcons name="rotate-right" size={30} color={dorange} onPress={() => {setrot(rot + 1)}}/>
                        <TouchableOpacity onPress={() => {
                            if (imagem) {
                                setshowproximo(false)
                                postar().then(
                                    () => {
                                        //navigation.navigate("Feed")
                                        //navigation.dispatch(StackActions.popToTop())
                                        navigation.navigate("Feed",{reload:true})
                                    }
                                )

                            }
                        }} style={{backgroundColor: dorange, borderRadius:5, height:50, justifyContent:'center' }}>
                            <Text style={{ ...styles.text, color: 'white', fontWeight: 'bold', marginHorizontal:10}}>
                                {i18n.t('share')} 
                        </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <View style={{ justifyContent: 'center', alignItems:'center' }}>
                            <Text style={{fontsize:20, color:colorStyles.dorange}}>
                                {i18n.t('loading')} 
                            </Text>
                        </View>

                    )}

            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

