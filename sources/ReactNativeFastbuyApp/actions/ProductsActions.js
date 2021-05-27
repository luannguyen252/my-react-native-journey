import { Alert } from 'react-native';
import { FirebaseService, GalleryService } from '../services';
import { PRODUCTS_DELETE, PRODUCTS_FETCH, PRODUCTS_FETCH_SUCCESS } from './types';
import i18n from '../i18n';

// Public

export const askForGalleryPermission = () => {
  return () => {
    GalleryService.requestDeviceAuthorizationIfNeeded()
      .then(() => {})
      .catch(() => {});
  };
};

export const productsDelete = ({ item }) => {
  return (dispatch) => {
    Alert.alert(
       i18n.t('app.deleteMessage'),
       item.name,
       [
         { text: i18n.t('app.yes'), onPress: () => onPressProductsDelete(dispatch, item.id) },
         { text: i18n.t('app.cancel'), style: 'cancel' }
       ],
       { cancelable: true }
     );
  };
};

export const productsFetch = () => {
  return (dispatch) => {
    dispatch({ type: PRODUCTS_FETCH });

    const unsubscribe = FirebaseService.productsCollection()
      .onSnapshot((querySnapshot) => {
        const products = [];

        querySnapshot.forEach((doc) => {
          const { imageUrl, name, price, color, size } = doc.data();
          products.push({ id: doc.id, imageUrl, name, price, color, size });
        });

        dispatch({
          type: PRODUCTS_FETCH_SUCCESS,
          payload: { products, unsubscribe }
        });
      });
  };
};

// Private

const onPressProductsDelete = (dispatch, id) => {
  FirebaseService.deleteProduct(id)
    .then(() => {
      dispatch({ type: PRODUCTS_DELETE });
    })
    .catch(() => {
      Alert.alert(
        i18n.t('app.attention'),
        i18n.t('app.deleteFailureMessage'),
        [{ text: i18n.t('app.ok') }],
        { cancelable: true }
      );
    });
};
