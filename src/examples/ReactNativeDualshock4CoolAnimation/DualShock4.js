import React, { PureComponent } from 'react';
import { View, Text, Image, Animated, StyleSheet } from 'react-native';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Paragraph,
} from './Text';
import { deviceWidth, deviceHeight } from './env';
import Card from './Card';
import Button from './Button';

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  titleImage: {
    position: 'absolute',
  },
  detailTitle: {
    position: 'absolute', 
    top: 150,
    left: 0,
  },
  detailPrice: {
    top: 60,
    left: 100,
  },
  detailDecription: {
    position: 'absolute',
    padding: 20,
    top: 140 + 160,
  },
  detailFooterImage: {
    position: 'absolute',
    bottom: 0,
  },
});

export default class DualShock4 extends PureComponent {
  static defaultProps = {
    onOpen: () => {},
    onClose: () => {},
  }

  viewSizeHasAdjusted = false;

  cardSize = new Animated.ValueXY({ x: 0, y: 0 });
  imageRotate = new Animated.Value(0);
  imageTranslateY = new Animated.Value(0);
  imageScale = new Animated.Value(0);
  footerImageScale = new Animated.Value(0);

  previewTextOpacity = new Animated.Value(1);
  activeTextOpacity = new Animated.Value(0);
  activeTitleTranslateX = new Animated.Value(0);

  state = {
    isOpen: false,
    width: 0,
    height: 0,
  }

