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
        const{onFocus, onBlur, ...otherProps} = this.props;
        return(
            <TextInput
                placeholder="Email"
                placeholderTextColor='gray'
                selectionColor={dorange}
                underlineColorAndroid={
                    isFocused ? dorange : LIGHT_GRAY
                }

                onFocus = {this.handleFocus}
                onBlur= {this.handleBlur}
                style={styles.textInput}
                {...otherProps}
            />

        );
    }
}
const styles = StyleSheet.create({
    textInput: {
        backgroundColor:'#FFFFFF99',
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5,
        height: 50, 
        borderRadius: 10,
        borderWidth:1, 
        borderColor:"gray"
    }
});

export default MyTextInput;