import { LocationModel } from "./Location";

export class PlaceModel {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  location: LocationModel;

  constructor(title: string, imageUri: string, location: LocationModel) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng };
    this.id = new Date().toString() + Math.random().toString();
  }
}
