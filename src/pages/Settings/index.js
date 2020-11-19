import * as Localization from 'expo-localization'
import i18n from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions, View, Text, Image, TouchableOpacity, Alert, Linking, FlatList, TouchableHighlight } from 'react-native';
import firebase from '../../../firebaseConfig';
import { Entypo } from '@expo/vector-icons';
import colorStyle from "../../colors"
import logo from '../../assets/logolifweb.png'
import { useNavigation, StackActions } from '@react-navigation/native';
import styles from './styles';
import HeaderChat from "../../Components/HeaderChat";
import profileIcon from '../../assets/logolifweb.png';
import br from '../../assets/brasil.png';
import us from '../../assets/usa.png';
import es from '../../assets/esp.png'
import Svg, {
    Image as SvgImage,
    Defs,
    ClipPath,
    Polygon,
  } from "react-native-svg";

import translate from '../../translate';

i18n.translations = translate

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function Settings() {
    const nav = useNavigation()
    const [destinatario, setDestinatario] = useState({});
    const [moto, setmoto] = useState('')
    const [idioma, setidioma] = useState('PORTUGUÊS (BRA)')
    const [flag, setflag] = useState(0)
    const [showlist, setshowlist] = useState(false);
    const [avatar, setAvatar] = useState("");
    const idUser = firebase.auth().currentUser.uid

    useEffect(() => {
        async function load() {
          await firebase
            .firestore()
            .collection("user")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
              setmoto(snapshot.data()['modeloDaMoto'])
              setDestinatario(snapshot.data());
            })
            .catch((err) => {
              ToastAndroid.show(
                "Erro ao obter inforações do destinatário.",
                ToastAndroid.SHORT
              );
            });
        }
    
        load();
      }, []);

      useEffect(() => {
        async function load() {
          await firebase
            .storage()
            .ref("user/" + idUser + "/perfil")
            .getDownloadURL()
            .then((downloadUrl) => {
              setAvatar(downloadUrl);
              console.log(downloadUrl);
            })
            .catch((erro) => {
              setAvatar(false)
            });
        }
    
        load();
      });

      useEffect(() => {
        async function load() {
          await firebase
            .firestore()
            .collection("user")
            .doc(idUser)
            .get()
            .then((snapshot) => {
              setmoto(snapshot.data()['modeloDaMoto'])
              setDestinatario(snapshot.data());
            })
            .catch((err) => {
              ToastAndroid.show(
                "Erro ao obter inforações do destinatário.",
                ToastAndroid.SHORT
              );
            });
        }
    
        load();
      }, []);

    async function excluir() {
        var user = firebase.auth().currentUser
        await user.delete()
        await firebase.storage().ref("user/" + user.uid).delete().catch(console.log("firestore"))
        await firebase.firestore().collection("user/").doc(user.uid).delete().catch(console.log("eror"))
        await firebase.database().ref("user/" + user.uid).remove().catch(console.log("eror"))
    }

    function showFlag(){
        switch(flag){
            case 0:
                return br
            case 1: 
                return us
            case 2:
                return es
        }
    }

    function navigateOwnerProfile() {
        nav.dispatch(StackActions.popToTop());
        nav.navigate('Profile', { uid: idUser });
    }

    return (
        <View>
            <HeaderChat />
            <View style={styles.containerInfos}>
                <View style={styles.containerDescription}>
                    <Text style={styles.nome}>{destinatario.apelido}</Text>
                    <Text style={styles.description}>
                        {destinatario.profissao} |{" "}
                        <Text style={{ fontWeight: "bold" }}>{moto['moto']}</Text>
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => { navigateOwnerProfile() }} style={{ position: 'absolute', marginLeft: (Dimensions.get('window').width - 95), }}>
                {(avatar) ? (<View style={{ marginTop: 120 }}>
                    <Svg width="75" height="75" viewBox="0 -3 43 55">
                        <Polygon stroke='#FFFFFF' strokeWidth={5} points="0 10, 22.5 0, 45 10, 45 40, 22.5 50, 0 40" />
                        <Defs>
                            <ClipPath id="image" clipRule="evenodd">
                                <Polygon points="0 10, 22.5 0, 45 10, 45 40, 22.5 50, 0 40" />
                            </ClipPath>
                        </Defs>
                        <SvgImage
                            x="0"
                            y="0"
                            width="50"
                            height="50"
                            href={avatar}
                            clipPath="#image"
                        />
                    </Svg>
                </View>) : (
                        <View style={{ marginTop: 100 }}>
                            <Image source={profileIcon} style={{ height: 89, width: 75 }} />
                        </View>
                    )}</TouchableOpacity>
            <ScrollView>
                <View style={{paddingBottom:200}}>
            <View style={{marginHorizontal:20, marginTop:20}}>
                <Text style={{fontWeight:'bold', fontSize:15}}>
                {i18n.t('language')}
                </Text>
                <TouchableOpacity style={{width:'100%', height:50, borderRadius:5, borderColor:'silver', borderWidth:1 , justifyContent:'space-between', alignItems:'center', flexDirection:'row'}} onPress={() => {(showlist)?setshowlist(false):setshowlist(true)}}>
                    <View style={{flexDirection:'row', alignItems:'center', marginLeft:15}}>
                        <Image source={showFlag()} style={{width:40, height:40}} />
                        <Text style={{color:'black', marginLeft:10}}>
                            {idioma}
                        </Text>
                    </View>
                    <Entypo name="chevron-down" size={24} color="gray" style={{marginRight:15}}/>
                </TouchableOpacity>
                <FlatList
                data={(showlist) ? ['PORTUGUÊS (BRA)', 'INGLÊS (USA)', 'ESPANHOL (ESP)'] : []}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        key={index}
                        onPress={() => { setidioma(item); setshowlist(false); setflag(index) }}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View style={{ backgroundColor: 'white', borderRadius: 5, height: 50, borderWidth: 0.5, borderColor: 'silver', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, color: 'black', marginLeft: 11 }}>{item}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
                <Text style={{marginTop:(showlist)?20:170, color:'gray', fontSize:12}}>
                    *{i18n.t('readphrase')}
                </Text>
                <TouchableOpacity style={{width:'100%', height:50, borderRadius:5, backgroundColor:colorStyle.dorange, justifyContent:'center', alignItems:'center'}} onPress={
                    () => {
                        Alert.alert(
                            i18n.t('deleteacc')+'?',
                            i18n.t('deleteaccquest'),
                            [
                                {
                                    text: i18n.t('delete') ,
                                    onPress: () => excluir()
                                },
                                {
                                    text: i18n.t('cancel'),
                                    onPress: () => console.log("Cancelou"),
                                    style: 'cancel'
                                }
                            ],
                            { cancelable: true }
                        );
                    }}>
                    <Text style={{color:'white', fontSize:16}}>
                        {i18n.t('deleteacc')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'100%', height:50, borderRadius:5, backgroundColor:"#1B2036", justifyContent:'center', alignItems:'center', marginTop:20}} onPress={() => { Linking.openURL('https://lifweb.com.br/contato/') }}>
                    <Text style={{color:'white', fontSize:16}}>
                        {i18n.t('contactus')}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center', marginTop:40}}>
                <Image source={logo} style={{height:89, width:76}}/>
                <Text style={{backgroundColor:'silver', borderRadius:15, paddingHorizontal:40, paddingVertical:5, color:'gray', marginTop:5, overflow:'hidden'}}>
                    v1.0.0
                </Text>
            </View>
            </View>
            </ScrollView>
        </View>
    )
}