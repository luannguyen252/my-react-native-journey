import React, {useState, useReducer, useEffect, useCallback} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Styles from './styles';
import {Button, Input, LoadingModal, PopUp} from '../../../Components';
import {Colors} from '../../../Assets';
import {validateUserName, validatePassword} from '../../../Utils/stringUtils';
import {useSelector, useDispatch} from 'react-redux';
import * as Auth from '../../../Store/Actions/Auth';

const SignUp = (props) => {
  const dispatch = useDispatch();

  const UserInfo = useSelector((state) => state.Auth.UserInfo);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(false);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  let [secureTextIcon, setsecureTextIcon] = useState('eye-off-outline');

  let [secureText, setsecureText] = useState(true);

  const setUserProfile = (userState) => {
    return {
      userData: userState,
      type: 'GET_SIGNINAUTH',
    };
  };

  useEffect(() => {
    if (UserInfo.Status == 200) {
      IsLoadingModalVisible(false);
      dispatch(setUserProfile({...UserInfo, Status: 0}));
      props.props.replace('BottomTabNavigator');
    } else if (UserInfo.Status == 408) {
      IsLoadingModalVisible(false);
      setMessagePopUp('No internet Connection');
      setVisiabiltyPopUp(true);
      dispatch(setUserProfile({Status: 0}));
    } else if (UserInfo.Status == 400) {
      dispatch(setUserProfile({Status: 0}));
      IsLoadingModalVisible(false);
      setMessagePopUp('User already Exist');
      setVisiabiltyPopUp(true);
    } else {
      IsLoadingModalVisible(false);
    }
  }, [UserInfo]);

  const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

  const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      return {
        Account: {
          ...state.Account,
          [action.Input]: action.Value,
        },
      };
    }
    return state;
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    Account: {
      userName: '',
      Password: '',
      ErrorUserName: false,
      ErrorPassword: false,
    },
  });

  const ChangeState = (data) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      Value: data.value,
      Input: data.input,
    });
  };

  const OnChangeUserName = (text) => {
    ChangeState({
      value: text.trim(),
      input: 'userName',
    });
    if (!validateUserName(text)) {
      ChangeState({
        value: true,
        input: 'ErrorUserName',
      });
    } else {
      ChangeState({
        value: false,
        input: 'ErrorUserName',
      });
    }
  };

  const OnChangePassword = (text) => {
    if (formState.Account.ErrorPassword) {
      ChangeState({
        value: false,
        input: 'ErrorPassword',
      });
    }
    ChangeState({
      value: text.trim(),
      input: 'Password',
    });
  };

  const OnSignUp = () => {
    if (!validatePassword(formState.Account.Password)) {
      //accept ar least 6 char Mixed char and num of CAPTIAL AND Small char
      ChangeState({
        value: true,
        input: 'ErrorPassword',
      });
    } else if (formState.Account.ErrorUserName) {
    } else {
      ChangeState({
        value: false,
        input: 'ErrorPassword',
      });
      IsLoadingModalVisible(true);
      dispatch(
        Auth.SignUpAuth({
          username: formState.Account.userName.toLowerCase(),
          password: formState.Account.Password,
        }),
      );
    }
  };

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  return (
    <View style={Styles.MainContainer}>
      <ScrollView style={{flex: 1}}>
        <View style={{marginTop: 40}}>
          <Text style={Styles.txtUserName}>Username</Text>
          <Input
            PlaceHolder={'Create your username'}
            onChangeText={(text) => OnChangeUserName(text)}
            maxLength={150}
            InputStyle={Styles.InputStyle}
            ErrorTitle={'In-valid Username'}
            Error={formState.Account.ErrorUserName}
          />
        </View>

        <View style={{marginTop: 51}}>
          <Text style={Styles.txtUserName}>Password</Text>
          <Input
            Error={formState.Account.ErrorPassword}
            ErrorTitle={'In-valid Password'}
            secureTextEntry={secureText}
            maxLength={128}
            PlaceHolder={'Create your password'}
            onChangeText={(text) => OnChangePassword(text)}
            InputStyle={[Styles.InputStyle]}
            IconName={secureTextIcon}
            IconLeftColor={Colors.SecondRelativeMainColor}
            changeIcon={() => {
              setsecureText(!secureText);
              if (secureText) {
                setsecureTextIcon('eye-outline');
              } else {
                setsecureTextIcon('eye-off-outline');
              }
            }}
          />
        </View>
        <Button
          title={'Sign Up'}
          Customstyle={Styles.LoginBtn}
          onPress={OnSignUp}
        />
        <PopUp
          visible={PopupModel}
          message={MessagePopUp}
          LeftBtnName={'OK'}
          LeftBtnFunction={PopupactionFunction}
        />
      </ScrollView>
      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default SignUp;
