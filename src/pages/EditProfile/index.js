import React, { useState } from 'react'
import { Text, View, TouchableOpacity, FlatList, TouchableHighlight, ScrollView, Alert, Dimensions } from 'react-native'
import colorStyles from "../../colors";
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../firebaseConfig';
import MyTextInput from '../../MyTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Part1({ changeState }) {

    function getData(){
        const user = firebase.auth().currentUser
        var data = {}
        var iniStates = {}
        firebase.database().ref('user/'+user.uid).on('value', snapshot =>{
            data = snapshot.val()
        })
        iniStates = {
            endereco: {
                cep: (data.endereco)?data.endereco.cep:"",
                rua: (data.endereco)?data.endereco.rua:"",
                numero: (data.endereco)?data.endereco.numero:"",
                cidade: (data.endereco)?data.endereco.cidade:""
            },
            telefone: (data.telefone)?data.telefone:"",
            sangue: (data.sangue)?data.sangue:""
        }
        return iniStates
    }

    const dorange = colorStyles.dorange
    const user = firebase.auth().currentUser
    const [cep, setcep] = useState(getData().endereco.cep)
    const [cepchecked, setcepchecked] = useState(getData().endereco.cep.length > 0)
    const [rua, setrua] = useState(getData().endereco.rua)
    const [numero, setnumero] = useState(getData().endereco.numero)
    const [cidade, setcidade] = useState(getData().endereco.cidade)
    const [telefone, settelefone] = useState(getData().telefone)
    const [showlist, setshowlist] = useState(false)
    const [sangue, setsangue] = useState(getData().sangue)
    const [cepcorreto, setcepcorreto] = useState(getData().endereco.cep.length > 0)

    function checkCep(cp) {
        var c = cp.replace("-", "").replace(".", "")
        if (c.length == 8 && !cepchecked) {
            fetch('http://viacep.com.br/ws/' + c + "/json/").then(response => response.json())
                .then(j => {
                    if (j.localidade) {
                        setrua(j.logradouro + ", " + j.bairro)
                        setcidade(j.localidade + " - " + j.uf)
                        setcepchecked(true)
                        setcepcorreto(true)
                    } else {
                        Alert.alert("CEP não encontrado!", "O CEP foi digitado incorretamente ou não existe!")
                        setrua('')
                        setcidade('')
                        setcepchecked(true)
                        setcepcorreto(false)
                    }
                }
                )
        }
    }

    function checkTelefone() {
        var reg = /\d+/g
        var tel = telefone.match(reg)
        var num = ""

        for (let i = 0; i < tel.length; i++) {
            num += tel[i]
        }
        if (num.length >= 10) {
            return [true, num]
        } else {
            return [false, num]
        }
    }

    function mascara(celular){
        var reg = /\d+/g
        var tel = celular.match(reg)
        var telfull = ""
        var show = ""
        if(reg.test(celular)){
            for(let i = 0; i< tel.length; i++){
                telfull += tel[i]
            }
            for(let i = 0; i<telfull.length; i++){
                if(i==0){
                    show += "("
                }
                if(i==2){
                    show+=") "
                }
                if(i==3 && telfull.length==11){
                    show += " "
                }
                if (i==6 && telfull.length==10){
                    show += "-"
                }
                if (i==7 && telfull.length == 11){
                    show += "-"
                }
                show+= telfull[i]
            }
        }
        if(telfull.length > 11){
            return telefone
        }else{
            return show
        }
    }

    function extract() {
        var reg = /\d+/g
        var tel = cep.match(reg)
        var num = ""

        for (let i = 0; i < tel.length; i++) {
            num += tel[i]
        }

        return num
    }

    function atualizar() {
        if (cepcorreto) {
            if (extract().length == 8) {
                if (rua.length > 0) {
                    if (numero.length > 0) {
                        if (cidade.length > 0) {
                            if (checkTelefone()[0]) {
                                if (sangue.length > 0) {
                                    var data = {
                                        endereco: {
                                            cep: extract(),
                                            rua,
                                            numero,
                                            cidade
                                        },
                                        telefone: checkTelefone()[1],
                                        sangue
                                    }
                                    firebase.database().ref('user/' + user.uid).update(data)
                                        .then(changeState(2))
                                } else {
                                    Alert.alert("Tipo sanguíneo inválido!", "Forneça seu tipo sanguíneo!")
                                }
                            } else {
                                Alert.alert("Telefone inválido!", "Forneça um número de telefone válido!")
                            }
                        } else {
                            Alert.alert("Cidade inválida!", "Forneça o nome da cidade!")
                        }
                    } else {
                        Alert.alert("Número inválido!", "Forneça o número da residência!")
                    }
                } else {
                    Alert.alert("Nome da rua inválido!", "Forneça o nome da rua!")
                }
            } else {
                Alert.alert("Forneça um CEP válido!", "O CEP foi digitado incorretamente ou não existe!")
            }
        } else {
            Alert.alert("Forneça um CEP válido!", "O CEP foi digitado incorretamente ou não existe!")
        }
    }

    return (
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
                CEP
            </Text>
            <MyTextInput value={cep} onChangeText={text => { setcep(text); checkCep(text); setcepchecked(false) }} placeholder='CEP' />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
                Rua
            </Text>
            <MyTextInput value={rua} onChangeText={text => { setrua(text) }} placeholder='Rua' />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
                Número
            </Text>
            <MyTextInput value={numero} onChangeText={text => { setnumero(text) }} placeholder='Número' />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
                Cidade / Estado
            </Text>
            <MyTextInput value={cidade} onChangeText={text => { setcidade(text) }} placeholder='Cidade / Estado' />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
                Telefone
            </Text>
            <MyTextInput value={telefone} onChangeText={text => { settelefone(mascara(text)) }} placeholder='Telefone' />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
                Tipo Sanguíneo
            </Text>
            <TouchableOpacity style={{ height: 50, borderRadius: 5, borderColor: 'silver', borderWidth: 1, backgroundColor: '#FFFFFF99', justifyContent:'center' }} onPress={() => { (showlist) ? setshowlist(false) : setshowlist(true) }}>
                <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                    <Text style={{ color: (sangue.length == 0) ? "gray" : 'black', marginLeft: 11 }}>
                        {(sangue.length == 0) ? "Selecione o seu tipo sanguíneo" : sangue}
                    </Text>
                    <Ionicons name="ios-arrow-down" size={24} color="gray" style={{ marginRight: 10 }} />
                </View>
            </TouchableOpacity>
            <FlatList
                data={(showlist) ? ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] : []}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        key={index}
                        onPress={() => { setsangue(item); setshowlist(false) }}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View style={{ backgroundColor: 'white', borderRadius: 5, height: 50, borderWidth: 0.5, borderColor: 'silver', justifyContent:'center' }}>
                            <Text style={{ fontSize: 15, color: 'black', marginLeft:11 }}>{item}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
            <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 5, marginTop: 20 }} onPress={() => { atualizar() }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 15, padding: 15 }}>
                        ATUALIZAR
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

