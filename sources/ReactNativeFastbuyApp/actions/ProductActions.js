import { ActionSheetIOS, Alert, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CameraService, FirebaseService, GalleryService } from '../services';
import { PRODUCT_CLEAN, PRODUCT_DELETE, PRODUCT_SAVE, PRODUCT_UPDATE } from './types';
import i18n from '../i18n';

// Public

export const addPhoto = () => {
  return () => {
    const optionText = i18n.t('product.addPhoto.option');
    const takePictureAction = i18n.t('product.addPhoto.takePicture');
    const photoLibraryAction = i18n.t('product.addPhoto.photoLibrary');

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        optionText,
        options: ['Cancel', takePictureAction, photoLibraryAction],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          onOpenCamera();
        } else if (buttonIndex === 2) {
          onOpenGallery();
        }
      });
    } else {
      Alert.alert(
         null, optionText,
         [
           { text: takePictureAction, onPress: () => onOpenCamera() },
           { text: photoLibraryAction, onPress: () => onOpenGallery() }
         ],
         { cancelable: true }
       );
    }
  };
};

export const productClean = () => {
    return {
      type: PRODUCT_CLEAN
    };
};

export const productDelete = ({ id, name }) => {
  return (dispatch) => {
    Alert.alert(
       i18n.t('app.deleteMessage'),
       name,
       [
         { text: i18n.t('app.yes'), onPress: () => onPressProductDelete(dispatch, id) },
         { text: i18n.t('app.cancel'), style: 'cancel' }
       ],
       { cancelable: true }
     );
  };
};

export const productUpdate = ({ prop, value }) => {
    return {
      type: PRODUCT_UPDATE,
      payload: { prop, value }
    };
};

export const productSave = ({ id = null, imageUrl, name, price, color, size }) => {
  return (dispatch) => {
    if (!imageUrl.startsWith('file://')) {
      productSaveWithImage(dispatch, { id, imageUrl, name, price, color, size });
      return;
    }

    Actions.loadingLightbox();
    FirebaseService.uploadImage(imageUrl)
      .then(uploadedFile => {
        Actions.pop();
        const url = uploadedFile.downloadURL;
        productSaveWithImage(dispatch, { id, imageUrl: url, name, price, color, size });
      })
      .catch(() => {
        Actions.pop();
        Alert.alert(
          i18n.t('app.attention'),
          i18n.t('product.save.failureMessage'),
          [{ text: i18n.t('app.ok') }],
          { cancelable: true }
        );
      });
  };
};

// Private

const onOpenCamera = () => {
  GalleryService.checkDeviceAuthorization()
    .then(() => {
      CameraService.requestDeviceAuthorizationIfNeeded()
        .then(() => Actions.cameraModal())
        .catch(() => showNoPermissionAlert());
    })
    .catch(() => showNoPermissionAlert());
};

const onOpenGallery = () => {
  GalleryService.checkDeviceAuthorization()
    .then(() => Actions.galleryModal())
    .catch(() => showNoPermissionAlert());
};

const onPressProductDelete = (dispatch, id) => {
  Actions.loadingLightbox();

  FirebaseService.deleteProduct(id)
    .then(() => {
      dispatch({ type: PRODUCT_DELETE });
      Actions.pop(); // pop the lightbox
      Actions.pop(); // back to products list
    })
    .catch(() => {
      Actions.pop();

      Alert.alert(
        i18n.t('app.attention'),
        i18n.t('app.deleteFailureMessage'),
        [{ text: i18n.t('app.ok') }],
        { cancelable: true }
      );
    });
};

const productSaveWithImage = (dispatch, { id = null, imageUrl, name, price, color, size }) => {
  let result;

  if (id === null) {
    result = FirebaseService.addProduct(imageUrl, name, price, color, size);
  } else {
    result = FirebaseService.setProduct(id, imageUrl, name, price, color, size);
  }

  result
    .then(() => {
      dispatch({ type: PRODUCT_SAVE });
      Actions.pop(); // pop the lightbox
      Actions.pop(); // back to products list
    })
    .catch(() => {
      Alert.alert(
        i18n.t('app.attention'),
        i18n.t('product.save.failureMessage'),
        [{ text: i18n.t('app.ok') }],
        { cancelable: true }
      );
    });
};

function showNoPermissionAlert() {
  Alert.alert(
    i18n.t('app.permissions.titleFailure'),
    i18n.t('app.permissions.cameraGalleryFailureMessage'),
    [{ text: i18n.t('app.ok') }],
    { cancelable: true }
  );
}
