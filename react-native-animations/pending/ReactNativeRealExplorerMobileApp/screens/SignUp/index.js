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
import {Progress} from '../../assets/icons';
import styles from './signUpStyle';
import {ScrollView} from 'react-native-gesture-handler';

export function SignUp({navigation}) {
  const [data, setData] = useState({isPasswordHidden: true});

  const handleTogglePwdVisibility = (isPasswordHidden) => {
    setData({...data, isPasswordHidden});
  };

  const handleSignUp = () => {}

  return (
    <View style={styles.signUpContainer}>
      <View style={styles.signUpHeader}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <View style={styles.backArrowWrapper}>
            <FontAwesome name="long-arrow-left" size={20} color="gray" />
          </View>
        </TouchableOpacity>
        {/* <Progress style={styles.progress} /> */}
      </View>
      <ScrollView
        style={styles.signUpContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeWrapper}>
          <Text style={styles.welcomeTextOne}>Create account</Text>
        </View>
        <View style={styles.controlsWrapper}>
          <Text>First name</Text>
          <TextInput placeholder="John" style={styles.emailInput} />
          <Text>Last name</Text>
          <TextInput placeholder="Doe" style={styles.emailInput} />
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
              <TouchableOpacity
                onPress={() => handleTogglePwdVisibility(false)}>
                <Feather name="eye-off" size={16} color="#ccc" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleTogglePwdVisibility(true)}>
                <Feather name="eye" size={16} color="#ccc" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableWithoutFeedback onPress={() => handleSignUp()}>
            <LinearGradient
              colors={['#2B8DDC', '#3B7AE2']}
              style={styles.btnContinue}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              locations={[0.8, 0.9]}>
              <Text style={styles.continueText}>Send</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
}
