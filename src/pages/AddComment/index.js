import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  FlatList,
} from "react-native";
import Header from "../../Components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import firebase from "../../../firebaseConfig";
import { AuthContext } from "../../contexts/auth";
import Comment from "../../Components/Comment";

function AddComment({ route }) {
  const { post, autor } = route.params;
  const [mycomment, setMycomment] = useState("");
  const [comments, setComents] = useState([]);
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("comments")
        .where("idPost", "==", post.id)
        .get()
        .then((querySnapshot) => {
          setComents([]);

          querySnapshot.forEach((documentSnapshot) => {
            setComents((oldArray) => [
              ...oldArray,
              { id: documentSnapshot.id, ...documentSnapshot.data() },
            ]);
          });
        });
    }

    load();
  }, []);

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

        setComents([
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
          renderItem={({ item, index }) => <Comment c={item} />}
          keyExtractor={(item) => String(item.id)}
        />
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
          <TouchableOpacity style={styles.sendButton} onPress={sendComment}>
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
