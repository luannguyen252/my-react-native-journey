import React, {useState} from 'react';

import {View, Image} from 'react-native';

import Styles from './styles';

import {Tabs} from '../../Components';

import LogIn from './LogIn';

import SignUp from './SignUp';

import {Images} from '../../Assets';

const SignIn = (props) => {
  let [selectedTab, setSelectedTab] = useState(1);

  let [renderedComponent, setComponent] = useState(
    <LogIn props={props.navigation} />,
  );

  const changeTab = (index) => {
    if (index === 1) {
      setSelectedTab(index);
      setComponent(<LogIn props={props.navigation} />);
    } else {
      setSelectedTab(index);
      setComponent(<SignUp props={props.navigation} />);
    }
  };

  return (
    <View style={Styles.MainContainer}>
      <Image source={Images.Logo} style={Styles.Logo} />

      <View style={Styles.Container}>
        <Tabs
          tabs={['Log In', 'Sign Up']}
          selectedTab={selectedTab}
          onPressTab={changeTab}
          Tabs
        />
        {renderedComponent}
      </View>
    </View>
  );
};

export default SignIn;
