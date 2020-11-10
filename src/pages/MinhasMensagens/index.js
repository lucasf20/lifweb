import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import Conversa from "../../Components/Conversa";
import Header from "../../Components/Header";
import styles from "./styles";
import firebase from "../../../firebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/auth";
//import { useNavigation } from '@react-navigation/native';
import Usuario from "../../Components/Usuario";

function MinhasMensagens() {
  const [conversas, setConversas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [encontrados, setEncontrados] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const { usuario } = useContext(AuthContext);
  const [following, setFollowing] = useState([]);
  //const navigation = useNavigation();

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("conversas")
        .where("idUser", "==", firebase.auth().currentUser.uid)
        //.orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          let aux = [];

          querySnapshot.forEach((documentSnapshot) => {
            aux.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
          });

          aux.sort(function (a, b) {
            if (a.ordem < b.ordem) {
              return 1;
            }
            if (a.ordem > b.ordem) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });

          console.log(aux);
          setConversas(aux);
        })
        .catch((err) => {
          ToastAndroid.show("Erro ao carregar respostas.", ToastAndroid.SHORT);
        });
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("user")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((documentSnapshot) => {
          setFollowing(documentSnapshot.data().following);
        });
    }

    load();
  }, []);

  function buscar(text) {
    setPesquisa(text);
    if (!!text)
      setEncontrados(
        following.filter((item) =>
          JSON.parse(item)?.fullName.toLowerCase().includes(text.toLowerCase())
        )
      );
    //console.log(usuarios.length, encontrados.length)
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerBuscador}>
        <MaterialCommunityIcons name="magnify" size={30} color="#979797" />

        <TextInput
          placeholder="Buscar"
          style={styles.input}
          value={pesquisa}
          onChangeText={(text) => buscar(text)}
        />

        {!!pesquisa && (
          <TouchableOpacity onPress={() => setPesquisa("")}>
            <MaterialCommunityIcons name="close" size={30} color="#979797" />
          </TouchableOpacity>
        )}
      </View>
      {!!pesquisa ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={encontrados}
          renderItem={({ item, index }) => (
            <Usuario chaves={JSON.parse(item)} />
          )}
          keyExtractor={(item) => String(item)}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={conversas}
          renderItem={({ item, index }) => <Conversa conv={item} />}
          keyExtractor={(item) => String(item.id)}
        />
      )}
    </View>
  );
}

export default MinhasMensagens;
