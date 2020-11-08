import React, { createContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState({
    id: '9aP62yNuHGTTfYz1MV6fmq86noq2',
    nome: 'Marco Antônio',
    email: 'marcoant008@gmail.com',
    avatar: 'https://lh3.googleusercontent.com/a-/AOh14GhXJ_M9EWenPg0YX-U5DPwgSWHn_jA4DDaGpERGOFU=s96-c',
  });

  useEffect(() => {
    console.log(usuario)

    async function load() {
      await AsyncStorage.getItem("@lifweb:usuario").then((resp) => {
          //setUsuario(JSON.parse(resp));
        })
        .catch((err) => {
          ToastAndroid.show("erro asyncstorage", ToastAndroid.SHORT);
        });
    }

    load();
  }, []);

  async function entrar (id, nome, email, avatar) {
    console.log(id, nome, email, avatar);

    await AsyncStorage.setItem("@lifweb:usuario", JSON.stringify({ id, nome, email, avatar }));
    //setUsuario({ id, nome, email, avatar })
  }

  async function sair() {
    await firebase.auth().signOut();
    await AsyncStorage.removeItem("@icheff:usuario");
    //setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
