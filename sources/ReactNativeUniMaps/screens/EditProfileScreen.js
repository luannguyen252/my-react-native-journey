import React, { Component } from 'react';
import { View, Text, Platform, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
//import SchoolPicker from '../components/SchoolPicker';

class EditProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Edit Profile',
      headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    }
  }

  state = { school: null }

  componentDidMount() {
    this.setState({ school: this.props.schoolId })
  }

  onValueChange = school => {
    this.setState({ school });
  }

  onSelectComplete = async () => {
    await AsyncStorage.setItem('school', this.state.school);
    this.props.setData(this.state.school, () => {
      this.props.navigation.dispatch(StackActions.popToTop());
      this.props.navigation.navigate('home');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Select Your School</Text>
        <SchoolPicker 
          pickerValue={this.state.school}
          onValueChange={this.onValueChange}
          onSelectComplete={this.onSelectComplete}
          buttonText="Save"
        />
      </View>
    )
  }
}

const offset = 24;
const styles = {
  text: {
    textAlign: 'center',
    fontSize: offset
  },
  container: {
    marginTop: offset * 2,
  }
}

function mapStateToProps({ data }) {
  return { schoolId: data.schoolId }
}

export default connect(mapStateToProps, actions)(EditProfileScreen);