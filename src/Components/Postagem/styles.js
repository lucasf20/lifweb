import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  containerFotoeNome: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    height: 60,
    width: 60,
    backgroundColor: "#ddd",
    borderWidth: 2,
    borderColor: "#f25c05",
    borderRadius: 30,
    marginHorizontal: 15,
  },

  headerNome: {
    fontSize: 16,
    fontWeight: "bold",
  },

  foto: {
    height: 250,
    width: "98%",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "#ddd",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footeravatar: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
    borderRadius: 25,
    backgroundColor: "#ddd",
  },

  containerIcons: {
    flexDirection: "row",
  },

  curtidas: {
    fontSize: 14,
  },

  legenda: {
    fontSize: 14,
  },

  containerComments: {
    marginHorizontal: 10,
  },

  titleComments: {
    color: "#999",
  },

  containerRepost: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  repostText: {
    fontSize: 16,
    paddingLeft: 8,
  },
});

export default styles;
