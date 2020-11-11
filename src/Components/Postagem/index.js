import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import styles from "./styles";
import { SimpleLineIcons } from "@expo/vector-icons";
import caveira from "../../assets/caveira.png";
import caveiralike from "../../assets/caveiralike.png";
import Comentario from "../../assets/comentario.png";
import ShareIcon from "../../assets/share.png";
import Repost from "../../assets/repost.png";
import firebase from "../../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
//import Share from 'react-native-share';

function Postagem(props) {
  const { post, repost } = props;
  const [autor, setAutor] = useState({});
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [numComments, setNumComments] = useState(0);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const navigation = useNavigation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function load() {
      await firebase
        .storage()
        .ref()
        .child("user/" + autor.id + "/posts/" + post.id)
        .getDownloadURL()
        .then((downloadUrl) => {
          setUrl(downloadUrl);
        });
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("user")
        .doc(post.owner)
        .get()
        .then((response) => {
          setAutor({ ...response.data(), id: response.id });
          //console.log(response.data(), response.id)
        })
        .catch((err) => {
          //ToastAndroid.show('Erro ao obter usuario', ToastAndroid.SHORT)
        });
    }

    load();
  }, []);

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

  useEffect(() => {
    post?.likes.map((item) => {
      let aux = JSON.parse(item);

      if (aux.id === firebase.auth().currentUser.uid) {
        setLiked(true);
        return;
      }
    });
  }, []);

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("posts")
        .doc(post.id)
        .onSnapshot((documentSnapshot) => {
          setNumberOfLikes(documentSnapshot.data().likes.length);
        });
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("posts")
        .doc(post.id)
        .onSnapshot((documentSnapshot) => {
          setNumberOfLikes(documentSnapshot.data().likes.length);
        });
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("comments")
        .where("idPost", "==", post.id)
        .onSnapshot((querySnapshot) => {
          setNumComments(querySnapshot.size);
        });
    }

    load();
  }, []);

  async function handleLike() {
    let postRef = firebase.firestore().collection("posts").doc(post.id);

    if (!liked) {
      await postRef
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(
            JSON.stringify({
              id: firebase.auth().currentUser.uid,
              fullName: firebase.auth().currentUser.displayName,
            })
          ),
        })
        .then((value) => setLiked(true))
        .catch((err) =>
          ToastAndroid.show("Erro na função like.", ToastAndroid.SHORT)
        );
    } else {
      await postRef
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(
            JSON.stringify({
              id: firebase.auth().currentUser.uid,
              fullName: firebase.auth().currentUser.displayName,
            })
          ),
        })
        .then((value) => setLiked(false))
        .catch((err) =>
          ToastAndroid.show("Erro na função like.", ToastAndroid.SHORT)
        );
    }
  }

  async function handleShare() {
    ToastAndroid.show("Compartilhar", ToastAndroid.SHORT);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.containerFotoeNome}>
          <Image style={styles.avatar} source={{ uri: autor?.avatar }} />
          <Text style={styles.headerNome}>{autor?.fullName}</Text>
        </View>
        <TouchableOpacity>
          <SimpleLineIcons
            name="options"
            size={24}
            color="gray"
            style={{ paddingRight: 15 }}
          />
        </TouchableOpacity>
      </View>
      <Image style={styles.foto} source={{ uri: url }} />
      {!!post.repostedFromAutor && (
        <View style={styles.containerRepost}>
          <Image source={Repost} style={{ height: 30, width: 30 }} />
          <Text style={styles.repostText}>
            Repostado de{" "}
            <Text style={{ fontWeight: "bold" }}>
              {post.repostedFromAutorNome}
            </Text>
          </Text>
        </View>
      )}
      <View style={styles.footer}>
        <View style={styles.containerFotoeNome}>
          <Image style={styles.footeravatar} source={{ uri: autor?.avatar }} />
          <Text style={styles.curtidas}>
            Curtido por {numberOfLikes} pessoas.
          </Text>
        </View>
        <View style={styles.containerIcons}>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            /* onPress={trocaCaveira} */ onPress={handleLike}
          >
            <Image
              source={liked ? caveiralike : caveira}
              style={{ height: 30, width: 30 }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => navigation.navigate("AddComment", { post, autor })}
          >
            <Image
              source={Comentario}
              style={{ height: 30, width: 30 }}
            ></Image>
          </TouchableOpacity>
          {!repost && (
            <TouchableOpacity
              style={{ paddingRight: 10 }}
              onPress={() => navigation.navigate("Repost", { post, autor })}
            >
              <Image source={Repost} style={{ height: 30, width: 30 }}></Image>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={{ paddingRight: 10 }} onPress={handleShare}>
            <Image source={ShareIcon} style={{ height: 30, width: 30 }}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.containerComments}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("AddComment", { post, autor })}
      >
        <Text style={[styles.legenda]}>
          <Text style={{ fontWeight: "bold" }}>{autor?.fullName}</Text>{" "}
          {post.descricao}
        </Text>

        {!repost && (
          <Text style={styles.titleComments}>
            Ver todos {comments.length} comentários
          </Text>
        )}

        {!repost &&
          comments.reverse().map((item, i) => {
            let c = JSON.parse(item);

            if (i < 3) {
              return (
                <Text key={i} style={styles.legenda}>
                  <Text style={{ fontWeight: "bold" }}>{c.fullName}</Text>{" "}
                  {c.comment}
                </Text>
              );
            }
          })}
      </TouchableOpacity>
    </View>
  );
}

export default Postagem;
