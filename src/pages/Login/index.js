import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  ToastAndroid,
  Alert,
  Platform
} from 'react-native'
import * as Localization from 'expo-localization'
import { useNavigation } from '@react-navigation/native'
import * as FacebookAuthentication from 'expo-facebook'
import * as GoogleAuthentication from 'expo-google-app-auth'
import * as AppleAuthentication from 'expo-apple-authentication'
import * as GoogleSignIn from 'expo-google-sign-in';
import styles from './styles'
import TextInput from '../../MyTextInput'
import Button from './Button'
import Firebase from '../../../firebaseConfig'

import Background from '../../assets/loginbackground.jpg'
import Logo from '../../assets/logolifweb.png'
import colors from '../../colors'

import i18n from 'i18n-js';
import { AuthContext } from '../../contexts/auth'

import translate from '../../translate'

i18n.translations = translate

i18n.locale = Localization.locale;
i18n.fallbacks = true;


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setchecked] = useState(false)
  const [logado, setlogado] = useState(false)
  const navigation = useNavigation();
  const { entrar } = useContext(AuthContext);

  const login = async () => {
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password)
      navigation.navigate('Feed',{reload:true})
    } catch (error) {
      alert(i18n.t('passalert'))
    }
  }

  const atualizaPerfil = async (image) => {
    const response = await fetch(image)
    const blob = await response.blob()
    var user = Firebase.auth().currentUser
    var uploadTask = await Firebase.storage().ref().child("user/" + user.uid + "/perfil").put(blob)
}
  

  const loginWithFacebok = async () => {
    var alert = true
    try {
      await FacebookAuthentication.initializeAsync({
        appId: '342347700517241',
      })
      const { type, token, ...params } = await FacebookAuthentication.logInWithReadPermissionsAsync()
      const auth = await FacebookAuthentication.getAuthenticationCredentialAsync()
      let graphapi = "https://graph.facebook.com/" + auth.userId + "/picture?width=500&height=500"
      //console.log(graphapi)
      //let profilePic = await fetch(graphapi).then((response) => response.json()).then((json) => {return json.url})
      if (type !== 'success') {
        alert(i18n.t('cancelalert'))
      }

      const credential = Firebase.auth.FacebookAuthProvider.credential(token)
      await Firebase.auth().signInWithCredential(credential)
      var us = Firebase.auth().currentUser
      us.updateProfile({photoURL:graphapi})
      alert = false
      var firstAccess = await Firebase.firestore().collection('user').doc(us.uid).get().then(data => { return !data.exists })
      if (firstAccess) {
        var data = {
          apelido: us.displayName,
          firstAccess: true,
          fullName: us.displayName,
          modeloDaMoto: {
            moto: ""
          },
          nascimento: "",
          profissao: ""
        }
        Firebase.firestore().collection('user').doc(us.uid).set(data)
      }else{
        try{
          await Firebase.storage().refFromURL("gs://lifweb-38828.appspot.com/user/" + us.uid + "/perfil").getDownloadURL()
        }catch{
          await atualizaPerfil(us.photoURL)
        }
      }
      Firebase.database().ref('user/' + us.uid).set(data)
    } catch (error) {
      //console.log(error)
      if (alert)
      Alert.alert(
        "Error!",
        i18n.t('erroralert'),
        [
            {
                text: i18n.t('cancel'),
            },
            // {
            //     text: i18n.t('sharetext'),
            //     onPress: () => onShare(),
            //     style: 'cancel'
            // }
        ],
        { cancelable: true }
    );
    }
  }

  const loginWithGoogle = async () => {
    try {
      await GoogleSignIn.initAsync({
        // You may ommit the clientId when the firebase `googleServicesFile` is configured
        clientId: '807737285816-4ugt2l8o77pq130bvn814u7afrd3sc9g.apps.googleusercontent.com',
      });
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      var accessToken = null
      if(user){
         accessToken = user.auth.accessToken
      } else {
         accessToken = null
      }
     

      
      //const user = await GoogleSignIn.signInSilentlyAsync();
      if (type !== 'success') {
        alert(i18n.t('cancelalert'))
      }
      const credential = Firebase.auth.GoogleAuthProvider.credential(null, accessToken)

      await Firebase.auth().signInWithCredential(credential).then((value) => {
        const u = value.user;

        Firebase.firestore().collection('usuarios').doc(u.uid).set({
          email: u.email,
          nome: u.displayName,
          avatar: u.photoURL,
        })
          .then((value) => {
            entrar(u.uid, u.displayName, u.email, u.photoURL);

            ToastAndroid.show("Login efetuado.", ToastAndroid.SHORT);
          })
          .catch(err => {
            ToastAndroid.show("Ocorreu um erro", ToastAndroid.SHORT);
          })
      })
      var us = Firebase.auth().currentUser
      var firstAccess = await Firebase.firestore().collection('user').doc(us.uid).get().then(data => { return !data.exists })
      if (firstAccess) {
        var data = {
          apelido: us.displayName,
          firstAccess: true,
          fullName: us.displayName,
          modeloDaMoto: {
            moto: ""
          },
          nascimento: "",
          profissao: ""
        }
        Firebase.firestore().collection('user').doc(us.uid).set(data)
      }
      Firebase.database().ref('user/' + us.uid).set(data)
    } catch (error) {
      console.log(error)
    }
  }

  /*const loginWithGoogle = async () => {
    try {
      const { type, accessToken, user } = await GoogleAuthentication.logInAsync({
        clientId: '993866057606-c8ir7l07ri24lbg5di834g28479ovj15.apps.googleusercontent.com'
      })

      if (type !== 'success') {
        alert(i18n.t('cancelalert'))
      }

      console.log({ type, accessToken, user })

      const credential = Firebase.auth.GoogleAuthProvider.credential(null, accessToken)

      await Firebase.auth().signInWithCredential(credential).then((value) => {
        const u = value.user;

        Firebase.firestore().collection('usuarios').doc(u.uid).set({
          email: u.email,
          nome: u.displayName,
          avatar: u.photoURL,
        })
          .then((value) => {
            entrar(u.uid, u.displayName, u.email, u.photoURL);

            ToastAndroid.show("Login efetuado.", ToastAndroid.SHORT);
          })
          .catch(err => {
            ToastAndroid.show("Ocorreu um erro", ToastAndroid.SHORT);
          })
      })
      var us = Firebase.auth().currentUser
      var firstAccess = await Firebase.firestore().collection('user').doc(us.uid).get().then(data => { return !data.exists })
      if (firstAccess) {
        var data = {
          apelido: us.displayName,
          firstAccess: true,
          fullName: us.displayName,
          modeloDaMoto: {
            moto: ""
          },
          nascimento: "",
          profissao: ""
        }
        Firebase.firestore().collection('user').doc(us.uid).set(data)
      }
      Firebase.database().ref('user/' + us.uid).set(data)
    } catch (error) {
      console.log(error)
    }
  }*/

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setlogado(true)
        navigation.navigate('Feed')
      }
      setchecked(true)
    })
  }, [])

  // if (!checked) {
  //   Firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       setlogado(true)
  //       navigation.navigate('Feed')
  //     }
  //     setchecked(true)
  //   })
  // }

  if (checked) {
    return (
      <ImageBackground
        source={Background}
        style={{
          ...styles.flexGrow,
        }}>

        <SafeAreaView style={{
          ...styles.flexGrow,
          ...styles.justifyContentCenter,
          ...styles.marginHorizontal,
        }}>
          <View style={{
            ...styles.alignItemsCenter,
          }}>
            <Image source={Logo} style={{ height: Image.resolveAssetSource(Logo).height * 0.8, width: Image.resolveAssetSource(Logo).width * 0.8, marginTop: 10 }} />
          </View>
          <View>
            <Text style={{
              ...styles.whiteText,
              ...styles.bold,
            }}>
              Email
          </Text>

            <TextInput placeholder={i18n.t('emailfield')}
              value={email}
              autoCapitalize='none'
              type='email-address'
              style={{
                ...styles.marginBottom,
              }}
              onChangeText={value => setEmail(value)} />

            <Text style={{
              ...styles.whiteText,
              ...styles.bold,
            }}>
              {i18n.t('passw')}
            </Text>

            <TextInput placeholder={i18n.t('passfield')}
              value={password}
              autoCapitalize='none'
              type='default'
              style={{
                ...styles.marginBottom,
              }}
              onChangeText={value => setPassword(value)}
              secureTextEntry={true} />

            <Button
              text='Login'
              style={{
                ...styles.marginBottom,
              }}
              foregroundColor='white'
              backgroundColor={colors.dorange}
              onPress={() => login()} />

            <Button
              text={i18n.t('recopass')}
              style={{
                ...styles.marginBottom,
              }}
              textTransform='none'
              foregroundColor={colors.dorange}
              backgroundColor='transparent'
              onPress={() => navigation.navigate('EsqueciMinhaSenha')} />

            <Button
              icon='facebook'
              text={i18n.t('fblogin')}
              foregroundColor='white'
              backgroundColor='#4267B2'
              style={{
                ...styles.marginBottom,
              }}
              onPress={() => loginWithFacebok()} />

            <Button
              icon='google'
              text={i18n.t('glogin')}
              foregroundColor='white'
              backgroundColor='#DB4437'
              style={{
                ...styles.marginBottom,
              }}
              onPress={() => loginWithGoogle()} />

            <AppleAuthentication.AppleAuthenticationButton
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              style={{
                height: 50,
              }} />

            <Button
              text={i18n.t('createacc')}
              backgroundColor='transparent'
              foregroundColor='white'
              onPress={() => navigation.navigate('CreateAcc')} />
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  } else {
    return (
      <ImageBackground
        source={Background}
        style={{
          ...styles.flexGrow,
        }}></ImageBackground>
    )
  }

}

export default Login
