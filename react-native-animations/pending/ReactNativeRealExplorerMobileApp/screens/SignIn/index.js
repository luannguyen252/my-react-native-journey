import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import styles from './signInStyle';
import {
  handleScreenReplace,
  handleScreenBack,
  handleNestedReplace,
} from '../../navigators/NavigatorHandler';
import {getScreenParent} from '../../utils/navigationHelper';

export function SignIn({navigation}) {
  const [data, setData] = useState({isPasswordHidden: true});

  const handleTogglePwdVisibility = (isPasswordHidden) => {
    setData({...data, isPasswordHidden});
  };

  const handleSignIn = () => {
    handleNestedReplace(navigation, getScreenParent('Home'), 'Home');
  };

  return (
    <View style={styles.signInContainer}>
      <TouchableOpacity onPress={() => handleScreenBack(navigation)}>
        <View style={styles.backArrowWrapper}>
          <FontAwesome name="long-arrow-left" size={20} color="gray" />
        </View>
      </TouchableOpacity>
      <View style={styles.welcomeWrapper}>
        <Text style={styles.welcomeTextOne}>Welcome back</Text>
        <Text style={styles.welcomeTextTwo}>
          Sign in to continue working with {'\n'} your account
        </Text>
      </View>
      <View style={styles.controlsWrapper}>
        <Text>Email</Text>
        <TextInput placeholder="name@email.com" style={styles.emailInput} />
        <View style={styles.pwdWrapperOne}>
          <Text>Password</Text>
        </View>
        <View style={styles.pwdInputWrapper}>
          <TextInput
            placeholder="******"
            style={styles.pwdInput}
            secureTextEntry={data.isPasswordHidden}
          />
          {data.isPasswordHidden ? (
            <TouchableOpacity onPress={() => handleTogglePwdVisibility(false)}>
              <Feather name="eye-off" size={16} color="#ccc" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleTogglePwdVisibility(true)}>
              <Feather name="eye" size={16} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableWithoutFeedback onPress={() => handleSignIn()}>
          <LinearGradient
            colors={['#2B8DDC', '#3B7AE2']}
            style={styles.btnContinue}>
            <Text style={styles.continueText}>Continue</Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
        <Text style={styles.passwordText}>Forgot password?</Text>
      </View>
    </View>
  );
}
