import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Image,Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductsList from "../screens/Products/Products";
import Cart from "../screens/Cart/Cart";
import Icon from "../assets/cart-icon.png"
import Checkout from "../screens/Checkout/Checkout";

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
  const navigation = useNavigation();

  return (
    <Navigator>
      <Screen
        name="Products"
        component={ProductsList}
        options={{
          headerTitle: "Products",
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Cart")} style={{marginRight: 20}}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                }}
                source={Icon}
              />
            </Pressable>
          ),
        }}
      />
      <Screen name="Cart" component={Cart} />
      <Screen name="Checkout" component={Checkout} />
    </Navigator>
  );
}