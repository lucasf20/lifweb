import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import MyTextInput from '../../MyTextInput';
import Cambutton from '../../Components/Cambutton'

import Stories from "../../Components/Stories";

import HeaderSp from "../../Components/HeaderSp";
import StoriesList from "../../Components/Stories";
import Post from './Post'


import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

export default function Feed() {

    const dorange = colorStyles.dorange
    const navigation = useNavigation();
    const [firstAccess, setFirstAccess] = useState(false)

    //login required
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                navigation.navigate('Login')
            } else {
                firebase.database().ref('user/' + user.uid + '/firstAccess').on('value', snapshot => {
                    setFirstAccess(snapshot.val())
                })
                if (firstAccess) {
                    navigation.navigate('CreateAcc2')
                }
            }
        })
    })

    function navigateBack() {
        navigation.goBack();
    }

    function navigateHome() {
        navigation.navigate('Login');
    }

    const [refreshing, setRefreshing] = React.useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        navigation.dispatch(StackActions.pop(1))
        navigation.navigate('Feed')
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView>
            <HeaderSp />
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Stories />
                <Post />
            </ScrollView>
            <Cambutton />
        </SafeAreaView>
    );
}

