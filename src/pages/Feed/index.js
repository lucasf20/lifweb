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
import BlankPage from '../BlankPage'


import styles from './styles';

import colorStyles from "../../colors";

import firebase from '../../../firebaseConfig';

export default function Feed({ navigation, route }) {

    const dorange = colorStyles.dorange
    const nav = useNavigation();
    const [firstAccess, setFirstAccess] = useState(false)
    const [stopReload, setStopReload] = useState(true)

    //login required
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                nav.navigate('Login')
            } else {
                firebase.database().ref('user/' + user.uid + '/firstAccess').on('value', snapshot => {
                    setFirstAccess(snapshot.val())
                })
                if (firstAccess) {
                    nav.navigate('CreateAcc2')
                }
            }
        })
    })

    function navigateBack() {
        nav.goBack();
    }

    function navigateHome() {
        nav.navigate('Login');
    }

    const [refreshing, setRefreshing] = React.useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

    const onRefresh = React.useCallback(() => {
        // const navigationRef = React.useRef(null);
        // const route = navigationRef.current?.getCurrentRoute();
        setRefreshing(true);
        nav.dispatch(StackActions.popToTop())
        nav.navigate('Feed')
        //nav.dispatch(StackActions.pop(1))
        // (route == 'Feed2')?nav.navigate('FeedReload'):nav.navigate('Feed2')
        wait(500).then(() => setRefreshing(false));
    }, []);

    if(route.params.reload && stopReload){
        setStopReload(false)
        onRefresh()
    }

    if(!refreshing){
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
    }else{
        return (
            <BlankPage></BlankPage>
        );
    }
}

