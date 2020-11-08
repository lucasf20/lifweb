import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

function Usuario (props) {
    const { user } = props;
    const navigation = useNavigation();

    return <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => navigation.navigate('Chat', { idUser: user.id })}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <Text style={styles.name}>{user.nome}</Text>
    </TouchableOpacity>
}

export default Usuario;