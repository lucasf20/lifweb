import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerBuscador: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
},

  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
      fontWeight: 'bold',
      fontSize: 16,
      marginHorizontal: 20,
      paddingVertical: 10,
  },

  buttonNewMessage: {
    margin: 15
  },
});

export default styles;
