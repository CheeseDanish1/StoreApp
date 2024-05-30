import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "white",
    marginBottom: 20,
    shadowRadius: 1,
    shadowOpacity: 0.1,
    width: (width - 70) / 3,
  },
  imageContainer: {
    padding: 10,
  },

  infoContainer: {
    padding: 10,
  },

  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    padding: 5,
  },
  price: {
    textAlign: "center",
    fontSize: 14,
    color: "gray",
  },
  quantity: {
    fontSize: 13,
    margin: 10,
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
});