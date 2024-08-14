import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { PlaceModel } from "../../entity/Place";

const PlaceForm = ({ onCreatePlace }) => {
  const [title, setTitle] = useState<string>("");
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState<string>("");

  function changeTitleHandler(enteredText: string) {
    setTitle(enteredText);
  }

  const imageTakenHandler = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    console.log(title);
    console.log(pickedLocation);
    console.log(selectedImage);
    const placeData = new PlaceModel(title, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.title}
          onChangeText={changeTitleHandler}
          value={title}
        />
      </View>

      <ImagePicker onImageTaken={imageTakenHandler} />

      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
    fontSize: 15,
  },
  title: {
    backgroundColor: Colors.primary200,
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary700,
    marginVertical: 3,
  },
});
