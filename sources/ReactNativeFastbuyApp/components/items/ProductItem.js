import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ImageButton } from './../../components';

import colors from '../../colors';
import fonts from '../../fonts';
import i18n from '../../i18n';
import imgListDelete from '../../../assets/images/list-delete.png';
import imgPlaceholder from '../../../assets/images/image-placeholder.png';


const ProductItem = ({ item, margin, onPress, onPressDelete }) => {
  const {
    containerStyle,
    imageStyle,
    productViewStyle,
    nameTextStyle,
    priceTextStyle,
    productDetailsViewStyle,
    productDetailsSubviewStyle,
    subviewTitleTextStyle,
    subviewValueTextStyle,
    separatorStyle
  } = styles;

  return (
    <View style={{ marginTop: margin / 2, marginBottom: margin / 2 }}>
      <TouchableOpacity style={containerStyle} onPress={onPress}>
        <Image
          style={[{ marginRight: margin }, imageStyle]}
          source={item.imageUrl ? { uri: item.imageUrl } : null}
          defaultSource={imgPlaceholder}
        />

        <View style={productViewStyle}>
          <Text style={nameTextStyle}>{item.name}</Text>
          <Text style={priceTextStyle}>{item.price}</Text>

          <View style={productDetailsViewStyle}>
            <View style={productDetailsSubviewStyle}>
              <Text style={subviewTitleTextStyle}>{i18n.t('productItem.color')}</Text>
              <Text style={subviewValueTextStyle}>{item.color}</Text>
            </View>

            <View style={productDetailsSubviewStyle}>
              <Text style={subviewTitleTextStyle}>{i18n.t('productItem.size')}</Text>
              <Text style={subviewValueTextStyle}>{item.size}</Text>
            </View>

            <ImageButton
              size={25}
              source={imgListDelete}
              onPress={onPressDelete}
            />
          </View>
        </View>
      </TouchableOpacity>

      <View style={[{ marginTop: margin }, separatorStyle]} />
    </View>
  );
};

const higherMargin = 5;
const lowerMargin = 2.5;
const styles = {
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  imageStyle: {
    backgroundColor: colors.grayUltraLight,
    width: 90,
    height: 90,
    borderRadius: 5,
  },

  productViewStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  nameTextStyle: {
    fontFamily: fonts.regular,
    color: colors.grayDark,
    fontSize: 18,
    marginBottom: higherMargin
  },
  priceTextStyle: {
    fontFamily: fonts.bold,
    color: colors.purple,
    fontSize: 16,
    marginBottom: higherMargin
  },

  productDetailsViewStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  productDetailsSubviewStyle: {
    flex: 1
  },
  subviewTitleTextStyle: {
    fontFamily: fonts.light,
    color: colors.gray,
    fontSize: 14,
    marginBottom: lowerMargin
  },
  subviewValueTextStyle: {
    fontFamily: fonts.regular,
    color: colors.grayDark,
    fontSize: 14
  },

  separatorStyle: {
    backgroundColor: colors.grayLight,
    height: 0.5
  }
};


export { ProductItem };
