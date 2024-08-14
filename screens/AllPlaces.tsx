import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { PlaceModel } from "../entity/Place";
import { useIsFocused } from "@react-navigation/native";

export default function AllPlaces({ route }) {
  const [places, setPlaces] = useState<PlaceModel[]>([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && route.params) {
      setPlaces((currPlaces) => [...currPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={places} />;
}

const styles = StyleSheet.create({});
