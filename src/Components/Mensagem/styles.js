import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //flexDirection: 'row',
  },

  balao: {
    flex: 1,
    minHeight: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 12,
    paddingVertical: 10,
    width: 270,
    left: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  time: {
      color: '#555',
      paddingHorizontal: 10,
      marginRight: 5
  },

  mensagem: {
      fontSize: 12,
      paddingHorizontal: 20
  }
});

export default styles;
