import React, { Component } from 'react';
import { StyleSheet, StatusBar, Platform, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CameraKitCameraScreen } from 'react-native-camera-kit';
import { productUpdate } from '../actions';
import i18n from '../i18n';
import colors from '../colors';
import imgCameraCapture from '../../assets/images/camera-capture.png';
import imgCameraFlashAuto from '../../assets/images/camera-flash-auto.png';
import imgCameraFlashOff from '../../assets/images/camera-flash-off.png';
import imgCameraFlashOn from '../../assets/images/camera-flash-on.png';
import imgCameraFlip from '../../assets/images/camera-flip.png';

type Props = {};
class CameraScreen extends Component<Props> {

  onButtonPressed(event) {
    if (event.type === 'left') {
      Actions.pop();
      return;
    }

    if (event.type === 'right') {
      return;
    }

    Actions.loadingLightbox();

    const image = event.captureImages[0];
    const value = (Platform.OS === 'ios') ? image.uri : `file://${image.uri}`;
    this.props.productUpdate({ prop: 'imageUrl', value });

    Actions.pop(); // pop the lightbox
    Actions.pop(); // back to product screen
  }

  render() {
    const { containerStyle } = styles;
    return (
      <View style={containerStyle}>
        <StatusBar barStyle='light-content' backgroundColor={colors.purple} />
        <CameraKitCameraScreen
          actions={{
            rightButtonText: i18n.t('app.done'),
            leftButtonText: i18n.t('app.cancel')
          }}
          flashImages={{
            auto: imgCameraFlashAuto,
            off: imgCameraFlashOff,
            on: imgCameraFlashOn
          }}
          cameraFlipImage={imgCameraFlip}
          captureButtonImage={imgCameraCapture}
          onBottomButtonPressed={(event) => this.onButtonPressed(event)}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.black
  }
});

export default connect(null, { productUpdate })(CameraScreen);
