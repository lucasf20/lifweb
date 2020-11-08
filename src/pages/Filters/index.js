import React, { useEffect, useState } from 'react';
import { EvilIcons, AntDesign, Feather } from '@expo/vector-icons';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';
import Cambutton from '../../Components/Cambutton'

import Header from "../../Components/Header";
import Cards from './Cards'

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

import profileIcon from '../../assets/logolifweb.png'

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
    const allUsers = getAllUsers()
    const navigation = useNavigation();
    const [pessoas, setPessoas] = useState(false)
    const [clubes, setclubes] = useState(false)
    const [cidade, setcidade] = useState(false)
    const [moto, setmoto] = useState(false)
    const [busca, setbusca] = useState("")
    const [results, setresults] = useState([])

    function getAllUsers(){
        var res = {}
        firebase.database().ref("user").on('value', snapshot => {
            res = snapshot.val()
        })
        return res
    }

    async function buscafoto(uid){
        var ref = firebase.storage().refFromURL("gs://lifweb-38828.appspot.com/user/" + uid + "/perfil")
        var res = profileIcon
        try{
            res = {uri:await ref.getDownloadURL()}
        }catch(e){
            res = profileIcon
        }
        return res
    }

    async function formatar(keys){
        var res = []
        for(let i = 0; i<keys.length; i++){
            if((i+1)<keys.length){
                res.push([{
                    uid:keys[i],
                    nome:allUsers[keys[i]]['apelido'],
                    moto:allUsers[keys[i]]['modeloDaMoto']['moto'],
                    profissao:allUsers[keys[i]]['profissao'],
                    imagem:await buscafoto(keys[i])
                }, {
                    uid:keys[++i],
                    nome:allUsers[keys[i]]['apelido'],
                    moto:allUsers[keys[i]]['modeloDaMoto']['moto'],
                    profissao:allUsers[keys[i]]['profissao'],
                    imagem:await buscafoto(keys[i])
                }])
            }else{
                res.push([{
                    uid:keys[i],
                    nome:allUsers[keys[i]]['apelido'],
                    moto:allUsers[keys[i]]['modeloDaMoto']['moto'],
                    profissao:allUsers[keys[i]]['profissao'],
                    imagem:await buscafoto(keys[i])
                }])
            }
        }
        return res
    }

    function search(){
        var keys = Object.keys(allUsers)
        var reg = new RegExp(busca.toUpperCase())
        var p = []
        var e = []
        var m = []
        var c = []
        var res = []
        if(busca.length > 0){
            for(let i = 0; i<keys.length; i++){
                if(pessoas && (reg.test(allUsers[keys[i]]['apelido'].toUpperCase())||reg.test(allUsers[keys[i]]['fullName'].toUpperCase()))){
                    p.push(keys[i])
                }
                if(cidade){
                    if(allUsers[keys[i]]['endereco']){
                        if(reg.test(allUsers[keys[i]]['endereco']['cidade'].toUpperCase())){
                            e.push(keys[i])
                        }
                    }
                }
                if(moto && reg.test(allUsers[keys[i]]['modeloDaMoto']['moto'].toUpperCase())){
                    m.push(keys[i])
                }
                if(clubes && allUsers[keys[i]]['clube']){
                    if(reg.test(allUsers[keys[i]]['clube'].toUpperCase())){
                        c.push[keys[i]]
                    }
                }
            }
        }
    res = res.concat(p,m,e,c)
    formatar(res).then(r => setresults(r))
    }

    function showLines(item){
        if(item[1]){
            return(
                <View style={{flexDirection:'row', marginHorizontal:20, marginBottom:20, justifyContent:'space-between'}} >
                    <Cards imagem={item[0].imagem} nome={item[0].nome} profissao={item[0].profissao} moto={item[0].moto} uid={item[0].uid}/>
                    <Cards imagem={item[1].imagem} nome={item[1].nome} profissao={item[1].profissao} moto={item[1].moto} uid={item[1].uid}/>   
                </View>
            )
        }else{
            return(
                <View style={{marginHorizontal:20, marginBottom:20}} >
                    <Cards imagem={item[0].imagem} nome={item[0].nome} profissao={item[0].profissao} moto={item[0].moto} uid={item[0].uid}/>
                </View>
            )
        }
    }

    return (
        <SafeAreaView>
            <Header/>
            <ScrollView>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 10 }}>
                        {(Object.keys(allUsers).length>0)?"O que você procura?":navigation.goBack()}
                    </Text>
                    <View >
                        <EvilIcons name="search" size={30} color="black" style={{ position: "absolute", margin: 10 }} />
                        <MyTextInput
                            placeholder="Buscar"
                            style={{ paddingLeft: 40 }}
                            value={busca}
                            onChangeText={text => setbusca(text)}
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
                    <TouchableOpacity style={{backgroundColor:dorange, height:50, marginTop:10, borderRadius:5, alignItems:'center', justifyContent:'center'}} onPress={() => {search()}}>
                        <Text style={{color:'white', fontSize:15}}>
                            Buscar
                        </Text>
                    </TouchableOpacity>
                    <View style={{marginTop:20, marginBottom:80}}>
                        {results.map((item,index,arr) => (showLines(item)))}
                    </View>
                </View>
            </ScrollView>
            <Cambutton />
        </SafeAreaView>
    );
}

