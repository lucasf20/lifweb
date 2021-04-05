import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../../contexts/auth";
import styles from "./styles";
import firebase from "../../../firebaseConfig";
import profileIcon from '../../assets/logolifweb.png'
import Svg, {
  Image as SvgImage,
  Defs,
  ClipPath,
  Polygon,
} from 'react-native-svg';


function Foto({ uid }) {

  const [avatar, setavatar] = useState(null)

  async function profpic() {
    let url = 'https://intense-inlet-17045.herokuapp.com/avatar/'
    let topost = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: uid,
      })
    }
    var av = await fetch(url, topost).then((response) => response.json()).then((json) => { return json.avatar })
    if (av) {
      setavatar(av)
    } else {
      setavatar(false)
    }
  }

  if (avatar == null) {
    profpic()
    // firebase.storage().ref('user/' + uid + "/perfil").getDownloadURL().then(url => setavatar({uri:url})).catch(erro => setavatar(false))
  }

  return (
    <View style={{ marginLeft: 5 }}>
      {(avatar) ? (
        <Svg style={{
          width: 45,
          height: 45,
          borderRadius: 50,
          marginRight: 8
        }} width="50" height="50" viewBox="0 -3 43 55">
          <Polygon stroke='#F25C05' strokeWidth={5} points="0 10, 22.5 0, 45 10, 45 40, 22.5 50, 0 40" />
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
      ) : (<Image source={profileIcon} style={{ height: 50, width: 43, marginRight: 13 }} />)}
    </View>
  )
}

function Mensagem(props) {
  const { usuario } = useContext(AuthContext);
  const { msg } = props;
  const [selected, setSelected] = useState(msg?.createdAt);
  const isAutor = firebase.auth().currentUser.uid === msg.idRemetente;

  function toDateTime(secs) {
    let t = new Date(Date.UTC(1970, 0, 1)); // Epoch
    t.setUTCSeconds(secs);

    let dia = t.getDate();
    let mes = t.getMonth() + 1;
    let ano = t.getFullYear();
    let hora = t.getHours();
    let minutos = t.getMinutes();

    if (dia < 10) dia = "0".concat(dia);
    if (mes < 10) mes = "0".concat(mes);
    if (hora < 10) hora = "0".concat(hora);
    if (minutos < 10) minutos = "0".concat(minutos);

    const data = `${dia}/${mes}/${ano} às ${hora}:${minutos}`;

    return data;
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Foto uid={msg.idRemetente} />
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={() => setSelected(!selected)}
      >
        <View w
          style={[
            styles.balao,
            isAutor
              ? { borderBottomEndRadius: 0, backgroundColor: "#021740" }
              : { borderBottomStartRadius: 0 },
          ]}
        >
          <Text style={[styles.mensagem, { color: isAutor ? "#fff" : "#222" }]}>
            {msg.conteudo} <Text></Text>
          </Text>
        </View>
        {selected && (
          <Text style={[styles.time, isAutor && { alignSelf: "flex-end" }]}>
            {toDateTime(msg.createdAt.seconds).toString()}
            <Text></Text>
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default Mensagem;
