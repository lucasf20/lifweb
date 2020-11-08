import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  title: {
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 5,
      color: '#555',
      fontWeight: 'bold',
  },

  containerInfos: {
    backgroundColor: '#f25c05',
    minHeight: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: '#ddd',
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginTop: -55
  },

  nome: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  },

  description: {
    fontSize: 13,
    color: '#fff'
  },

  containerMessages: {
      flex: 1,
  },

  containerInput: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#e4e4e4',
    height: 88,
  },

  containerInput2: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 40,
    width: '90%',
    borderRadius: 32
  },

  input: {
      flex: 1,
      height: '100%',
      backgroundColor: '#fff',
      marginLeft: 10,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 10,
      fontSize: 16,
  },

  sendButton: {
      height: '100%',
      width: 60,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      borderRadius: 30,
  },
});

export default styles;
