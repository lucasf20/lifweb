import React, { Component } from 'react'
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native'
import colorStyles from './colors';

const LIGHT_GRAY = "#D3D3D3";
const dorange = colorStyles.dorange;

export class MyButton extends Component {
    static styles = StyleSheet.create({
        touchable: {
            backgroundColor: dorange, 
            height: 50, 
            borderRadius: 10
        },
        view:{
            alignItems: "center"
        },
        text:{
            color: "white",
            fontSize: 30, 
            fontWeight: "bold" 
        }
    });
    render() {
        return (
            <TouchableOpacity style={this.styles.touchable}>
                <View style={this.styles.view}>
                    <Text style={this.styles.text}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default MyButton
