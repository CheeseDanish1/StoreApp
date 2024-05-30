import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Text, View, Image } from "react-native";
import Button from "../Button/Button";
import { styles } from "./style";

const CartItem = ({ item }) => {
  const { removeItemCart, increaseItem, decreaseItem } = useContext(CartContext);

  const { id, image, amount, name, price } = item;

  return (
    <View accessible={true} accessibilityLabel="Cart Item">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={{ display: "flex", justifyContent: 'space-between', flexDirection: "row", paddingLeft: "10px", paddingRight: "10px" }}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.price}>{`${price}`}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: 'center', alignItems: "center" }}>
            <Button
              title="-"
              onPress={() => decreaseItem(item)} />
            <Text><Text style={{ fontWeight: "1000", fontSize: 20 }}>{amount}</Text> in cart</Text>
            <Button
              title="+"
              onPress={() => increaseItem(item)} />
          </View>
          <Button color="#dc3545" title="Remove from cart" onPress={() => removeItemCart(id)}></Button>
        </View>
      </View>
    </View>
  );
};

export default CartItem;