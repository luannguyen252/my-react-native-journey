import md5 from 'md5';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';

class FirebaseService {

  static async signIn(idToken, accessToken) {
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    return await firebase.auth().signInWithCredential(credential);
  }

  static async signOut() {
    return await firebase.auth().signOut();
  }

  static addProduct(imageUrl, name, price, color, size) {
    return this.productsCollection().add({ imageUrl, name, price, color, size });
  }

  static setProduct(id, imageUrl, name, price, color, size) {
    return this.productsCollection().doc(id).set({ imageUrl, name, price, color, size });
  }

  static deleteProduct(id) {
    return this.productsCollection().doc(id).delete();
  }

  static productsCollection() {
    return firebase.firestore().collection('products');
  }

  static uploadImage(path) {
    const id = imageId();
    const metadata = { cacheControl: 'public,max-age=604800', contentType: 'image/jpeg' };
    return firebase.storage().ref(`/products/images/${id}.jpg`).putFile(path, metadata);
  }

}

// used only to generate a unique id
// ideally, the server would generate this unique id
function imageId() {
  const uniqueID = DeviceInfo.getUniqueID();
  const date = Date.parse(Date());
  return md5(`${uniqueID}-${date}`);
}

export { FirebaseService };