  toggleDetails = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      }, () => {
        this.props.onClose(this.props.index);
        Animated.parallel([
          Animated.timing(this.cardSize.x, {
            toValue: this.state.width,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(this.cardSize.y, {
            toValue: this.state.height,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(this.imageRotate, {	
            toValue: 0,	
            duration: 200,	
            useNativeDriver: true,	
          }),
          Animated.spring(this.imageTranslateY, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(this.footerImageScale, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(this.activeTitleTranslateX, {
            toValue: 0,
            friction: 4.5,
            tension: 0.5,
            useNativeDriver: true,
          }),
          Animated.timing(this.activeTextOpacity, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(this.previewTextOpacity, {
            toValue: 1,
            duration: 200,
            delay: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      this.props.onOpen(this.props.index);
      this.setState({
        isOpen: true,
      }, () => {
        Animated.parallel([
          Animated.timing(this.cardSize.x, {
            toValue: deviceWidth,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(this.cardSize.y, {
            toValue: deviceHeight,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(this.imageRotate, {	
            toValue: 1,	
            duration: 200,	
            useNativeDriver: true,	
          }),
          Animated.spring(this.imageTranslateY, {
            toValue: deviceHeight/2,
            useNativeDriver: true,
          }),
          Animated.spring(this.footerImageScale, {	
            toValue: 1,	
            friction: 5.5,	
            tension: 10,	
            useNativeDriver: true,	
          }),
          Animated.spring(this.activeTitleTranslateX, {
            toValue: deviceHeight,
            friction: 4.5,
            tension: 0.5,
            useNativeDriver: true,
          }),
          Animated.timing(this.activeTextOpacity, {
            toValue: 1,
            duration: 200,
            delay: 300,
            useNativeDriver: true,
          }),
          Animated.timing(this.previewTextOpacity, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }

  renderPreviewTitle() {
    return !this.state.isOpen ? (
      <Animated.View
        style={StyleSheet.flatten([
          { opacity: this.previewTextOpacity },
          {
            transform: [{
              translateX: this.props.scrollX.interpolate({
                inputRange: [deviceWidth * this.props.index, deviceWidth * (this.props.index + 1)],
                outputRange: [0, -deviceWidth * 0.1],
              }),
            }],
          }
        ])}
      >
        <Heading3>
          {this.props.item.title}
        </Heading3>
      </Animated.View>
    ) : null;
  }

  renderPreviewPrice() {
    return !this.state.isOpen ? (
      <Animated.View
        style={StyleSheet.flatten([
          { opacity: this.previewTextOpacity },
          {
            transform: [{
              translateX: this.props.scrollX.interpolate({
                inputRange: [deviceWidth * this.props.index, deviceWidth * (this.props.index + 1)],
                outputRange: [0, -deviceWidth * 0.4],
              }),
            }],
          }
        ])}
      >
        <Heading4>
          {this.props.item.price}
        </Heading4>
      </Animated.View>
    ) : null;
  }

  renderPreviewName() {
    return !this.state.isOpen ? (
      <Animated.View
        style={StyleSheet.flatten([
          { opacity: this.previewTextOpacity },
          {
            transform: [{
              translateX: this.props.scrollX.interpolate({
                inputRange: [deviceWidth * this.props.index, deviceWidth * (this.props.index + 1)],
                outputRange: [0, -deviceWidth * 0.2],
              }),
            }],
          }
        ])}
      >
        <Heading5>
          {this.props.item.name}
        </Heading5>
      </Animated.View>
    ) : null
  }

  renderDetailTitle() {
    return (
      <View
        style={StyleSheet.flatten([
          styles.detailTitle,
          { opacity: this.state.isOpen ? 1 : 0 },
        ])}
      >
        <Animated.View
          style={StyleSheet.flatten([
            { marginBottom: 66 },
            {
              transform: [{
                translateX: this.activeTitleTranslateX.interpolate({
                  inputRange: [0, deviceHeight],
                  outputRange: [-deviceWidth, 0],
                }),
              }],
            }
          ])}
        >
          <Image
            resizeMode="contain"
            style={StyleSheet.flatten(styles.titleImage)}
            source={this.props.item.imageTitle1}
          />
        </Animated.View>
        <Animated.View
          style={StyleSheet.flatten({
            transform: [{
              translateX: this.activeTitleTranslateX.interpolate({
                inputRange: [this.state.height, deviceHeight],
                outputRange: [-deviceWidth, 0],
              }),
            }],
          })}
        >
          <Image
            resizeMode="contain"
            style={StyleSheet.flatten(styles.titleImage)}
            source={this.props.item.imageTitle2}
          />
        </Animated.View>
      </View>
    );
  }

  renderDetailDecription() {
    return (
      <Animated.View 
        style={StyleSheet.flatten([
          styles.detailDecription,
          { opacity: this.activeTextOpacity },
        ])}
      >
        <Heading4>
          DualShock 4
        </Heading4>
        <Heading1>
          Wireless Controller
        </Heading1>
        <Paragraph>
          The DualShock®4 Wireless Controller for PlayStation®4 defines the next generation of play, combining revolutionary new features with intuitive, precision controls.
        </Paragraph>
      </Animated.View>
    );
  }

  renderDetailPrice() {
    return this.state.isOpen ? (
      <Animated.View
        style={StyleSheet.flatten([
          styles.detailPrice,
          { opacity: this.activeTextOpacity, }
        ])}
      >
        <Heading2>
          {this.props.item.price}
        </Heading2>
      </Animated.View>
    ) : null;
  }

  renderDetailFooterImage() {
    return (
      <Animated.View
        style={StyleSheet.flatten([
          styles.detailFooterImage,
          { opacity: this.state.isOpen ? 1 : 0 },
          {
            transform: [{
              scale: this.footerImageScale.interpolate({
                inputRange: [0, 1],
                outputRange: [3, 1],
              })
            }, {
              translateY: this.footerImageScale.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0],
              }),
            }]
          }
        ])}
      >
        <Animated.Image
          resizeMode="contain"
          source={require('../assets/photos.png')}
        />
      </Animated.View>
    )
  }

  adjustContentSize = (e) => {
    // only adjuste once
    if (!this.viewSizeHasAdjusted) {
      const { width, height } = e.nativeEvent.layout;
      this.setState({ width, height }, () => {
        this.cardSize.setValue({ x: width, y: height });
      });
      this.viewSizeHasAdjusted = true;
    }
  }

  render() {
    const { scrollX, index, item } = this.props;
    const { width, height } = this.state;
    const cardStyle = this.viewSizeHasAdjusted
      ? { width: this.cardSize.x, height: this.cardSize.y }
      : null;

    return (
      <Card
        onLayout={this.adjustContentSize}
        style={StyleSheet.flatten([
          cardStyle,
          {
            borderRadius: this.cardSize.y.interpolate({
              inputRange: [height, deviceHeight],
              outputRange: [15, 0],
            }),
          },
        ])}
      >
        {this.renderPreviewTitle()}
        {this.renderPreviewPrice()}
        <Animated.View
          shouldRasterizeIOS
          renderToHardwareTextureAndroid
          style={StyleSheet.flatten([
            styles.imageContainer,
            {
              transform: [{
                translateX: scrollX.interpolate({
                  inputRange: [deviceWidth * this.props.index, deviceWidth * (this.props.index + 1)],
                  outputRange: [0, -deviceWidth * 0.5],
                }),
              }, {
                translateY: this.imageTranslateY.interpolate({
                  inputRange: [0, deviceHeight/2],
                  outputRange: [0, -deviceHeight/2],
                }),
              }, {
                rotate: this.imageRotate.interpolate({	
                  inputRange: [0, 1],	
                  outputRange: ['0deg', '180deg'],	
                }),
              }, {
                scale: this.imageTranslateY.interpolate({
                  inputRange: [0, deviceHeight/2],
                  outputRange: [1, 1.55],
                }),
              }],
            },
          ])}
        >
          <Image
            resizeMode="contain"
            source={item.goodsImage}
          />
        </Animated.View>

        {this.renderDetailTitle()}
        {this.renderDetailDecription()}
        
        <Animated.View
          style={StyleSheet.flatten({
            transform: [{
              translateX: this.cardSize.x.interpolate({
                inputRange: [width, deviceWidth],
                outputRange: [0, -60],
              }),
            }, {
              translateY: this.cardSize.y.interpolate({
                inputRange: [height, deviceHeight],
                outputRange: [0, 100],
              }),
            }],
          })}
        >
          <Button
            text="BUY"
            onPress={this.toggleDetails}
          />
        </Animated.View>
        
        {this.renderDetailPrice()}
        {this.renderPreviewName()}
        {this.renderDetailFooterImage()}
      </Card>
    );
  }
}