function Part2({ changeState }) {
    const dorange = colorStyles.dorange
    const [marca, setmarca] = useState('')
    const [showmarca, setshowmarca] = useState(false)
    const [moto, setmoto] = useState('')
    const [showmoto, setshowmoto] = useState(false)
    const [ano, setano] = useState('')

    function getMarca() {
        var motos = {};
        var marcas = {};
        firebase.database().ref('motos/').on('value', snapshot => {
            motos = snapshot.val()
        })
        var keys = Object.keys(motos)
        for (let i = 0; i < keys.length; i++) {
            marcas[motos[keys[i]]['marca']] = 1
        }
        keys = Object.keys(marcas)
        return keys.sort()
    }

    function getMoto() {
        var motos = {};
        var modelo = [];
        firebase.database().ref('motos/').on('value', snapshot => {
            motos = snapshot.val()
        })
        var keys = Object.keys(motos)
        for (let i = 0; i < keys.length; i++) {
            if (motos[keys[i]]['marca'] == marca) {
                modelo.push(motos[keys[i]]['descricao'])
            }
        }
        return modelo.sort()
    }

    return (
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <View style={{ height: 250, borderRadius: 5, backgroundColor: 'white', justifyContent: 'center' }}>
                <View style={{ alignItems:'center'}}>
                    <Text style={{ fontSize: 20 }}>
                        CAPA PERFIL
                    </Text>
                    <TouchableOpacity style={{ borderRadius: 5, backgroundColor: dorange, height: 50, width: 150, justifyContent:'center', alignItems:'center' }}>
                        <Text style={{ color: 'white', fontSize: 15 }}>
                            Buscar
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
                MARCA MOTOCICLETA
            </Text>
            <TouchableOpacity style={{ height: 50, borderRadius: 5, borderColor: 'silver', borderWidth: 1, backgroundColor: '#FFFFFF99' }} onPress={() => { (showmarca) ? setshowmarca(false) : setshowmarca(true) }}>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                    <Text style={{ color: (marca.length == 0) ? 'gray' : 'black', marginLeft: 10 }}>
                        {(marca.length == 0) ? 'ESCOLHA UMA OPÇÃO' : marca}
                    </Text>
                    <Ionicons name="ios-arrow-down" size={24} color="gray" style={{ marginRight: 10 }} />
                </View>
            </TouchableOpacity>
            <FlatList
                data={(showmarca) ? getMarca() : []}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        key={index}
                        onPress={() => { setmarca(item); setshowmarca(false) }}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View style={{ backgroundColor: 'white', borderRadius: 5, height: 50, borderWidth: 0.5, borderColor: 'silver' }}>
                            <Text style={{ fontSize: 15, padding: 7, color: 'black' }}>{item}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
                MODELO
            </Text>
            <TouchableOpacity style={{ height: 50, borderRadius: 5, borderColor: 'silver', borderWidth: 1, backgroundColor: '#FFFFFF99' }} onPress={() => { (showmoto) ? setshowmoto(false) : setshowmoto(true) }}>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                    <Text style={{ color: (moto.length == 0) ? 'gray' : 'black', marginLeft: 10 }}>
                        {(moto.length == 0) ? 'ESCOLHA UMA OPÇÃO' : moto}
                    </Text>
                    <Ionicons name="ios-arrow-down" size={24} color="gray" style={{ marginRight: 10 }} />
                </View>
            </TouchableOpacity>
            <FlatList
                data={(showmoto) ? getMoto() : []}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        key={index}
                        onPress={() => { setmoto(item); setshowmoto(false) }}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View style={{ backgroundColor: 'white', borderRadius: 5, height: 50, borderWidth: 0.5, borderColor: 'silver' }}>
                            <Text style={{ fontSize: 15, padding: 7, color: 'black' }}>{item}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
            <View style={{ marginTop: 20 }}>
                <MyTextInput value={ano} onChangeText={text => { setano(text) }} placeholder='Ano' />
            </View>
            <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 5, marginVertical: 20 }} onPress={() => { changeState(3) }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 15, padding: 15 }}>
                        ATUALIZAR
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

