import { CameraKitGallery } from 'react-native-camera-kit';

class GalleryService {

  static checkDeviceAuthorization() {
    return new Promise((resolve, reject) => {
      CameraKitGallery.checkDevicePhotosAuthorizationStatus()
        .then((isAuthorizedPrevious) => {
          if (isAuthorizedPrevious === 1 || isAuthorizedPrevious === true) {
            resolve();
          } else {
            reject(isAuthorizedPrevious);
          }
        })
        .catch(() => reject(0));
    });
  }

  static requestDeviceAuthorizationIfNeeded() {
    return new Promise((resolve, reject) => {
      this.checkDeviceAuthorization()
        .then(() => resolve())
        .catch(isAuthorizedPrevious => {
          if (isAuthorizedPrevious !== -1) {
            reject();
            return;
          }

          CameraKitGallery.requestDevicePhotosAuthorization()
            .then((isAuthorized) => {
              if (isAuthorized === 1 || isAuthorized === true) {
                resolve();
              } else {
                reject();
              }
            })
            .catch(() => reject());
        });
    });
  }

}

export { GalleryService };
