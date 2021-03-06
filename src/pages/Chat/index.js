import * as Localization from 'expo-localization'
import i18n from 'i18n-js';
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderChat from "../../Components/HeaderChat";
import styles from "./styles";
import Mensagem from "../../Components/Mensagem";
import firebase from "../../../firebaseConfig";
import { AuthContext } from "../../contexts/auth";
import Svg, {
  Image as SvgImage,
  Defs,
  ClipPath,
  Polygon,
} from "react-native-svg";
import profileIcon from '../../assets/logolifweb.png'
import { useNavigation, StackActions } from '@react-navigation/native';
import translate from '../../translate';
import Header from "../../Components/Header";

i18n.translations = translate

i18n.locale = Localization.locale;
i18n.fallbacks = true;

function Chat({ route }) {
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [destinatario, setDestinatario] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const { usuario } = useContext(AuthContext);
  const { idUser } = route.params;
  const idConversa =
    idUser > firebase.auth().currentUser.uid
      ? idUser.concat(firebase.auth().currentUser.uid)
      : firebase.auth().currentUser.uid.concat(idUser);
  const [conversaExiste, setConversaExiste] = useState(false);
  const [moto, setmoto] = useState('')

  const nav = useNavigation()

  useEffect(() => {
    async function load() {
      let url = 'https://intense-inlet-17045.herokuapp.com/avatar/'
            let topost = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: idUser,
                })
            }
      var avatar = await fetch(url, topost).then((response) => response.json()).then((json) => { return json.avatar })
      if(avatar){
        setAvatar(avatar)
      }else{
        setAvatar(false)
      }
      // await firebase
      //   .storage()
      //   .ref("user/" + idUser + "/perfil")
      //   .getDownloadURL()
      //   .then((downloadUrl) => {
      //     setAvatar(downloadUrl);
      //     console.log(downloadUrl);
      //   })
      //   .catch((erro) => {
      //     setAvatar(false)
      //   });
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
            "Erro ao obter infora????es do destinat??rio.",
            ToastAndroid.SHORT
          );
        });
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("mensagens")
        .where("idConversa", "==", idConversa)
        //.orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          let aux = [];

          querySnapshot.forEach((documentSnapshot) => {
            if(documentSnapshot.data() ['idDestinatario'] == firebase.auth().currentUser.uid){
              firebase.firestore().collection('mensagens').doc(documentSnapshot.id).update({lida:true})
            }
            aux.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
          });

          aux.sort(function (a, b) {
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            if (a.createdAt > b.createdAt) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });

          setAllMessages(aux);
        })
        .catch((err) => {
          ToastAndroid.show("Erro ao obter mensagens.", ToastAndroid.SHORT);
        });
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("conversas")
        .where("idConversa", "==", idConversa)
        .get()
        .then((querySnapshot) => {
          let aux = [];

          querySnapshot.forEach((documentSnapshot) => {
            aux.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
          });

          setConversaExiste(!!aux.length);
        })
        .catch((err) => {
          ToastAndroid.show("Erro ao obter mensagens.", ToastAndroid.SHORT);
        });
    }

    load();
  }, []);

  function criarOrdem() {
    const date = new Date();

    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let ano = date.getFullYear();
    let hora = date.getHours();
    let minutos = date.getMinutes();
    let segundos = date.getSeconds();
    let milissegundos = date.getMilliseconds();

    if (dia < 10) dia = "0".concat(dia);
    if (mes < 10) mes = "0".concat(mes);
    if (hora < 10) hora = "0".concat(hora);
    if (minutos < 10) minutos = "0".concat(minutos);
    if (segundos < 10) segundos = "0".concat(segundos);
    if (milissegundos < 10) milissegundos = "00".concat(milissegundos);
    if (milissegundos >= 10 && milissegundos < 100)
      milissegundos = "0".concat(milissegundos);

    const ordem = `${ano}/${mes}/${dia} ${hora}:${minutos}:${segundos}:${milissegundos}`;

    return ordem;
  }

  async function criarConversa() {
    const ordem = criarOrdem();

    await firebase
      .firestore()
      .collection("conversas")
      .add({
        idConversa,
        idUser: firebase.auth().currentUser.uid,
        ordem,
        receiverName: destinatario.fullName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(async (value) => {
        await firebase
          .firestore()
          .collection("conversas")
          .add({
            idConversa,
            idUser,
            receiverName: firebase.auth().currentUser.displayName,
            ordem,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then((value) => {
            setConversaExiste(true);
            send();
          })
          .catch((err) => {
            Toast.show("Erro ao criar conversa.", Toast.SHORT);
          });
      })
      .catch((err) => {
        Toast.show("Erro ao criar conversa.", Toast.SHORT);
      });
  }

  async function send() {
    const ordem = criarOrdem();

    await firebase
      .firestore()
      .collection("mensagens")
      .add({
        conteudo: message,
        idRemetente: firebase.auth().currentUser.uid,
        idDestinatario: idUser,
        idConversa,
        ordem,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lida:false
      })
      .then((value) => {
        //Keyboard.dismiss();
        setMessage("");
      })
      .catch((err) => {
        Toast.show("Erro ao postar resposta.", Toast.SHORT);
      });

    await firebase
      .firestore()
      .collection("conversas")
      .where("idConversa", "==", idConversa)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          console.log("documentSnapshot.id");
          firebase
            .firestore()
            .collection("conversas")
            .doc(documentSnapshot.id)
            .update({
              ordem,
            });
        });
      })
      .catch((err) => {
        ToastAndroid.show("Erro ao obter mensagens.", ToastAndroid.SHORT);
      });
  }

  function navigateOwnerProfile() {
    nav.dispatch(StackActions.popToTop());
    nav.navigate('Profile', { uid: idUser });
}

  return (
    <View style={styles.container}>
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
      {/* <Image style={styles.avatar} source={{ uri: avatar }} /> */}
      <TouchableOpacity onPress={() => {navigateOwnerProfile()}} style={{position:'absolute', marginLeft:(Dimensions.get('window').width - 95),}}>
      {(avatar)?(<View style={{  marginTop:120}}>
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
              </View>):(
        <View style={{ marginTop:100}}>
          <Image source={profileIcon} style={{height:89, width:75}}/>
        </View>
      )}</TouchableOpacity>
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.containerMessages}
      keyboardVerticalOffset={30}
    >
        <FlatList
          inverted
          //showsVerticalScrollIndicator={false}
          data={allMessages}
          renderItem={({ item, index }) => <Mensagem msg={item} />}
          keyExtractor={(item) => String(item.id)}
        />
      
      <View style={{...styles.containerInput}}>
        <View style={styles.containerInput2}>
          <TextInput
            placeholder={i18n.t('typehere')}
            multiline
            style={styles.input}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {if(message.length){!conversaExiste ? criarConversa() : send()}}}
          >
            <MaterialCommunityIcons
              name="chat-outline"
              size={25}
              color="#f25c05"
            />
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Chat;