function Part3({ changeState }) {
    const dorange = colorStyles.dorange
    const [profissao, setprofissao] = useState("")
    const [showprofissao, setshowprofissao] = useState(false)
    const [clube, setclube] = useState("")
    const [showclube, setshowclube] = useState(false)

    function getprofissao() {
        var profissoes = {}
        var lista = []
        firebase.database().ref('profissoes/').on('value', snapshot => {
            profissoes = snapshot.val()
        })
        var keys = Object.keys(profissoes)
        for (let i = 0; i < keys.length; i++) {
            lista.push(profissoes[keys[i]]['titulo'])
        }
        return lista.sort()
    }

    return (
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <View style={{ height: 250, borderRadius: 5, backgroundColor: 'white' }}>
                <View style={{ height: 250, borderRadius: 5, backgroundColor: 'white', justifyContent:'center', alignItems:'center' }}>
                    <Text style={{ fontSize: 20 }}>
                        AVATAR
                    </Text>
                    <TouchableOpacity style={{ borderRadius: 5, backgroundColor: dorange, height: 50, width: 150, justifyContent:'center', alignItems:'center' }}>
                        <Text style={{ color: 'white', fontSize: 15 }}>
                            Buscar
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
                PROFISSÃO
            </Text>
            <TouchableOpacity style={{ height: 50, borderRadius: 5, borderColor: 'silver', borderWidth: 1, backgroundColor: '#FFFFFF99' }} onPress={() => { (showprofissao) ? setshowprofissao(false) : setshowprofissao(true) }}>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                    <Text style={{ color: (profissao.length == 0) ? 'gray' : 'black', marginLeft: 10 }}>
                        {(profissao.length == 0) ? 'ESCOLHA UMA OPÇÃO' : profissao}
                    </Text>
                    <Ionicons name="ios-arrow-down" size={24} color="gray" style={{ marginRight: 10 }} />
                </View>
            </TouchableOpacity>
            <FlatList
                data={(showprofissao) ? getprofissao() : []}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        key={index}
                        onPress={() => { setprofissao(item); setshowprofissao(false) }}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View style={{ backgroundColor: 'white', borderRadius: 5, height: 50, borderWidth: 0.5, borderColor: 'silver' }}>
                            <Text style={{ fontSize: 15, padding: 7, color: 'black' }}>{item}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
                CLUBE ASSOCIADO
            </Text>
            <TouchableOpacity style={{ height: 50, borderRadius: 5, borderColor: 'silver', borderWidth: 1, backgroundColor: '#FFFFFF99' }} onPress={() => { (showclube) ? setshowclube(false) : setshowclube(true) }}>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                    <Text style={{ color: (clube.length == 0) ? 'gray' : 'black', marginLeft: 10 }}>
                        {(clube.length == 0) ? 'ESCOLHA UMA OPÇÃO' : clube}
                    </Text>
                    <Ionicons name="ios-arrow-down" size={24} color="gray" style={{ marginRight: 10 }} />
                </View>
            </TouchableOpacity>
            <FlatList
                data={(showclube) ? [] : []}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        key={index}
                        onPress={() => { setclube(item); setshowclube(false) }}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View style={{ backgroundColor: 'white', borderRadius: 5, height: 50, borderWidth: 0.5, borderColor: 'silver' }}>
                            <Text style={{ fontSize: 15, padding: 7, color: 'black' }}>{item}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
                <Text style={{ fontSize: 15 }}>
                    Clube não cadastrado?
                </Text>
                <TouchableOpacity>
                    <Text style={{ color: dorange, marginLeft: 3, fontSize: 15, fontWeight: 'bold' }}>
                        Solicitar a inclusão.
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 5, marginVertical: 20 }} onPress={() => { changeState(3) }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 15, padding: 15 }}>
                        ATUALIZAR
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

