import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Svg, {
  Image as SvgImage,
  Defs,
  ClipPath,
  Polygon,
} from 'react-native-svg';
import profileIcon from '../../../assets/logolifweb.png'
import firebase from '../../../../firebaseConfig';
import { useNavigation, StackActions } from '@react-navigation/native';

import { styles } from './styles';

const Item = ({ post }) => {
  const [image, setimage] = useState(null)
  const [name, setname] = useState(null)
  const [perfil, setperfil] = useState(null)
  const [load, setload] = useState(true)

  const nav = useNavigation()
  function navigateOwnerProfile() {
    nav.dispatch(StackActions.popToTop());
    nav.navigate('Profile', { uid: post['owner'] });
  }

  if (load) {
    getImgs()
  }
  async function getImgs() {
    await firebase.firestore().collection('user').doc(post['owner']).get().then(data => setname(data.data()['apelido']))
    await firebase.storage().ref('user/' + post['owner'] + "/perfil").getDownloadURL().then(url => setperfil({ uri: url })).catch(erro => setperfil(null))
    await firebase.storage().ref('user/' + post['owner'] + "/posts/" + post['postname']).getDownloadURL().then(url => setimage({ uri: url })).catch(erro => setimage(null))
    setload(false)
  }

  function getTime(postname) {
    var now = Date.now()
    var posttime = Math.floor(postname)
    var minutes = (now - posttime) / 60000
    if (minutes < 60) {
      return "Há " + Math.round(minutes) + " minutos"
    } else if ((minutes / 60) < 24) {
      return "Há " + Math.round(minutes / 60) + " horas"
    } else {
      return "Há " + Math.round((minutes / 60) / 24) + " dias"
    }
  }

  function size(scale) {
    const { width, height } = Image.resolveAssetSource(profileIcon)
    return { width: scale * width, height: scale * height, }
  }


  if (image && name) {
    return (
      <TouchableOpacity style={styles.container} onPress={() => {navigateOwnerProfile()}}>
        <Image source={image} style={{ ...styles.container }} />
        <View style={{ position: "absolute", marginTop: 10, marginLeft: 15, width: 100 }}>
          {(perfil) ?
            (
              <Svg width="50" height="50" viewBox="0 -3 43 55">
                <Polygon stroke='#FFFFFF' strokeWidth={5} points="0 10, 22.5 0, 45 10, 45 40, 22.5 50, 0 40" />
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
                  href={image}
                  clipPath="#image"
                />
              </Svg>
            ) : (
              <Image source={profileIcon} style={{ height: size(0.35).height, width: size(0.35).width }} />
            )}
        </View>
        <View style={{ position: "absolute", marginTop: 130, marginLeft: 15, width: 100 }}>
          <Text style={{ fontWeight: 'bold', color: "white" }}>
            {name}
          </Text>
          <Text style={{ color: "white" }}>
            {getTime(post['postname'])}
          </Text>
        </View>

      </TouchableOpacity>
    );
  } else {
    return (
      <View />
    )
  }

};

export default Item;
