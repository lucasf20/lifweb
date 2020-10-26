import React, { useEffect, useState } from 'react';
import { EvilIcons, AntDesign, Feather } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';
import Cambutton from '../../Components/Cambutton'

import Stories from "../../Components/Stories";

import Header from "../../Components/Header";
import Cards from './Cards'

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

import perfil from '../../images/perfil3.jpg'

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

    var results = [[{imagem:perfil, nome:'Nome da Pessoa', profissao:'Profissão', moto:'Modelo da Moto'},{imagem:perfil, nome:'Nome da Pessoa2', profissao:'Profissão', moto:'Modelo da Moto'}],[{imagem:perfil, nome:'Nome da Pessoa', profissao:'Profissão', moto:'Modelo da Moto'},{imagem:perfil, nome:'Nome da Pessoa2', profissao:'Profissão', moto:'Modelo da Moto'}],[{imagem:perfil, nome:'Nome da Pessoa', profissao:'Profissão', moto:'Modelo da Moto'},{imagem:perfil, nome:'Nome da Pessoa2', profissao:'Profissão', moto:'Modelo da Moto'}],[{imagem:perfil, nome:'Nome da Pessoa3', profissao:'Profissão', moto:'Modelo da Moto'},{imagem:perfil, nome:'Nome da Pessoa', profissao:'Profissão', moto:'Modelo da Moto'}],[{imagem:perfil, nome:'Nome da Pessoa', profissao:'Profissão', moto:'Modelo da Moto'},{imagem:perfil, nome:'Nome da Pessoa', profissao:'Profissão', moto:'Modelo da Moto'}],[{imagem:perfil, nome:'Nome da Pessoa', profissao:'Profissão', moto:'Modelo da Moto'}]]

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

    function showLines(item){
        if(item[1]){
            return(
                <View style={{flexDirection:'row', marginHorizontal:20, marginBottom:20, justifyContent:'space-between'}} >
                    <Cards imagem={item[0].imagem} nome={item[0].nome} profissao={item[0].profissao} moto={item[0].moto}/>
                    <Cards imagem={item[1].imagem} nome={item[1].nome} profissao={item[1].profissao} moto={item[1].moto}/>   
                </View>
            )
        }else{
            return(
                <View style={{marginHorizontal:20, marginBottom:20}} >
                    <Cards imagem={item[0].imagem} nome={item[0].nome} profissao={item[0].profissao} moto={item[0].moto}/>
                </View>
            )
        }
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
                    <View style={{marginTop:20, marginBottom:80}}>
                        {results.map((item,index,arr) => (showLines(item)))}
                    </View>
                </View>
            </ScrollView>
            <Cambutton />
        </View>
    );
}