function Header() {
    const dorange = colorStyles.dorange
    const navigation = useNavigation()
    const user = firebase.auth().currentUser
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, marginHorizontal: 15 }}>
                <Feather name="x" size={24} color="black" onPress={() => { navigation.goBack() }} />
                <TouchableOpacity onPress={() => { navigation.navigate("Profile") }}>
                    <Text style={{ color: dorange, marginTop: 5 }}>
                        PERFIL
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 40, marginHorizontal: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 30, }}>
                    {user.displayName},
                </Text>
                <Text style={{ color: 'gray', fontSize: 18 }}>
                    Complete seu cadastro
                </Text>
            </View>
        </View>
    )
}

export default function EditProfile() {
    const [part, setpart] = useState(1)
    const dorange = colorStyles.dorange
    const navigation = useNavigation()
    if (part == 1) {
        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}>
                <ScrollView>
                    <Header />
                    <Part1 changeState={setpart} />
                </ScrollView>
            </KeyboardAwareScrollView>
        )
    } else if (part == 2) {
        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}>
                <ScrollView>
                    <Header />
                    <Part2 changeState={setpart} />
                </ScrollView>
            </KeyboardAwareScrollView>
        )
    } else if (part == 3) {
        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}>
                <ScrollView>
                    <Header />
                    <Part3 changeState={setpart} />
                </ScrollView>
            </KeyboardAwareScrollView>
        )
    }
}
