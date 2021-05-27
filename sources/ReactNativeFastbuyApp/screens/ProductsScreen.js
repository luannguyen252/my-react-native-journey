import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { askForGalleryPermission, productsDelete, productsFetch } from '../actions';
import { LoadingView, NoContentView, ProductItem } from '../components';
import colors from '../colors';
import i18n from '../i18n';
import imgAppCloud from '../../assets/images/app-cloud.png';


type Props = {};
class ProductsScreen extends Component<Props> {

  componentWillMount() {
    this.props.askForGalleryPermission();
    this.props.productsFetch();
  }

  componentWillUnmount() {
    this.props.unsubscribe();
  }

  renderLoading() {
    return (
      <LoadingView />
    );
  }

  renderNoContent() {
    return (
      <NoContentView
        image={imgAppCloud}
        title={i18n.t('products.noContent')}
      />
    );
  }

  renderList() {
    const {
      containerStyle,
      flatListContainerStyle
    } = styles;

    return (
      <View style={containerStyle}>
        <FlatList
          contentContainerStyle={flatListContainerStyle}
          data={this.props.products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <ProductItem
              margin={padding}
              item={item}
              onPress={() => Actions.product({ product: item })}
              onPressDelete={() => this.props.productsDelete({ item })}
            />
          }
        />
      </View>
    );
  }

  render() {
    if (this.props.loading) {
      return this.renderLoading();
    }

    if (this.props.products.length === 0) {
      return this.renderNoContent();
    }

    return this.renderList();
  }

}

const padding = 14;
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white
  },
  flatListContainerStyle: {
    paddingTop: padding / 2,
    paddingBottom: padding / 2,
    paddingLeft: padding,
    paddingRight: padding
  }
});

const mapStateToProps = state => {
  const { loading, products, unsubscribe } = state.products;
  return { loading, products, unsubscribe };
};

export default connect(mapStateToProps, {
  askForGalleryPermission, productsDelete, productsFetch
})(ProductsScreen);
