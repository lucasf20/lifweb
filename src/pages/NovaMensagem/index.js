import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import styles from './styles';
import Firebase from '../../../firebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Usuario from '../../Components/Usuario';
import { AuthContext } from '../../contexts/auth';
import Header from '../../Components/Header';

function NovaMensagem () {
    const [nome, setNome] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const { usuario } = useContext(AuthContext)

    async function pesquisar() {
        console.log('olaa')
        console.log(usuario)
        
        await Firebase
            .firestore()
            .collection("usuarios")
            //.where('nome', '==', nome)
            .get()
            .then((querySnapshot) => {
                setUsuarios([]);
        
                //console.log('querySnapshot.data()')

                querySnapshot.docs.forEach((documentSnapshot) => {
                    if (documentSnapshot.id !== usuario.id) setUsuarios((oldArray) => [
                        ...oldArray, { id: documentSnapshot.id, ...documentSnapshot.data() }
                    ]);
                });

                console.log(usuarios)
            })
            .catch((err) => {
                Toast.show("Erro ao carregar respostas.", Toast.SHORT);
            });
    }

    return <View style={styles.container}>  
        <Header />
        <View style={styles.containerInput}>
            <TextInput
                placeholder='Buscar'
                multiline
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />
            <TouchableOpacity style={styles.sendButton} onPress={pesquisar}>
                <MaterialCommunityIcons name='account-search' size={25} color='#333' />
            </TouchableOpacity>
        </View>
        <View style={styles.containerUsers}>
            { 
                usuarios.map(item => <Usuario key={item.id} user={item} />) 
            }
        </View>
    </View>
}

export default NovaMensagem;