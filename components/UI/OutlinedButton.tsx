import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const OutlinedButton = ({
  children,
  onPress,
  icon,
}: {
  onPress: () => void;
  children: React.ReactNode;
  icon: keyof typeof Ionicons.glyphMap;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons size={22} color={Colors.primary500} name={icon} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Colors.primary500,
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 5,
  },
  pressed: {
    opacity: 0.75,
  },
  icon: {},
  text: {
    color: Colors.primary500,
    fontWeight: "bold",
    fontSize: 15,
  },
});
