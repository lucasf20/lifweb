import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "98%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop:10
  },

  /* avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: '#ccc',
    marginHorizontal: 20,
  }, */

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
    fontSize: 16,
    color: "#999",
  },

  time: {
    fontSize: 16,
    color: "#777",
    marginHorizontal: 10,
  },

  containerInfos: {
    flexDirection: "row",
  },

  containerFotoMensagem: {
    flexDirection: "row",
    alignItems: "center",
  },

  containerHoraIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default styles;
