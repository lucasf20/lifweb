import React from 'react';
import Routes from './src/routes';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './src/contexts/auth';

console.disableYellowBox = true;
export default function App() {
  return (
    <AuthProvider>
      {/* <StatusBar style="light" translucent /> */}
      <Routes/>
    </AuthProvider>
  );
}
