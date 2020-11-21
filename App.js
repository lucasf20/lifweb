import React, {useEffect} from 'react';
import Routes from './src/routes';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './src/contexts/auth';
import OneSignal from 'react-native-onesignal';



console.disableYellowBox = true;
export default function App() {

  useEffect(()=>{
    OneSignal.init('0bd806c4-a6ab-4c9c-a832-994420443ace')
    OneSignal.addEventListener('opened', onOpened)
    return () => OneSignal.removeEventListener('opened', onOpened)
  }, []);
  
  function onOpened(result){
    console.log('Mensagem: ', result.notification.payload.body)
    console.log('Result', result)
  }
  

  return (
    <AuthProvider>
      {/* <StatusBar style="light" translucent /> */}
      <Routes/>
    </AuthProvider>
  );
}
