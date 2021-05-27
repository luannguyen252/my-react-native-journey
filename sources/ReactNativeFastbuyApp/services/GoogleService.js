import { GoogleSignin, statusCodes } from 'react-native-google-signin';

class GoogleService {

  static configure() {
    GoogleSignin.configure();
  }

  static signIn() {
    return new Promise((resolve, reject) => {
      GoogleSignin.hasPlayServices()
        .then(() => {
          GoogleSignin.signIn()
            .then(userInfo => { resolve(userInfo); })
            .catch(error => {
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                reject();
              } else {
                reject(error);
              }
            });
        })
        .catch(error => { reject(error); });
    });
  }

  static signInSilentlyIfNeeded() {
    return GoogleSignin.signInSilently();
  }

  static async signOut() {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  }

}

export { GoogleService };
