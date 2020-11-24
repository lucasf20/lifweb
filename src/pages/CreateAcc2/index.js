import * as Localization from 'expo-localization'
import i18n from 'i18n-js';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, TouchableOpacity, Button, Alert, Platform, FlatList, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import DateTimePicker from '@react-native-community/datetimepicker';


import lifweb from '../../assets/logolifweb.png';

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import translate from '../../translate';

i18n.translations = translate

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function CreateAcc2() {

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [Name, setName] = useState('');
    const [data, setData] = useState('');
    const [profissao, setProfissao] = useState('');
    const [profSelecionada, setprofSelecionada] = useState('')
    const [moto, setMoto] = useState('')
    const [motoSelecionada, setMotoSelecionada] = useState('')
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [check, setCheck] = useState(false)

    function clearStates() {
        setName('')
        setData('')
        setProfissao('')
        setprofSelecionada('')
        setMoto('')
        setMotoSelecionada('')
        setDate(new Date(1598051730000))
        setMode('date')
        setShow(false)
        setCheck(false)
    }

    function resize(scale, img){
        const {width, height} = Image.resolveAssetSource(img);
        return {width:scale*width, height:scale*height}
    }

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome() {
        navigation.navigate('Login');
    }

    function navigateEmail() {
        navigation.navigate('EmailVal');
    }

    function getFullName() {
        var user = firebase.auth().currentUser
        return user.displayName
    }
    //date time picker

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        var d = currentDate + "";
        var aux = d.split(" ")
        setDate(currentDate)
        const meses = {
            Dec: "dezembro",
            Nov: "novembro",
            Oct: "outubro",
            Sep: "setembro",
            Aug: "agosto",
            Jul: "julho",
            Jun: "junho",
            May: "maio",
            Apr: "abril",
            Mar: "março",
            Feb: "fevereiro",
            Jan: "janeiro"
        }
        setData(aux[2] + " de " + meses[aux[1]] + " de " + aux[3]);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatePicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const atualizaPerfil = async (image) => {
        const response = await fetch(image)
        const blob = await response.blob()
        var user = firebase.auth().currentUser
        var uploadTask = await firebase.storage().ref().child("user/" + user.uid + "/perfil").put(blob)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED)
    }

    function cadastrar() {
        const user = firebase.auth().currentUser
        if (check) {
            if (Name.length > 0 && profSelecionada.length > 0 && data.length > 0 && motoSelecionada.length > 0) {
                firebase.firestore().collection('user').doc(user.uid).update(
                    {
                        fullName: getFullName(),
                        firstAccess: false,
                        apelido: Name,
                        profissao: profSelecionada,
                        nascimento: data,
                        modeloDaMoto: {moto:motoSelecionada},
                        posts:[]
                    }
                )
                firebase.database().ref('user/' + user.uid).update({
                    fullName: getFullName(),
                    firstAccess: false,
                    apelido: Name,
                    profissao: profSelecionada,
                    nascimento: data,
                    modeloDaMoto: {moto:motoSelecionada}
                }).then(() => {
                    user.updateProfile({
                        displayName:Name
                    })
                    clearStates()
                    navigation.navigate('Feed')
                    Alert.alert("Cadastro Finalizado!","Seja bem-vindo ao LifWeb!")
                }
                ).catch(erro => {
                    console.log(erro)
                    Alert.alert("Falha ao cadastrar!", "Tente novamente!")
                }
                )
                atualizaPerfil(user.photoURL)
            } else {
                switch(0){
                    case Name.length:
                        Alert.alert("Apelido incorreto!","Preencha corretamente como gostaria de ser chamado!")
                        break
                    case data.length:
                        Alert.alert("Verifique a sua data de nascimento!","Preencha corretamente a sua data de nascimento!")
                        break
                    case profSelecionada.length:
                        Alert.alert("Profissão inválida!","Preencha corretamente a sua profissão!")
                        setProfissao('')
                        break
                    case motoSelecionada.length:
                        Alert.alert("Moto inválida!","Preencha corretamente o modelo da sua moto!")
                        setMoto('')
                        break
                }
            }
        } else {
            Alert.alert("Aceite os termos e condições!","Por favor, aceite os termos e condições!")
        }
    }

    function getMotos() {
        var motosList = []
        var motoObj = {}
        var aux = {}
        if (moto.length > 2 && moto != 'NÃO CONSTA NA LISTA') {
            firebase.database().ref('motos/').on('value', snapshot => {
                motoObj = snapshot.val()
            })
            var motokeys = Object.keys(motoObj)
            motokeys = motokeys.filter(item => {
                var reg = new RegExp(moto.toUpperCase())
                if (motoSelecionada.length == 0 || !(motoSelecionada == moto)) {
                    return reg.test(item.toUpperCase())
                } else {
                    return false
                }
            })
            for (let i = 0; i < motokeys.length; i++) {
                aux = motoObj[motokeys[i]]
                motosList.push({
                    id: aux['linha'],
                    title: aux['descricao']
                })
            }
            motosList.push({
               id:'nao',
               title: i18n.t('notonlist') 
            })
            return motosList.reverse()
        }
        else {
            return []
        }
    }

    function getProf() {
        var profsList = []
        var profObj = {}
        if (profissao.length > 2 &&profissao != 'NÃO CONSTA NA LISTA') {
            firebase.database().ref('profissoes/').on('value', snapshot => {
                profObj = snapshot.val()
            })
            profsList = Object.keys(profObj)
            profsList = profsList.filter(item => {
                var reg = new RegExp(profissao.toUpperCase())
                if (!(profissao == profSelecionada)) {
                    return reg.test(item.toUpperCase())
                } else {
                    return false
                }
            })
            for (let i = 0; i < profsList.length; i++) {
                profsList[i] = {
                    id: profObj[profsList[i]]['codigo'] + i,
                    title: profObj[profsList[i]]['titulo']
                }
            }
            profsList.push({
                id:'nao',
                title:i18n.t('notonlist') 
             })
            return profsList.reverse()
        } else {
            return []
        }
    }


    return (

        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}>
            <ScrollView style={styles.container}>

                <View style={styles.header}>

                </View>

                <View style={styles.logo}>
                    <Image
                        source = {lifweb}
                        style={{height:resize(0.7,lifweb).height, width:resize(0.7,lifweb).width}}
                    />
                </View>

                <Text style={styles.BigText}>
                    {getFullName()},
            </Text>

                <Text style={styles.LooseText}>
                    {i18n.t('namequestion')} 
            </Text>

                <MyTextInput
                    onChangeText={text => setName(text)}
                    value={Name}
                    placeholder={i18n.t('name')} 
                />
                <Text style={styles.LooseText}>
                {i18n.t('bikequestion')} 
            </Text>
                <MyTextInput
                    onChangeText={text => setMoto(text)}
                    value={moto}
                    placeholder={i18n.t('modelfield')} 
                />
                <FlatList
                    data={(motoSelecionada != moto)?getMotos():[]}
                    renderItem={({ item, index, separators }) => (
                        <TouchableHighlight
                            key={item.key}
                            onPress={() => { if (!(item['id'] == 0)) { setMotoSelecionada(item['title']); setMoto(item['title']); } else { setMotoSelecionada('') } }}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}>
                            <View style={{ backgroundColor: dorange, borderRadius: 5, height: 50, borderWidth: 1, borderColor: 'gray' }}>
                                <Text style={{ fontSize: 15, padding: 15, color: 'white' }}>{item.title}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
                <Text style={styles.LooseText}>
                    {i18n.t('professionquestion')}
            </Text>
                <MyTextInput
                    onChangeText={text => setProfissao(text)}
                    value={profissao}
                    placeholder={i18n.t('professionfield')}
                />
                <FlatList
                    data={(profSelecionada != profissao)?getProf():[]}
                    renderItem={({ item, index, separators }) => (
                        <TouchableHighlight
                            key={item.key}
                            onPress={() => { if (!(item['id'] == 0)) { setprofSelecionada(item['title']); setProfissao(item['title']); } else { setprofSelecionada('') } }}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}>
                            <View style={{ backgroundColor: dorange, borderRadius: 5, height: 50, borderWidth: 1, borderColor: 'gray' }}>
                                <Text style={{ fontSize: 15, padding: 7, color: 'white' }}>{item.title}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
                <Text style={styles.LooseText}>
                    {i18n.t('birthquestion')}
            </Text>
                <TouchableOpacity onPress={showDatePicker} style={{
                    borderRadius: 5,
                    height: 50,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "gray"
                }}>
                    <View style={{ alignItems: "center", padding: 10 }}>
                        <Text style={{ color: (data.length > 0) ? "black" : "gray", fontSize: 12 }}>
                            {(data.length > 0) ? data : i18n.t('birthselect')}
                        </Text>
                    </View>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        locale= {Localization.locale}
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                <View style={{ paddingTop: 10, flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => {
                        (check) ? setCheck(false) : setCheck(true)
                    }}>
                        <AntDesign name="checksquare" size={24} color={(check) ? "green" : "gray"} />
                    </TouchableOpacity>
                    <Text style={{ paddingLeft: 7, paddingTop: 5 }}>
                        {i18n.t('readandacc')}
                    </Text>
                    <TouchableOpacity style={{ paddingLeft: 5, paddingTop: 4 }}>
                        <Text style={{ color: dorange, fontWeight: 'bold', fontSize: 15 }}>
                            {i18n.t('termsand')}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.ButtonView}>
                    <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 5 }} onPress={() => { cadastrar() }}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", padding: 15 }}>
                                {i18n.t('createnewacc')}
                    </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

