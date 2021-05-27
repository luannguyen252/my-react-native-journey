import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions';
import { INFO } from './constants';
import Modal from "react-native-modal";

class InfoModal extends Component {
  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>
      A whole bunch of text. A whole bunch of text. A whole bunch of text. 
      A whole bunch of text. A whole bunch of text. A whole bunch of text. 
      A whole bunch of text. A whole bunch of text. A whole bunch of text. 
      A whole bunch of text. A whole bunch of text. A whole bunch of text.  
      </Text>
      <Button
        title="Close"
        onPress={() => this.props.closeModal()}
        buttonStyle={{ backgroundColor: '#0288D1', marginTop: 24 }}
      />
    </View>
  );

  render() {
    return (
      <Modal
        isVisible={this.props.modal === INFO}
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

function mapStateToProps({ modal }) {
  return { modal };
}

export default connect(mapStateToProps, { closeModal, openModal })(InfoModal);
