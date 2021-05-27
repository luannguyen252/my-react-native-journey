import * as types from './types';

import AsyncStorage from '@react-native-community/async-storage';

import ApiConstant, {Api} from '../../Utils/Api';

const setUser = (userState) => {
  return {
    userData: userState,
    type: types.GET_SIGNINAUTH,
  };
};

export const SignUpAuth = (Account) => {
  return async (dispatch) => {
    let formDataAccount = new FormData();

    formDataAccount.append('username', Account.username);
    formDataAccount.append('password', Account.password);

    let Request = await Api.post(false, ApiConstant.Register, formDataAccount);

    if (Request) {
      if (Request.response) {
        // Request made and server responded
        console.log(Request.response.data);
        console.log(Request.response.status);
        console.log(Request.response.headers);

        dispatch(
          setUser({
            Status: Request.response.status,
          }),
        );
      } else if (Request.status == 201) {
        let RequestToken = await Api.post(
          false,
          ApiConstant.TokenCreate,
          formDataAccount,
        );
        if (RequestToken.status == 200) {
          //store in asyncstorage
          storeData({
            userName: Account.username,
            refresh: RequestToken.data['refresh'],
            access: RequestToken.data['access'],
          });
          dispatch(
            setUser({
              userName: Account.username,
              Status: RequestToken.status,
            }),
          );
        } else {
          dispatch(
            setUser({
              Status: 408,
            }),
          );
        }
      } else {
        dispatch(
          setUser({
            Status: RequestToken.status,
          }),
        );
      }
    }
  };
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('com.dailymealz.userInfo', jsonValue);
    getData();
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('com.dailymealz.userInfo');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const SignInAuth = (Account) => {
  return async (dispatch) => {
    let formDataAccount = new FormData();

    formDataAccount.append('username', Account.username);
    formDataAccount.append('password', Account.password);

    let RequestToken = await Api.post(
      false,
      ApiConstant.TokenCreate,
      formDataAccount,
    );

    if (RequestToken) {
      if (RequestToken.response) {
        // Request made and server responded
        console.log(RequestToken.response.data);
        console.log(RequestToken.response.status);
        console.log(RequestToken.response.headers);

        dispatch(
          setUser({
            Status: RequestToken.response.status,
          }),
        );
      } else if (RequestToken.status == 200) {
        //store in asyncstorage
        // await removeValue();
        storeData({
          userName: Account.username,
          access: RequestToken.data['access'],
          refresh: RequestToken.data['refresh'],
        });
        dispatch(
          setUser({
            userName: Account.username,
            Status: RequestToken.status,
          }),
        );
      } else {
        dispatch(
          setUser({
            Status: 408,
          }),
        );
      }
    }
  };
};

export const Refresh = (Refresh) => {
  return async (dispatch) => {
    let myJson = JSON.stringify(Refresh);
    let RequestRefreshAccess = await Api.post(
      false,
      ApiConstant.Refresh,
      myJson,
    );

    if (RequestRefreshAccess) {
      if (RequestRefreshAccess.response) {
        // Request made and server responded
        console.log(RequestRefreshAccess.response.data);
        console.log(RequestRefreshAccess.response.status);
        console.log(RequestRefreshAccess.response.headers);

        dispatch(
          setUser({
            Status: RequestRefreshAccess.response.status,
          }),
        );
      } else if (RequestRefreshAccess.status == 200) {
        const mUser = await getData();
        // await removeValue();
        await storeData({
          userName: mUser.userName,
          refresh: mUser['refresh'],
          access: RequestRefreshAccess.data['access'],
        });

        dispatch(
          setUser({
            userName: mUser.userName,
            Status: RequestRefreshAccess.status,
          }),
        );
      } else {
        dispatch(
          setUser({
            Status: RequestRefreshAccess.status,
          }),
        );
      }
    }
  };
};
