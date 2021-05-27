import { CameraKitCamera } from 'react-native-camera-kit';

class CameraService {

  static requestDeviceAuthorizationIfNeeded() {
    return new Promise((resolve, reject) => {
      CameraKitCamera.checkDeviceCameraAuthorizationStatus()
        .then((isAuthorizedPrevious) => {
          if (isAuthorizedPrevious === 1 || isAuthorizedPrevious === true) {
            resolve();
            return;
          }

          if (isAuthorizedPrevious !== -1) { // !=== not determined
            reject();
            return;
          }

          CameraKitCamera.requestDeviceCameraAuthorization()
            .then((isAuthorized) => {
              if (isAuthorized === 1 || isAuthorized === true) {
                resolve();
              } else {
                reject();
              }
            })
            .catch(() => reject());
        })
        .catch(() => reject());
    });
  }

}

export { CameraService };
