import * as React from "react";
import {StyleSheet, TextInput} from "react-native";
import colorStyles from './colors';

const LIGHT_GRAY = "#D3D3D3";
const dorange = colorStyles.dorange;


class MyTextInput extends React.Component{

    
    state = {
        isFocused: false
    };

    handleFocus = event => {
        this.setState({isFocused: true});

        if(this.props.onFocus){
            this.props.onFocus(event);
        }
    };

    handleBlur = event => {
        this.setState({ isFocused: false});

        if(this.props.onBlur) {
            this.props.onBlur(event);
        }
    };

    render() {
        const {isFocused} = this.state;
        const{
            onFocus,
            autoCapitalize = 'sentences',
            type = 'default',
            secureTextEntry = false,
            onBlur,
            style = {},
            ...otherProps
        } = this.props;
        return(
            <TextInput
                placeholder="Email"
                placeholderTextColor='gray'
                selectionColor={dorange}
                underlineColorAndroid='transparent'
                autoCapitalize={autoCapitalize}
                keyboardType={type}
                secureTextEntry={secureTextEntry}
                onFocus = {this.handleFocus}
                onBlur= {this.handleBlur}
                style={{
                    ...styles.textInput,
                    ...style,
                }}
                {...otherProps}
            />

        );
    }
}
const styles = StyleSheet.create({
    textInput: {
        backgroundColor:'#FFFFFF99',
        borderRadius:5,
        paddingLeft:15,
        paddingRight:5,
        height: 50, 
        borderRadius: 5,
        borderWidth:1, 
        borderColor:"gray"
    }
});

export default MyTextInput;
