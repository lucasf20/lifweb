import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../../firebaseConfig";
import Svg, {
  Image as SvgImage,
  Defs,
  ClipPath,
  Polygon,
} from "react-native-svg";

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
        });
    }

    if (!!chaves) load();
  }, []);

  useEffect(() => {
    async function load() {
      await firebase
        .storage()
        .ref("user/" + chaves.id + "/perfil")
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

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Chat", { idUser: chaves.id })}
    >
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
      <Text style={styles.name}>{!!chaves ? nome : user.nome}</Text>
    </TouchableOpacity>
  );
}

export default Usuario;
