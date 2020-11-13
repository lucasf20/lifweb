import React, { createContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    console.log(usuario);

    async function load() {
      await AsyncStorage.getItem("@lifweb:usuario")
        .then((resp) => {
          setUsuario(JSON.parse(resp));
        })
        .catch((err) => {
          ToastAndroid.show("erro asyncstorage", ToastAndroid.SHORT);
        });
    }

    load();
  }, []);

  async function entrar(id, fullName) {
    console.log(id, fullName);

    await AsyncStorage.setItem(
      "@lifweb:usuario",
      JSON.stringify({ id, fullName })
    );
    setUsuario({ id, nome, email, avatar });
  }

  async function sair() {
    await firebase.auth().signOut();
    await AsyncStorage.removeItem("@icheff:usuario");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
