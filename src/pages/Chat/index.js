import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid,
  Image,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../Components/Header";
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
      : [].concat(idUser,firebase.auth().currentUser.uid);
  const [conversaExiste, setConversaExiste] = useState(false);

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
          console.log(erro);
          return false;
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
        .firestore()
        .collection("mensagens")
        .where("idConversa", "==", idConversa)
        //.orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          let aux = [];

          querySnapshot.forEach((documentSnapshot) => {
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

  return (
    <View style={styles.container}>
      <Header inChat />
      <View style={styles.containerInfos}>
        <View style={styles.containerDescription}>
          <Text style={styles.nome}>{destinatario.fullName}</Text>
          <Text style={styles.description}>
            UX Design |{" "}
            <Text style={{ fontWeight: "bold" }}>Kawasaki ER-6</Text>
          </Text>
        </View>
      </View>
      {/* <Image style={styles.avatar} source={{ uri: avatar }} /> */}
      <Svg style={styles.avatar} width="75" height="75" viewBox="0 0 50 50">
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
      <View style={styles.containerMessages}>
        <FlatList
          inverted
          //showsVerticalScrollIndicator={false}
          data={allMessages}
          renderItem={({ item, index }) => <Mensagem msg={item} />}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
      <View style={styles.containerInput}>
        <View style={styles.containerInput2}>
          <TextInput
            placeholder="Digite aqui..."
            multiline
            style={styles.input}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={!conversaExiste ? criarConversa : send}
          >
            <MaterialCommunityIcons
              name="chat-outline"
              size={25}
              color="#f25c05"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Chat;
