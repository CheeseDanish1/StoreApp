import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "white",
    shadowRadius: 1,
    shadowOpacity: 0.1,
    // width: (width - 35) / 2,
    width: (width - 70) / 3,
    marginBottom: "10px"
  },
  imageContainer: {
    padding: 10,
  },

  infoContainer: {
    padding: 10,
  },

  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    padding: 5,
  },
  price: {
    textAlign: "center",
    color: "gray",
    fontSize: 18
  },
});