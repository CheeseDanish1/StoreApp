import React, { useContext } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { CartContext } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";
import Button from "../../components/Button/Button";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView accessible={true} accessibilityLabel="Page Cart">
      <ScrollView>
        <View style={styles.container}>

          {cart.length == 0 ? <Text>You have no items in your cart</Text> : cart?.map((cart) => (
            <View key={cart.id}>
              <CartItem item={cart} />
            </View>
          ))}
        </View>
        {cart.length != 0 && <Button title="Checkout" onPress={() => {navigation.navigate("Checkout")}} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;