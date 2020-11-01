import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, FlatList, TouchableHighlight, ScrollView, Alert, Platform, Dimensions, Image, Linking } from 'react-native'
import colorStyles from "../../colors";
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../firebaseConfig';
import MyTextInput from '../../MyTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';

function Part1({ changeState }) {

    function getData() {
        const user = firebase.auth().currentUser
        var iniStates = {}
        var data = {};
        firebase.database().ref('user/' + user.uid).on('value', snap => {
            data = snap.val()
        })
        iniStates = {
            endereco: {
                cep: (data.endereco) ? data.endereco.cep : "",
                rua: (data.endereco) ? data.endereco.rua : "",
                numero: (data.endereco) ? data.endereco.numero : "",
                cidade: (data.endereco) ? data.endereco.cidade : ""
            },
            telefone: (data.telefone) ? data.telefone : "",
            sangue: (data.sangue) ? data.sangue : ""
        }
        return [iniStates, data]
    }

    const dados = getData()[0]
    const dorange = colorStyles.dorange
    const user = firebase.auth().currentUser
    const [cep, setcep] = useState(dados.endereco.cep)
    const [cepchecked, setcepchecked] = useState(dados.endereco.cep.length > 0)
    const [rua, setrua] = useState(dados.endereco.rua)
    const [numero, setnumero] = useState(dados.endereco.numero)
    const [cidade, setcidade] = useState(dados.endereco.cidade)
    const [telefone, settelefone] = useState(mascara(dados.telefone))
    const [showlist, setshowlist] = useState(false)
    const [sangue, setsangue] = useState(dados.sangue)
    const [cepcorreto, setcepcorreto] = useState(dados.endereco.cep.length > 0)

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

    function mascara(celular) {
        var reg = /\d+/g
        var tel = celular.match(reg)
        var telfull = ""
        var show = ""
        if (reg.test(celular)) {
            for (let i = 0; i < tel.length; i++) {
                telfull += tel[i]
            }
            for (let i = 0; i < telfull.length; i++) {
                if (i == 0) {
                    show += "("
                }
                if (i == 2) {
                    show += ") "
                }
                if (i == 3 && telfull.length == 11) {
                    show += " "
                }
                if (i == 6 && telfull.length == 10) {
                    show += "-"
                }
                if (i == 7 && telfull.length == 11) {
                    show += "-"
                }
                show += telfull[i]
            }
        }
        if (telfull.length > 11) {
            return telefone
        } else {
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
            <TouchableOpacity style={{ height: 50, borderRadius: 5, borderColor: 'silver', borderWidth: 1, backgroundColor: '#FFFFFF99', justifyContent: 'center' }} onPress={() => { (showlist) ? setshowlist(false) : setshowlist(true) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:11 }}>
                    <Text style={{ color: (sangue.length == 0) ? "gray" : 'black' }}>
                        {(sangue.length == 0) ? "Selecione o seu tipo sanguíneo" : sangue}
                    </Text>
                    <Ionicons name="ios-arrow-down" size={24} color="gray"/>
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
                        <View style={{ backgroundColor: 'white', borderRadius: 5, height: 50, borderWidth: 0.5, borderColor: 'silver', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, color: 'black', marginLeft: 11 }}>{item}</Text>
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
    const data = getdata()
    const [marca, setmarca] = useState(data.marca)
    const [marcaselecionada, setmarcaselecionada] = useState(data.marca)
    const [moto, setmoto] = useState(data.moto)
    const [showmoto, setshowmoto] = useState(false)
    const [ano, setano] = useState(data.ano)
    const [image, setImage] = useState(null);
    const [imagefromDB, setimagefromDB] = useState(null)
    const [imagemlocal, setimagemlocal] = useState(false)

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (!result.cancelled) {
            setImage(result.uri);
            setimagemlocal(true)
        }
    };

    function getdata() {
        var user = firebase.auth().currentUser
        var data = {}
        firebase.database().ref('user/' + user.uid).on('value', snap => {
            data = snap.val()
        })
        var storage = firebase.storage().refFromURL("gs://lifweb-38828.appspot.com/user/" + user.uid + "/capa")
        storage.getDownloadURL().then(url => {
            setimagefromDB(url)
        }).catch(erro => {
            setimagefromDB(null)
        })
        var res = {
            moto: (data.modeloDaMoto.moto) ? data.modeloDaMoto.moto : data.modeloDaMoto,
            marca: (data.modeloDaMoto.marca) ? data.modeloDaMoto.marca : data.modeloDaMoto.split(" ")[0],
            ano: (data.modeloDaMoto.ano) ? data.modeloDaMoto.ano : ""
        }
        return res
    }

    function atualizaMoto() {
        var user = firebase.auth().currentUser
        var data = {
            marca: marcaselecionada,
            moto,
            ano
        }
        firebase.database().ref('user/' + user.uid + "/modeloDaMoto").update(data)
    }

    const atualizaCapa = async () => {
        const response = await fetch(image)
        const blob = await response.blob()
        var user = firebase.auth().currentUser
        var uploadTask = await firebase.storage().ref().child("user/" + user.uid + "/capa").put(blob)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED)
    }

    function atualiza() {
        if (moto.length > 0) {
            if (ano.length == 4) {
                atualizaMoto()
                if(imagemlocal){
                    if(image){
                        atualizaCapa()
                    }else{
                        if(!imagefromDB){
                            Alert.alert("Imagem inválida!", "Por favor selecione uma imagem para a capa!")
                        }
                    }
                }
            } else {
                Alert.alert("Ano inválido!", "Por favor, insira um ano válido!")
            }
        } else {
            Alert.alert("Selecione sua moto!", "Por favor, selecione uma dos modelos de motos da nossa base de dados!")
        }
    }

    function getMarca() {
        var motos = {};
        var marcas = {};
        firebase.database().ref('motos/').on('value', snapshot => {
            motos = snapshot.val()
        })
        if (marca.length > 2 && !(marca == marcaselecionada)) {
            var keys = Object.keys(motos)
            for (let i = 0; i < keys.length; i++) {
                marcas[motos[keys[i]]['marca']] = 1
            }
            keys = Object.keys(marcas)
            keys = keys.filter(item => {
                var r = new RegExp(marca.toUpperCase())
                return (r.test(item.toUpperCase()))
            })
            return keys.sort()
        } else {
            return []
        }
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

    function newHeight() {
        return (Dimensions.get('window').width - 40) * 3 / 4
    }

    function handleImage() {
        if (imagemlocal) {
            if (image) {
                return (
                    <Image source={{ uri: image }} style={{ width: Dimensions.get('window').width - 40, height: newHeight(), position: 'absolute', borderRadius: 5 }} />)
            } else {
                return (
                    <View />
                )
            }
        } else {
            if (imagefromDB) {
                return (
                    <Image source={{ uri: imagefromDB }} style={{ width: Dimensions.get('window').width - 40, height: newHeight(), position: 'absolute', borderRadius: 5 }} />)
            } else {
                return (
                    <View />
                )
            }
        }
    }

    return (
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <View style={{ height: (image||imagefromDB) ? newHeight() : 250, borderRadius: 5, backgroundColor: 'white', justifyContent: 'center' }}>
                {handleImage()}
                <View style={{ alignItems: 'center', opacity: 1 }} >
                    <Text style={{ fontSize: 20 }}>
                        {(image||imagefromDB) ? "" : "CAPA PERFIL"}
                    </Text>
                    <TouchableOpacity style={{ borderRadius: 5, backgroundColor: dorange, height: 50, width: 150, justifyContent: 'center', alignItems: 'center' }} onPress={pickImage}>
                        <Text style={{ color: 'white', fontSize: 15 }}>
                            {(image||imagefromDB) ? "Atualizar capa" : "Buscar"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
                MARCA MOTOCICLETA
            </Text>
            <MyTextInput placeholder='Digite a marca da motocicleta' onChangeText={text => { setmarca(text) }} value={marca} />
            <FlatList
                data={getMarca()}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        key={index}
                        onPress={() => { setmarca(item); setmarcaselecionada(item); }}
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
            <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 5, marginVertical: 20 }} onPress={() => { atualiza(); changeState(3) }}>
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
    const navigation = useNavigation()
    const dorange = colorStyles.dorange
    const data = getdata()
    const [profissao, setprofissao] = useState(data.profissao)
    const [profissaoselecionada, setprofissaoselecionada] = useState(data.profissao)
    const [clube, setclube] = useState("")
    const [showclube, setshowclube] = useState(false)
    const [image, setImage] = useState(null)
    const [imagefromDB, setimagefromDB] = useState(null)
    const [imagemlocal, setimagemlocal] = useState(false)

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true
        });
        if (!result.cancelled) {
            setImage(result.uri);
            setimagemlocal(true)
        }
    };

    const atualizaPerfil = async () => {
        const response = await fetch(image)
        const blob = await response.blob()
        var user = firebase.auth().currentUser
        var uploadTask = await firebase.storage().ref().child("user/" + user.uid + "/perfil").put(blob)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED)
    }

    function atualiza() {
        var user = firebase.auth().currentUser
        if (profissaoselecionada.length > 0) {
            if (image || imagefromDB) {
                firebase.database().ref("user/" + user.uid).update({ profissao: profissaoselecionada, clube: clube })
                if (imagemlocal) {
                    if (image) {
                        atualizaPerfil()
                    } else {
                        Alert.alert('Avatar Inválido!', "Por Favor, selecione um avatar!")
                    }
                }
            } else {
                Alert.alert('Avatar Inválido!', "Por Favor, selecione um avatar!")
            }
        } else {
            Alert.alert("Profissão Inválida!", 'Selecione uma profissão!')
        }
    }

    function getdata() {
        var user = firebase.auth().currentUser
        var data = {}
        firebase.database().ref('user/' + user.uid).on('value', snap => {
            data = snap.val()
        })
        var storage = firebase.storage().refFromURL("gs://lifweb-38828.appspot.com/user/" + user.uid + "/perfil")
        storage.getDownloadURL().then(url => {
            setimagefromDB(url)
        }).catch(erro => {
            setimagefromDB(null)
        })
        var res = {
            profissao: data.profissao,
            clube: null
        }
        return res
    }

    function getprofissao() {
        var profissoes = {}
        var lista = []
        firebase.database().ref('profissoes/').on('value', snapshot => {
            profissoes = snapshot.val()
        })
        if (profissao.length > 2 && !(profissao == profissaoselecionada)) {
            var keys = Object.keys(profissoes)
            keys = keys.filter(item => {
                var reg = new RegExp(profissao.toUpperCase())
                return reg.test(item.toUpperCase())
            })
            for (let i = 0; i < keys.length; i++) {
                lista.push(profissoes[keys[i]]['titulo'])
            }
            return lista.sort()
        } else {
            return []
        }
    }

    function handleImage() {
        if (imagemlocal) {
            if (image) {
                return (
                    <Image source={{ uri: image }} style={{ width: Dimensions.get('window').width - 40, height: Dimensions.get('window').width - 40, position: 'absolute', borderRadius: 5 }} />
                )
            } else {
                return (
                    <View />
                )
            }
        } else {
            if (imagefromDB) {
                return (
                    <Image source={{ uri: imagefromDB }} style={{ width: Dimensions.get('window').width - 40, height: Dimensions.get('window').width - 40, position: 'absolute', borderRadius: 5 }} />
                )
            } else {
                return (
                    <View />
                )
            }
        }
    }

    return (
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <View style={{ height: (image || imagefromDB) ? (Dimensions.get('window').width - 40) : 250, borderRadius: 5, backgroundColor: 'white' }}>
                <View style={{ height: (image || imagefromDB) ? (Dimensions.get('window').width - 40) : 250, borderRadius: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    {handleImage()}
                    <Text style={{ fontSize: 20 }}>
                        {(image || imagefromDB) ? "" : "AVATAR"}
                    </Text>
                    <TouchableOpacity style={{ borderRadius: 5, backgroundColor: dorange, height: 50, width: 150, justifyContent: 'center', alignItems: 'center' }} onPress={pickImage}>
                        <Text style={{ color: 'white', fontSize: 15 }}>
                            {(image || imagefromDB) ? "Trocar avatar" : "Buscar"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                    PROFISSÃO
            </Text>
                <MyTextInput placeholder="Digite a sua profissão" value={profissao} onChangeText={text => { setprofissao(text) }} />
                <FlatList
                    data={getprofissao()}
                    renderItem={({ item, index, separators }) => (
                        <TouchableHighlight
                            key={index}
                            onPress={() => { setprofissao(item); setprofissaoselecionada(item) }}
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
                <TouchableOpacity style={{ height: 50, borderRadius: 5, borderColor: 'silver', borderWidth: 1, backgroundColor: '#FFFFFF99', justifyContent:'center' }} onPress={() => { (showclube) ? setshowclube(false) : setshowclube(true) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:10 }}>
                        <Text style={{ color: (clube.length == 0) ? 'gray' : 'black' }}>
                            {(clube.length == 0) ? 'ESCOLHA UMA OPÇÃO' : clube}
                        </Text>
                        <Ionicons name="ios-arrow-down" size={24} color="gray"  />
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
                    <TouchableOpacity onPress={()=>{Linking.openURL('https://lifweb.com.br/solicitarcadastro/')}}>
                        <Text style={{ color: dorange, marginLeft: 3, fontSize: 15, fontWeight: 'bold' }}>
                            Solicitar a inclusão.
                    </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 5, marginVertical: 20 }} onPress={() => { atualiza(); navigation.navigate("Feed")}}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 15, padding: 15 }}>
                            ATUALIZAR
                    </Text>
                    </View>
                </TouchableOpacity>
            </View>
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

    function checkLoad() {
        var data = {}
        firebase.database().ref('user/' + firebase.auth().currentUser.uid).on('value', snap => {
            data = snap.val()
        })
        return data
    }

    if (part == 1) {
        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}>
                <ScrollView>
                    <Header />
                    {(!(Object.keys(checkLoad()).length == 0)) ? (<Part1 changeState={setpart} />) : (navigation.goBack())}
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
                    {(!(Object.keys(checkLoad()).length == 0)) ? (<Part2 changeState={setpart} />) : (navigation.goBack())}
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
                    {(!(Object.keys(checkLoad()).length == 0)) ? (<Part3 changeState={setpart} />) : (navigation.goBack())}
                </ScrollView>
            </KeyboardAwareScrollView>
        )
    }
}
