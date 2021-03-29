import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "98%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop:10,
    
  },

  avatar: {
    marginLeft: 13,
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 8,
  },

  name: {
    fontSize: 16,
    color: "#262626",
  },

  preview: {

    fontSize: 14,
    color: "#999",
    ...Platform.select(
      {
        android:{
          width: 135
        },
        ios:{
          width: 160
        }
      }
    )
  },

  time: {
    fontSize: 15,
    color: "#777",
    marginHorizontal: 10,
    paddingEnd: 20,
    
  },

  containerInfos: {
    flexDirection: "row",
     },

  containerFotoMensagem: {
    flexDirection: "row",
    alignItems: "center",
    
  },

  containerHoraIcon: {
    ...Platform.select({
      android:{
        width: "34%" 
      },
      ios:{
        width: "40%" 
      }

    }),
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    
    
  },
});

export default styles;
