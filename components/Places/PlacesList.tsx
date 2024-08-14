import { Text, StyleSheet, View, FlatList } from "react-native";
import { PlaceModel } from "../../entity/Place";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

export default function PlacesList({ places }: { places: PlaceModel[] }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      keyExtractor={(item) => item.id}
      data={places}
      renderItem={({ item }) => <PlaceItem onSelect={() => {}} item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 22,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary500,
    textTransform: "uppercase",
    textAlign: "center",
  },
});
