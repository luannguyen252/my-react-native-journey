import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CameraKitGallery, CameraKitGalleryView } from 'react-native-camera-kit';
import { productUpdate } from '../actions';
import colors from '../colors';

type Props = {};
class GalleryScreen extends Component<Props> {

  onTapImage(event) {
    Actions.loadingLightbox();
    CameraKitGallery.getImageForTapEvent(event.nativeEvent)
      .then((image) => {
        this.props.productUpdate({ prop: 'imageUrl', value: image.imageUri });
        Actions.pop(); // pop the lightbox
        Actions.pop(); // back to product screen
      });
  }

  render() {
    const { containerStyle } = styles;
    return (
      <CameraKitGalleryView
        style={containerStyle}
        minimumInteritemSpacing={1}
        minimumLineSpacing={1}
        columnCount={3}
        onTapImage={event => this.onTapImage(event)}
      />
    );
  }

}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 0
  }
});

export default connect(null, { productUpdate })(GalleryScreen);
