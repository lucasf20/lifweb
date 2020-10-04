import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, TouchableOpacity, Button, Alert, Platform, FlatList, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import DateTimePicker from '@react-native-community/datetimepicker';


import lifweb from '../../assets/logolifweb.png';

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function CreateAcc2() {

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [Name, setName] = useState('');
    const [data, setData] = useState('');
    const [profissao, setProfissao] = useState('');
    const [moto, setMoto] = useState('')
    const [motoSelecionada, setMotoSelecionada] = useState("")


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
        const user = firebase.auth().currentUser
        var FullName = ""
        firebase.database().ref('user/' + user.uid + "/fullName").on('value', function get(snapshot) {
            FullName = snapshot.val()
        })
        return FullName
    }
    //date time picker

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        var d = currentDate + "";
        var aux = d.split(" ")
        setDate(currentDate)
        setData(aux[2] + "-" + aux[1] + "-" + aux[3]);
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


    function cadastrar() {
        const user = firebase.auth().currentUser
        if (Name.length > 0 && profissao.length > 0 && data.length > 0 && motoSelecionada.length > 0) {
            firebase.database().ref('user/' + user.uid).update({
                nome: getFullName(),
                firstAccess: false,
                apelido: Name,
                profissao: profissao,
                nascimento: data,
                modeloDaMoto: motoSelecionada
            }).then(() => {
                navigation.navigate('Feed')
                alert("Cadastro Finalizado!")
            }
            ).catch(erro => {
                console.log(erro)
                alert("Falha ao cadastrar! Tente novamente!")
            }
            )
        } else {
            alert("Por favor, preencha todos os campos!")
        }
    }

    function getMotos() {
        var motosList = []
        var motoObj = {}
        var aux = {}
        if (moto.length > 2) {
            firebase.database().ref('motos/').on('value', snapshot => {
                motoObj = snapshot.val()
            })
            var motokeys = Object.keys(motoObj)
            motokeys = motokeys.filter(item => {
                var reg = new RegExp(moto.toUpperCase())
                if (motoSelecionada.length == 0 || !(motoSelecionada == moto)) {
                    return reg.test(item.toUpperCase())
                } else {
                    return item == motoSelecionada
                }
            })
            for (let i = 0; i < motokeys.length; i++) {
                aux = motoObj[motokeys[i]]
                motosList.push({
                    id: aux['linha'],
                    title: aux['descricao']
                })
            }
            return motosList
        }
        else {
            return [{ title: "Buscar modelo", id: 0 }]
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
                        source={lifweb}
                    />
                </View>

                <Text style={styles.BigText}>
                    {getFullName()},
            </Text>

                <Text style={styles.LooseText}>
                    Como você gostaria de ser chamado?
            </Text>

                <MyTextInput
                    onChangeText={text => setName(text)}
                    value={Name}
                    placeholder='Nome'
                />
                <Text style={styles.LooseText}>
                    Qual a sua moto?
            </Text>
                <MyTextInput
                    onChangeText={text => setMoto(text)}
                    value={moto}
                    placeholder='Escreva o modelo da moto'
                />
                <FlatList
                    ItemSeparatorComponent={
                        Platform.OS !== 'android' &&
                        (({ highlighted }) => (
                            <View
                                style={[
                                    style.separator,
                                    highlighted && { marginLeft: 0 }
                                ]}
                            />
                        ))
                    }
                    data={getMotos()}
                    renderItem={({ item, index, separators }) => (
                        <TouchableHighlight
                            key={item.key}
                            onPress={() => { if (!(item['id'] == 0)) { setMotoSelecionada(item['title']); setMoto(item['title']); } else { setMotoSelecionada('') } }}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}>
                            <View style={{ backgroundColor: dorange, borderRadius: 5, height: 50,  borderWidth:1, borderColor:'gray' }}>
                                <Text style={{ fontSize: 15, padding: 15, color: 'white' }}>{item.title}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
                <Text style={styles.LooseText}>
                    Qual a sua profissão?
            </Text>
                <MyTextInput
                    onChangeText={text => setProfissao(text)}
                    value={profissao}
                    placeholder='Profissão'
                />
                <Text style={styles.LooseText}>
                    Qual a sua data de nascimento?
            </Text>
                <TouchableOpacity onPress={showDatePicker} style={{
                    borderRadius: 5,
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "gray"
                }}>
                    <View style={{ alignItems: "center", padding: 10 }}>
                        <Text style={{ color: (data.length > 0) ? "black" : "gray", fontSize: 12 }}>
                            {(data.length > 0) ? data : "Toque aqui para selecionar sua data de nascimento"}
                        </Text>
                    </View>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                <View style={styles.ButtonView}>
                    <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 10 }} onPress={() => { cadastrar() }}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", padding: 5 }}>
                                CRIAR NOVA CONTA
                    </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

