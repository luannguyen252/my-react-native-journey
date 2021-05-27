import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { closeModal, openModal, setData } from '../../actions';
import { SCHOOL_SELECT } from './constants';
import Modal from "react-native-modal";
import SchoolSelect from '../SchoolSelect';

class SchoolSelectModal extends Component {
  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  onSelectComplete = async value => {
    await AsyncStorage.setItem('school', value);
    this.props.setData(value, () => {
      this.props.closeModal();
    });
  }

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={{ fontSize: 16, textAlign: 'center' }}>Edit University</Text>
      <SchoolSelect
        value={this.props.schoolId}
        onSelectComplete={value => this.onSelectComplete(value)}
        buttonStyle={{ backgroundColor: '#0288D1', marginTop: 24 }}
      />
    </View>
  );

  render() {
    return (
      <Modal
        isVisible={this.props.modal === SCHOOL_SELECT}
        onBackdropPress={() => this.props.closeModal()}
      >
        {this.renderModalContent()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
});

function mapStateToProps({ data, modal }) {
  return { schoolId: data.schoolId, modal };
}

export default connect(mapStateToProps, { closeModal, openModal, setData })(SchoolSelectModal);