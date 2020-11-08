import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

function Home () {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.navigate('MinhasMensagens')}>
                <Text style={styles.buttonText}>Ver Conversas</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home;