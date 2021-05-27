import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import SchoolSelect from './SchoolSelect';
import * as Animatable from 'react-native-animatable';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Slides extends Component {
  renderSlide(slide, index) {
    if (index === 0) {
      return (
        <View
          key={slide.text}
          style={{ width: SCREEN_WIDTH, backgroundColor: slide.color }}
        >
          <View style={{ top: SCREEN_HEIGHT / 3 }}>
            <Animatable.Text 
              animation="slideInUp" 
              style={[styles.text, { fontSize: slide.fontSize }]}
            >
              {slide.text}
            </Animatable.Text>
            <Animatable.Text 
              animation="slideInUp" 
              duration={1350} 
              style={[styles.text, { fontSize: 16, paddingTop: 15 }]}
            >
              {slide.subtext}
            </Animatable.Text>
          </View>
        </View>
      )
    } else if (index === 1) {
      return (
        <View
          key={slide.text}
          style={{ width: SCREEN_WIDTH, justifyContent: 'center', backgroundColor: slide.color }}
        >
          <Text style={[styles.text, { fontSize: slide.fontSize }]}>{slide.text}</Text>
          <SchoolSelect
            onSelectComplete={(value) => this.props.onSelectComplete(value)}
            buttonText="continue"
            containerStyle={{ paddingHorizontal: 30 }}
            buttonStyle={{ backgroundColor: '#0288D1', margin: 24 }}
          />
        </View>
      )
    }
  }

  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        this.renderSlide(slide, index)
      )
    })
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
      >
        {this.renderSlides()}
      </ScrollView>
    )
  }
}

const styles = {
  slide: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'karla-bold',
    color: 'white',
    textAlign: 'center'
  },
};

export default Slides;