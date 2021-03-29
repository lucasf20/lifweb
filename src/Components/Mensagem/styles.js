import { StyleSheet, Platform } from "react-native";
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //flexDirection: 'row',
  },

  balao: {
    ...Platform.select({
      android:{
        flex: 1,
    minHeight: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 12,
    paddingVertical:10,
    paddingHorizontal:20,
    alignSelf: 'stretch',
    maxWidth: '82%',
    // left: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (Platform.OS == "iOS")?10:50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,

      },
      ios:{
        flex: 1,
        minHeight: 50,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 12,
        alignSelf: 'stretch',
        maxWidth: '85%',
        paddingVertical:10,
        paddingHorizontal:20,
        // left: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: (Platform.OS == "iOS")?10:30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,

      },
    })
    
  },

  time: {
      color: '#555',
      paddingHorizontal: 10,
      marginRight: 5
  },

  mensagem: {
      fontSize: 12,
      justifyContent:'center',
      alignItems:'center'
  }
});

export default styles;
