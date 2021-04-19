import React, {useEffect} from 'react';
import Routes from './src/routes';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './src/contexts/auth';
import OneSignal from 'react-native-onesignal';


//ca8cad04-0810-49fe-a7af-2383555bcb3b
console.disableYellowBox = true;
export default function App() {

  useEffect(()=>{
    OneSignal.init('ca8cad04-0810-49fe-a7af-2383555bcb3b')
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

