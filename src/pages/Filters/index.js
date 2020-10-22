import React, { useEffect, useState } from 'react';
import { EvilIcons, AntDesign, Feather } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';
import Cambutton from '../../Components/Cambutton'

import Stories from "../../Components/Stories";

import Header from "../../Components/Header";
import StoriesList from "../../Components/Stories";
import PostsList from "../../Components/PostsList";


import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

function SquareCheck({ checked }) {
    if (checked) {
        return (
            <AntDesign name="checksquare" size={24} color="black" />
        )
    } else {
        return (
            <Feather name="square" size={24} color="silver" />
        )
    }
}

export default function Feed() {

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [pessoas, setPessoas] = useState(false)
    const [clubes, setclubes] = useState(false)
    const [cidade, setcidade] = useState(false)
    const [moto, setmoto] = useState(false)

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome() {
        navigation.navigate('Login');
    }

    return (
        <View>

            <Header />
            <ScrollView>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 10 }}>
                        O que você procura?
                    </Text>
                    <View >
                        <EvilIcons name="search" size={30} color="black" style={{ position: "absolute", margin: 10 }} />
                        <MyTextInput
                            placeholder="Buscar"
                            style={{ paddingLeft: 40 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', borderBottomColor: 'silver', height: 70, borderBottomWidth: 0.5, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, marginVertical: 20, marginLeft:5 }}>
                            Pessoas
                        </Text>
                        <TouchableOpacity style={{marginVertical:20}} onPress={()=>{(pessoas)?setPessoas(false):setPessoas(true)}}>
                            <SquareCheck checked={pessoas} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', borderBottomColor: 'silver', height: 70, borderBottomWidth: 0.5, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, marginVertical: 20, marginLeft:5 }}>
                            Clubes
                        </Text>
                        <TouchableOpacity style={{marginVertical:20, marginLeft:5}} onPress={()=>{(clubes)?setclubes(false):setclubes(true)}}>
                            <SquareCheck checked={clubes} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', borderBottomColor: 'silver', height: 70, borderBottomWidth: 0.5, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, marginVertical: 20, marginLeft:5 }}>
                            Cidade
                        </Text>
                        <TouchableOpacity style={{marginVertical:20}} onPress={()=>{(cidade)?setcidade(false):setcidade(true)}}>
                            <SquareCheck checked={cidade} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', borderBottomColor: 'silver', height: 70, borderBottomWidth: 0.5, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, marginVertical: 20, marginLeft:5 }}>
                            Tipo de Moto
                        </Text>
                        <TouchableOpacity style={{marginVertical:20}} onPress={()=>{(moto)?setmoto(false):setmoto(true)}}>
                            <SquareCheck checked={moto} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Cambutton />
        </View>
    );
}

