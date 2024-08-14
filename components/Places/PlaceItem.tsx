import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { PlaceModel } from "../../entity/Place";
import { Colors } from "../../constants/colors";

const PlaceItem = ({
  item,
  onSelect,
}: {
  item: PlaceModel;
  onSelect: () => void;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect}
    >
      <Image style={styles.image} source={{ uri: item.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.address}>{item.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: Colors.primary500,
    borderRadius: 6,
    borderWidth: 1,
    elevation: 2,
    shadowRadius: 6,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    height: 100,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  info: {
    flex: 2,
    padding: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
  },
});
