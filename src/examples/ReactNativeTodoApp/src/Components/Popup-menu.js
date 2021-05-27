import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {Colors} from '../Assets';
import Modal, {
  ModalButton,
  ModalFooter,
  ScaleAnimation,
} from 'react-native-modals';

const PopUp = React.memo(
  ({
    visible,
    topIcon,
    message,
    LeftBtnName,
    RightBtnName,
    RightBtnFunction,
    LeftBtnFunction,
  }) => {
    return (
      <Modal
        visible={visible}
        modalStyle={Styles.modalStyle}
        modalAnimation={
          new ScaleAnimation({
            initialValue: 1, // optional
            useNativeDriver: true, // optional
          })
        }
        modalTitle={
          <View style={Styles.modalTitleContianer}>
            {topIcon && (
              <View style={Styles.ContainerImg}>
                <Image source={topIcon} style={Styles.ImageWarning} />
              </View>
            )}
            <View style={Styles.ContainerText}>
              <Text style={Styles.Message}>{message}</Text>
            </View>
          </View>
        }
        footer={
          <ModalFooter style={Styles.ModalFooter}>
            {LeftBtnName ? (
              <ModalButton
                text={LeftBtnName}
                onPress={LeftBtnFunction}
                textStyle={{color: Colors.Black}}
              />
            ) : (
              <View />
            )}
            {RightBtnName ? (
              <ModalButton
                textStyle={{color: Colors.MainColor}}
                text={RightBtnName}
                onPress={RightBtnFunction}
              />
            ) : (
              <View />
            )}
          </ModalFooter>
        }>
        <View />
      </Modal>
    );
  },
);
const Styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: 'transparent',
    borderRadius: 16.7,
  },
  modalTitleContianer: {
    backgroundColor: '#FFF',
    position: 'relative',
    justifyContent: 'center',
    marginTop: 35,
    borderTopRightRadius: 16.7,
    borderTopLeftRadius: 16.7,
    display: 'flex',
    alignSelf: 'center',
  },
  ImageWarning: {
    width: 95,
    height: 95,
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: '-15%',
    right: '10%',
    alignContent: 'center',
    alignSelf: 'center',
    zIndex: 5,
  },
  ContainerText: {
    backgroundColor: 'transparent',
    padding: 22,
    zIndex: 0,
    width: '100%',
  },
  ContainerImg: {padding: 16, borderRadius: 10},
  ModalFooter: {backgroundColor: '#fff'},
  Message: {
    width: 200,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export {PopUp};
