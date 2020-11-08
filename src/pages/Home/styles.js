import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },

  button: {
      height: 50,
      width: 200,
      backgroundColor: '#777',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10
  },

  buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff'
  }
});

export default styles;
