import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";
import firebase from "../../../firebaseConfig";

function Comment(props) {
  const { c } = props;
  const [autor, setAutor] = useState({});

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("user")
        .doc(c.id)
        .get()
        .then((response) => {
          setAutor({ ...response.data(), id: response.id });
        })
        .catch((err) => {
          //ToastAndroid.show('Erro ao obter usuario', ToastAndroid.SHORT)
        });
    }

    load();
  }, []);

  return (
    <View style={styles.containerLegenda}>
      <Image style={styles.avatar} source={{ uri: autor?.avatar }} />
      <Text style={[styles.comentario]}>
        <Text style={{ fontWeight: "bold" }}>{c.fullName}</Text> {c.comment}
      </Text>
    </View>
  );
}

export default Comment;
