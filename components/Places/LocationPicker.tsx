import { Alert, StyleSheet, Text, View, Linking, Image } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import * as Location from "expo-location";
import { getAdress, getMapPreview } from "../../util/location";
import { useNavigation, useRoute } from "@react-navigation/native";

const LocationPicker = ({ onPickLocation }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [location, setLocation] = useState();
  const [status, setStatus] = useState("");

  const mapPickedLocation = route.params && route.params.pickedLocation;

  useEffect(() => {
    if (mapPickedLocation) {
      setLocation(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  useEffect(() => {
    async function getPermission() {
      const permission = await Location.getForegroundPermissionsAsync();
      setStatus(permission.status.toString());
    }

    getPermission();
  }, []);

  const mapInitialization = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setStatus(status);
  };

  //Opens settings and runs the mapinitialization() to update the latest state
  const locationAccessPrompt = () => {
    Linking.openSettings();
    mapInitialization();
  };

  async function verifyPermission() {
    if (status === Location.PermissionStatus.UNDETERMINED) {
      locationAccessPrompt();
      return true;
    }

    if (status === Location.PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant location persmission to use this app",
        [
          {
            text: "Cancel",
          },
          {
            text: "Open Settings",
            onPress: () => locationAccessPrompt(),
          },
        ]
      );
      return false;
    }
    return true;
  }

  async function locateUserHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  useEffect(() => {
    async function handleLocation() {
      if (location) {
        const address = await getAdress(location.lat, location.lng);
        console.log(address);
        onPickLocation({ ...location, address });
      }
    }

    handleLocation();
  }, [location, onPickLocation]);

  function pickOnMapHanlder() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picked yet.</Text>;

  if (location) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(location.lat, location.lng) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>

      <View style={styles.actions}>
        <OutlinedButton icon="location-outline" onPress={locateUserHandler}>
          Locate User
        </OutlinedButton>

        <OutlinedButton icon="map-outline" onPress={pickOnMapHanlder}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    marginVertical: 15,
    height: 250,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary200,
    borderRadius: 8,
    borderWidth: 2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
