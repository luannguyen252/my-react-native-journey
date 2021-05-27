import React, { Component } from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { addPhoto, productClean, productDelete, productSave, productUpdate } from '../actions';
import { Button, KeyboardView, ImageButton, InputMoney, InputText } from '../components';
import colors from '../colors';
import i18n from '../i18n';
import imgAppAddPhoto from '../../assets/images/app-add-photo.png';
import imgPlaceholder from '../../assets/images/image-placeholder.png';

type Props = {};
class ProductScreen extends Component<Props> {

  componentWillMount() {
    this.props.productClean();

    const { product } = this.props;
    if (product) {
      Object.keys(product).forEach((prop) => {
        const value = product[prop];
        this.props.productUpdate({ prop, value });
      });
    }
  }

  onPressDelete() {
    const { id, name } = this.props;
    this.props.productDelete({ id, name });
  }

  onPressSave() {
    const { id, imageUrl, name, price, color, size } = this.props;
    this.props.productSave({ id, imageUrl, name, price, color, size });
  }

  enableSaveButton() {
    const { name, price, color, size } = this.props;

    if (name === null || name.length === 0) return false;
    if (price === null || price.length === 0) return false;
    if (color === null || color.length === 0) return false;
    if (size === null || size.length === 0) return false;

    return true;
  }

  renderDelete() {
    return (
      <Button
        backgroundColor={colors.transparent}
        textColor={colors.purple}
        title={i18n.t('product.form.delete')}
        onPress={this.onPressDelete.bind(this)}
      />
    );
  }

  render() {
    const {
      containerStyle,
      backgroundImageStyle,
      imageButtonStyle,
      formStyle,
      subFormStyle,
      inputStyle,
      spaceViewStyle
    } = styles;

    return (
      <KeyboardView style={containerStyle}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <ImageBackground
            style={backgroundImageStyle}
            source={this.props.imageUrl ? { uri: this.props.imageUrl } : null}
            defaultSource={imgPlaceholder}
          >
            <ImageButton
              style={imageButtonStyle}
              size={60}
              source={imgAppAddPhoto}
              onPress={() => this.props.addPhoto()}
            />
          </ImageBackground>

          <View style={formStyle}>
            <InputText
              style={inputStyle}
              title={i18n.t('product.form.product_name')}
              value={this.props.name}
              onChangeText={value => this.props.productUpdate({ prop: 'name', value })}
            />

            <InputMoney
              style={inputStyle}
              title={i18n.t('product.form.price')}
              value={this.props.price}
              onChangeText={value => this.props.productUpdate({ prop: 'price', value })}
            />

            <View style={subFormStyle}>
              <InputText
                style={inputStyle}
                title={i18n.t('product.form.color')}
                value={this.props.color}
                onChangeText={value => this.props.productUpdate({ prop: 'color', value })}
              />

              <View style={spaceViewStyle} />

              <InputText
                style={inputStyle}
                title={i18n.t('product.form.size')}
                value={this.props.size}
                onChangeText={text => this.props.productUpdate({ prop: 'size', value: text })}
              />
            </View>

            <Button
              backgroundColor={colors.purple}
              textColor={colors.white}
              title={i18n.t('product.form.save')}
              enable={this.enableSaveButton()}
              onPress={this.onPressSave.bind(this)}
            />

            {this.props.id ? this.renderDelete() : null}
          </View>
        </ScrollView>
      </KeyboardView>
    );
  }

}

const margin = 14;
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },

  backgroundImageStyle: {
    backgroundColor: colors.grayUltraLight,
    height: width,
    width
  },
  imageButtonStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },

  formStyle: {
    margin,
  },
  subFormStyle: {
    flexDirection: 'row',
    marginBottom: margin
  },
  inputStyle: {
    flex: 1,
  },
  spaceViewStyle: {
    margin: margin / 2
  }
});

const mapStateToProps = (state) => {
  const { id, imageUrl, name, price, color, size } = state.product;
  return { id, imageUrl, name, price, color, size };
};

export default connect(mapStateToProps, {
  addPhoto, productClean, productDelete, productSave, productUpdate
})(ProductScreen);
