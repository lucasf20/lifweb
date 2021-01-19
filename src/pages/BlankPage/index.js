import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { useNavigation, StackActions, useIsFocused } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default function BlankPage() {
    // const nav = useNavigation()

    // setInterval(() => {
    //     if(nav.isFocused()){
    //         nav.navigate('Feed2')
    //     }
    // }, 700);

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: Dimensions.get('window').height / 2 }}>
            <Feather name="loader" size={24} color='#F25C05' />
        </View>
    )
}