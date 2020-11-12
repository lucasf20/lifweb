import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import firebase from "../../../firebaseConfig";
import Postagem from "../Postagem";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    async function load() {
      await firebase
        .firestore()
        .collection("posts")
        .get()
        .then((querySnapshot) => {
          setPosts([]);

          querySnapshot.forEach((documentSnapshot) => {
            setPosts((oldArray) => [
              ...oldArray,
              { id: documentSnapshot.id, ...documentSnapshot.data() },
            ]);
          });
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
        .onSnapshot((documentSnapshot) => {
          setFollowing(documentSnapshot.data().following);
        });
    }

    load();
  }, []);

  return (
    <View style={{ height: "auto", flex: 1 }}>
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        data={posts}
        renderItem={({ item, index }) => <Postagem post={item} />}
        keyExtractor={(item) => String(item.id)}
      /> */}
    </View>
  );
}
export default PostsList;
