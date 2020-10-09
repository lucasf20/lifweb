import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import * as FacebookAuthentication from 'expo-facebook'
import * as GoogleAuthentication from 'expo-google-app-auth'
import * as AppleAuthentication from 'expo-apple-authentication'

import styles from './styles'
import TextInput from '../../MyTextInput'
import Button from './Button'
import Firebase from '../../../firebaseConfig'

import Background from '../../assets/loginbackground.jpg'
import Logo from '../../assets/logolifweb.png'
import colors from '../../colors'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const login = async () => {
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password)
      navigation.navigate('Feed')
    } catch (error) {
      alert('O usuário não existe ou a senha está incorreta!')
    }
  }

  const loginWithFacebok = async () => {
    try {
      await FacebookAuthentication.initializeAsync({
        appId: '342347700517241',
      })
      const {type, token, ...params} = await FacebookAuthentication.logInWithReadPermissionsAsync()

      if (type !== 'success') {
        alert('O usuário cancelou')
      } 
      
      const credential = Firebase.auth.FacebookAuthProvider.credential(token)
      await Firebase.auth().signInWithCredential(credential)
    } catch (error) {
      console.log(error)
      alert('Ocorreu um erro')
    }
  }

  const loginWithGoogle = async () => {
    try {
      const {type, accessToken, user} = await GoogleAuthentication.logInAsync({
        clientId: '993866057606-c8ir7l07ri24lbg5di834g28479ovj15.apps.googleusercontent.com'
      })

      if (type !== 'success') {
        alert('O usuário cancelou')
      }

      console.log({type, accessToken, user})
      const credential = Firebase.auth.GoogleAuthProvider.credential(null, accessToken)
      await Firebase.auth().signInWithCredential(credential)
    } catch (error) {
      console.log(error)
      alert('Ocorreu um erro')
    }
  }

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Feed')
      }
    })
  }, [])

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
          <Image source={Logo} />
        </View>
        <View>
          <Text style={{
            ...styles.whiteText,
            ...styles.bold,
          }}>
            Email
          </Text>

          <TextInput placeholder='Informe seu email'
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
            Senha
          </Text>

          <TextInput placeholder='Informe sua senha'
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
            text='Esqueci minha senha'
            style={{
              ...styles.marginBottom,
            }}
            textTransform='none'
            foregroundColor={colors.dorange}
            backgroundColor='transparent'
            onPress={() => navigation.navigate('EsqueciMinhaSenha')} />

          <Button
            icon='facebook'
            text='Entrar com o Facebook'
            foregroundColor='white'
            backgroundColor='#4267B2'
            style={{
              ...styles.marginBottom,
            }}
            onPress={() => loginWithFacebok()} />

          <Button
            icon='google'
            text='Entrar com o Google'
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
            text='Criar uma conta'
            backgroundColor='transparent'
            foregroundColor='white'
            onPress={() => navigation.navigate('CreateAcc')} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Login
