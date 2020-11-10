import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerLegenda: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  containerComments: {
    flex: 1,
    marginHorizontal: 15,
  },

  comentario: {
    fontSize: 14,
  },

  avatar: {
    height: 44,
    width: 44,
    borderRadius: 44 / 2,
    marginHorizontal: 15,
    backgroundColor: "#ddd",
  },

  containerInput: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#e4e4e4",
  },

  containerInput2: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 1,
    marginVertical: 24,
    width: "90%",
    borderRadius: 32,
  },

  input: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    marginLeft: 10,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
  },

  sendButton: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 30,
  },
});

export default styles;
