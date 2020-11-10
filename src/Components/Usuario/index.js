import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../../firebaseConfig";

function Usuario(props) {
  const { user, chaves } = props;
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("user")
        .doc(chaves.id)
        .get()
        .then((response) => {
          setNome(response.data().fullName);
          setAvatar(response.data().avatar);
        });
    }

    if (!!chaves) load();
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Chat", { idUser: chaves.id })}
    >
      <Image
        style={styles.avatar}
        source={{ uri: !!chaves ? avatar : user.avatar }}
      />
      <Text style={styles.name}>{!!chaves ? nome : user.nome}</Text>
    </TouchableOpacity>
  );
}

export default Usuario;
