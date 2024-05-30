import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Text, View, Image } from "react-native";
import { styles } from "./style";
import Button from "../Button/Button";
import { useNavigation } from "@react-navigation/native";


const ProductItem = ({ product }) => {
  const { id, image, name, price, amount } = product;
  const { addItemCart, increaseItem, decreaseItem } = useContext(CartContext);
  const navigation = useNavigation();

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel="Product Item"
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={{display: "flex", justifyContent: 'space-between', flexDirection: "row", paddingLeft: "10px", paddingRight: "10px"}}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.price}>{`${price}`}</Text>
        </View>
        {amount >= 1 ?
          <View style={{display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: 'center', alignItems: "center"}}>
            <Button
              title="-"
              onPress={() => decreaseItem(product)} />
              <Text><Text style={{fontWeight: "1000", fontSize: 20}}>{amount}</Text> in cart</Text>
            <Button
            title="+"
            onPress={() => increaseItem(product)} />
          </View>
          :
          <Button
            title="+ Add to Cart"
            onPress={() => {
              addItemCart(product, id);
            }} />

        }
      </View>
    </View>
  );
};

export default ProductItem;