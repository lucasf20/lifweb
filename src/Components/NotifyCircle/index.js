import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function NotifyCircle({ text, color, style }) {
    return (
        <View style={style}>
            <FontAwesome name="circle" size={18} color={color}  />
            <Text style={{position:'absolute', color:'white', marginLeft:4, fontSize:12, fontWeight:'bold'}}>
                {text}
            </Text>
        </View>
    )
}