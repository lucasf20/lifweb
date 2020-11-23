import * as Localization from 'expo-localization'
import i18n from 'i18n-js';
import React, { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { ScrollView, View, Text, Image, TouchableOpacity, Button, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';

import Header from "../../Components/Header";

import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';
import translate from '../../translate';

i18n.translations = translate

i18n.locale = Localization.locale;
i18n.fallbacks = true;

import Svg, {
    Image as SvgImage,
    Defs,
    ClipPath,
    Polygon,
} from 'react-native-svg';


export default function Feed() {

    const dorange = colorStyles.dorange
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome() {
        navigation.navigate('Login');
    }

    return (
        <View>
            <Header />
            <View style={{ padding: 15 }}>
                <EvilIcons name="search" size={30} color="black" style={{ position: "absolute", margin: 25 }} />
                <MyTextInput
                    placeholder= {i18n.t('search')} 
                    style={{ paddingLeft: 40 }}
                />
            </View>
            <ScrollView>
                <FlatList
                    data={[{key:0, apelido: "Lucas", lastMessage: "oi", dateTime: "Agora", profilePicture: Icon, read:false}]}
                    renderItem={({ item, index, separators }) => (
                        <TouchableOpacity
                            key={item.key}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}>
                            <View style={{ justifyContent:'space-between',flex: 1, flexDirection: "row", marginRight:20, marginLeft:5, marginVertical:3 }}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Svg style={styles.avatar} width="75" height="75" viewBox="0 0 50 50">
                                        <Defs>
                                            <ClipPath id="image" clipRule="evenodd">
                                                <Polygon points="0 10, 22.5 0, 45 10, 45 40, 22.5 50, 0 40" />
                                            </ClipPath>
                                        </Defs>
                                        <SvgImage
                                            x="0"
                                            y="0"
                                            width="50"
                                            height="50"
                                            href={item.profilePicture}
                                            clipPath="#image"
                                        />
                                    </Svg>
                                    <View style={{marginVertical:15}}>
                                        <Text style={{ fontWeight: (item.read)?'normal':'bold', fontSize:15 }}>
                                            {item.apelido}
                                        </Text>
                                        <Text style={{color:'gray', fontSize:15 }}>
                                            {item.lastMessage}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={{color:'gray', marginTop:35, fontSize:15 }}>
                                    {"• "+item.dateTime}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </View>
    );
}

