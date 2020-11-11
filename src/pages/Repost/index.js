import React, { useContext, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Header from "../../Components/Header";
import Postagem from "../../Components/Postagem";
import RepostIcon from "../../assets/repost.png";
import firebase from "../../../firebaseConfig";
import styles from "./styles";
import { AuthContext } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

function Repost({ route }) {
  const { post, autor } = route.params;
  const navigation = useNavigation();
  const [mycomment, setMycomment] = useState(
    `#Repost de ${autor.fullName}\n• ${post.descricao} •`
  );

  async function repostar() {
    let postname = Date.now().toString();

    await firebase
      .firestore()
      .collection("posts")
      .doc(postname)
      .set({
        descricao: mycomment,
        autor: firebase.auth().currentUser.uid,
        repostedFromAutor: autor.id,
        repostedFromAutorNome: autor.fullName,
        repostedFromPost: post.id,
        likes: [],
        comments: [],
        shares: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((response) => {
        ToastAndroid.show("Repostado.", ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch((err) => {
        ToastAndroid.show("Erro na repostagem.", ToastAndroid.SHORT);
      });
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Image source={RepostIcon} style={{ height: 30, width: 30 }}></Image>
        <Text style={styles.headerText}>Repost</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Postagem post={post} repost />
      </View>

      <View style={styles.containerInput}>
        <View style={styles.containerInput2}>
          <TextInput
            placeholder="Digite aqui..."
            multiline
            style={styles.input}
            value={mycomment}
            onChangeText={setMycomment}
          />
          <TouchableOpacity style={styles.sendButton} onPress={repostar}>
            <Image
              source={RepostIcon}
              style={{ height: 30, width: 30 }}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Repost;
