import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { PlaceModel } from "../entity/Place";

export default function AddPlace({ navigation }) {
  function createPlaceHandler(place: PlaceModel) {
    console.log(place);
    navigation.navigate("AllPlaces", {
      place,
    });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

const styles = StyleSheet.create({});
