import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, ScrollView, TextInput } from "react-native";
import ProductItem from "../../components/ProductItem/ProductItem";
import { styles } from "./style";
import {getStock} from '../../utils/getSpreadsheet'
import { CartContext } from "../../context/CartContext";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [filterRule, setFilterRule] = useState("");
  const { cart } = useContext(CartContext);

  useEffect(() => {
    console.log("Getting stock");
    getStock().then((final) => {
      setProducts(final);
    }).catch((err) => {
      console.log(err)
    })
  }, []);

  // Keep the item amount up to date
  useEffect(() => {
    if (products.length > 0) {
      setProducts(
        products.map(product => {
          return {...product, amount: cart.find(c => c.id == product.id)?.amount || 0 }
        })
      )
    }
  }, [cart])


  return (

    <SafeAreaView accessible={true} accessibilityLabel="Product Cart">
      <ScrollView>
        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <View style={{width: "80%"}}>
            <TextInput onChangeText={setFilterRule} style={{padding: "10px", marginTop: "10px",  backgroundColor: "#fff", fontSize: 18}} placeholder="Search..."></TextInput>
          </View>
        </View>
        <View style={styles.container}>
          {products.filter(product => product.name.toLowerCase().startsWith(filterRule.toLowerCase())).map((product, index) => (
            <View key={product.id}>
              <ProductItem product={product} key={product.id} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductsList;