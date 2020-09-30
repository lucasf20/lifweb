import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, TouchableOpacity, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import lifweb from '../../assets/logolifweb.png';

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';


export default function CreateAcc2() {

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [Name, setName] = useState('');
    const [data, setData] = useState('');
    const [moto, setMoto] = useState('');
    const [profissao, setProfissao] = useState('');


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

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        date = date + ""
        var data = date.split(" ")
        setData(data[2] + "-" + data[1] + "-" + data[3])
        hideDatePicker();
    };


    return (

        <ScrollView style={styles.container}>

            <View style={styles.header}>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} />
                </TouchableOpacity>

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
                placeholder='Modelo da moto'
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
                    <Text style={{ color: (data.length > 0) ? "black" : "gray", fontSize: 20 }}>
                        {(data.length > 0) ? data : "Toque aqui para selecionar sua data de nascimento"}
                    </Text>
                </View>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            <View style={styles.ButtonView}>
                {/* <Button
                    title="Finalizar"
                    color={dorange}
                /> */}
                <TouchableOpacity style={{ backgroundColor: dorange, height: 50, borderRadius: 10 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", padding:5 }}>
                            FINALIZAR
                    </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

