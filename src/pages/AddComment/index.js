import * as Localization from 'expo-localization'
import i18n from 'i18n-js';
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  FlatList,
  Keyboard,
} from "react-native";
import Header from "../../Components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import firebase from "../../../firebaseConfig";
import { AuthContext } from "../../contexts/auth";
import Comment from "../../Components/Comment";

import translate from '../../translate';

i18n.translations = translate

i18n.locale = Localization.locale;
i18n.fallbacks = true;


function AddComment({ route }) {
  const { post, autor } = route.params;
  const [mycomment, setMycomment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("posts")
        .doc(post.id)
        .onSnapshot((documentSnapshot) => {
          setComments(documentSnapshot.data().comments);
        });
    }

    load();
  }, []);
  /* 
  async function sendComment() {
    if (!mycomment) {
      ToastAndroid.show("Digite alguma coisa.", ToastAndroid.SHORT);
      return;
    }

    await firebase
      .firestore()
      .collection("comments")
      .add({
        comment: mycomment,
        idPost: post.id,
        idAutor: usuario.id,
        nomeAutor: usuario.nome,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((value) => {
        ToastAndroid.show("Comentário enviado.", ToastAndroid.SHORT);

        setComments([
          ...comments,
          {
            id: value.id,
            comment: mycomment,
            nomeAutor: usuario.nome,
            idPost: post.id,
            idAutor: usuario.id,
          },
        ]);

        setMycomment("");
      })
      .catch((err) => {
        ToastAndroid.show("Erro ao postar comentário.", ToastAndroid.SHORT);
      });
  }
 */

  async function handleComment() {
    let postRef = firebase.firestore().collection("posts").doc(post.id);

    await postRef
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(
          JSON.stringify({
            id: firebase.auth().currentUser.uid,
            fullName: firebase.auth().currentUser.displayName,
            comment: mycomment,
          })
        ),
      })
      .then((value) => {
        ToastAndroid.show(i18n.t('composted'), ToastAndroid.SHORT);
        Keyboard.dismiss();
        setMycomment("");
      })
      .catch((err) =>
        ToastAndroid.show(i18n.t('comerror'), ToastAndroid.SHORT)
      );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerLegenda}>
        <Image style={styles.avatar} source={{ uri: autor.avatar }} />
        <Text style={styles.comentario}>
          <Text style={{ fontWeight: "bold" }}>{autor.fullName}</Text>{" "}
          {post.descricao}
        </Text>
      </View>
      <View style={styles.containerComments}>
        <FlatList
          //inverted
          //showsVerticalScrollIndicator={false}
          data={comments}
          renderItem={({ item, index }) => <Comment c={JSON.parse(item)} />}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
      <View style={styles.containerInput}>
        <View style={styles.containerInput2}>
          <TextInput
            placeholder={i18n.t('typehere')} 
            multiline
            style={styles.input}
            value={mycomment}
            onChangeText={setMycomment}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleComment}>
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

export default AddComment;
