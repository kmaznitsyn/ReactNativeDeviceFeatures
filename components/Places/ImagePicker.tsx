import { Button, StyleSheet, Image, View, Alert, Text } from "react-native";
import React, { useState } from "react";
import * as ExpoImagePicker from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = ({ onImageTaken }) => {
  const [status, requestPermission] = ExpoImagePicker.useCameraPermissions();
  const [image, setImage] = useState("");

  async function verifyPermission() {
    if (status?.status === ExpoImagePicker.PermissionStatus.UNDETERMINED) {
      const permissionRespone = await requestPermission();
      return permissionRespone.granted;
    }

    if (status?.status === ExpoImagePicker.PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera persmission to use this app"
      );
      return false;
    }
    return true;
  }

  const pickImageHanlder = async () => {
    const isPermission = await !verifyPermission();
    if (isPermission) {
      return;
    }

    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageTaken(result.assets[0].uri);
    }
  };

  let ImagePreview = <Text>No Image preview</Text>;

  if (image) {
    ImagePreview = <Image source={{ uri: image }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imageContainer}>{ImagePreview}</View>
      <OutlinedButton icon="image-outline" onPress={pickImageHanlder}>
        Pick an Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: 15,
    height: 250,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary200,
    borderRadius: 8,
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
