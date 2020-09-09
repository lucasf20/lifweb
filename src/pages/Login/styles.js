import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        justifyContent: 'space-between',
        paddingTop: Constants.statusBarHeight + 20,
    },

    Login: {
        alignItems: 'center',
    },

    Logo: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        width: 300,
        height: 400,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    incident: {
        padding:24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
        marginTop: 48,
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
        marginTop: 24,
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        color: '#737380',
    },

    TextBox: {
        //padding:24,
        height: 40, 
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
    },

    Title: {
        fontWeight:'bold',
        fontSize:20,
        color: '#13131a',
        lineHeight:30,
    },

    action: {
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight:'bold',
    },
});