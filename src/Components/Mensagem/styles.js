import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //flexDirection: 'row',
  },

  balao: {
    flex: 1,
    minHeight: 55,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  time: {
      color: '#555',
      paddingHorizontal: 10
  },

  mensagem: {
      fontSize: 16
  }
});

export default styles;
