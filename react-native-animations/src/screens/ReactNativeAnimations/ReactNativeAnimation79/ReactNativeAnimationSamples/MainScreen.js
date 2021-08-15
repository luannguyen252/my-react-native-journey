import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, TouchableHighlight } from 'react-native';

class MainScreen extends Component {
  goTo = routeName => {
    this.props.navigation.navigate(routeName);
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('TimingScreen')}>
          <Text>TimingAnimation</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('BounceScreen')}>
          <Text>BounceAnimation</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('CompositeScreen')}>
          <Text>CompositeAnimation</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('EasingScreen')}>
          <Text>EasingAnimation</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('StaggerScreen')}>
          <Text>StaggerAnimation</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('SpringScreen')}>
          <Text>SpringAnimation</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('SpinningScreen')}>
          <Text>SpinningAnimation</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('SequenceScreen')}>
          <Text>SequenceAnimation</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('ParallelScreen')}>
          <Text>ParallelAnimation</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('DecayScreen')}>
          <Text>DecayAnimation</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('TinderScreen')}>
          <Text>TinderAnimation</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('DragScreen')}>
          <Text>DragAnimation</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('ChasingScreen')}>
          <Text>ChasingAnimation</Text>
        </TouchableHighlight>        
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('Layout1Screen')}>
          <Text>LayoutAnimation1</Text>
        </TouchableHighlight>        
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('Layout2Screen')}>
          <Text>LayoutAnimation2</Text>
        </TouchableHighlight>        
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('Layout3Screen')}>
          <Text>LayoutAnimation3</Text>
        </TouchableHighlight>        
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('LayoutEventScreen')}>
          <Text>LayoutEventAnimation</Text>
        </TouchableHighlight>        
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('PagingScreen')}>
          <Text>PagingAnimation</Text>
        </TouchableHighlight>        
        <TouchableHighlight style={styles.button} onPress={() => this.goTo('PanResponderScreen')}>
          <Text>PanResponderExample</Text>
        </TouchableHighlight>        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
  },
});

export default MainScreen;
