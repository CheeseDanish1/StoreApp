import React from "react";
import { Pressable, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

const Button = ({ title, onPress, color="#0d6efd" }) => {
  return (
    <Pressable
      style={{...styles.button, backgroundColor: color}}
      onPress={onPress}
      accessible={true}
      accessibilityLabel="Click me!"
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default Button;