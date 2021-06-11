/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import AnimatedSprite from 'react-native-animated-sprite';
import AnimatedSpriteMatrix from 'rn-animated-sprite-matrix';

import _ from 'lodash';
import cellSprite from "./sprites/button/buttonCharacter";
import randomstring from 'random-string';
import monsterSprite from './sprites/monster/monsterCharacter';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class matrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [],
    }
    this.activeCells =  [true, true, true, true, true, true, true, true, true, true, true, true];
		this.animationKeys = ["WALK", "IDLE", "IDLE", "EAT", "IDLE", "IDLE", "IDLE", "IDLE", "IDLE", "IDLE", "IDLE", "IDLE"];
    this.loopAnimation = _.fill(Array(this.activeCells.length), false);
    this.sprites = _.fill(Array(this.activeCells.length), monsterSprite);
    this.scale = {image: 1};
    this.cellSpriteScale = 0.5;
    this.numColumns = 4;
    this.numRows = 3;
  }
  
  componentWillMount () {
    this.setState({cells: this.createCellObjsArray()});
  }
  
  createCellObjsArray () {
    const cells = _.map(this.activeCells , (active, index) => ({
      sprite: this.sprites[index],
      animationKey: this.animationKeys[index],
      loopAnimation: this.loopAnimation[index],
      uid: randomstring({ length: 7 }),
      active,
    }));
    return cells;
  }
  
  matrixLocation () {
    const size = monsterSprite.size;
    const width = this.numColumns * size.width * this.cellSpriteScale;
    const height = this.numRows * size.height * this.cellSpriteScale;
    const top = screenHeight / 2 - height/2;
    const left = screenWidth / 2 - width/2;
    const location = {top, left};
    return location;
  }
  matrixSize () {
    const size = monsterSprite.size;
    const width = this.numColumns * size.width * this.cellSpriteScale;
    const height = this.numRows * size.height * this.cellSpriteScale;
    return {width, height};
  }
  
  cellPressed (cellObj, position) {
    const cells = _.cloneDeep(this.state.cells);
    if (cells[position].animationKey === "WALK") {
      cells[position].animationKey = "EAT";
    } else {
      cells[position].animationKey = "WALK";
    }
    cells[position].loopAnimation = true;
    // must change key to force redraw
    cells[position].uid = randomstring({length: 7});
    this.setState({cells});
  }
  
  render() {
    return (
      <View style={styles.container}>
        
        <AnimatedSpriteMatrix
          styles={{
              ...(this.matrixLocation()),
              ...(this.matrixSize()),
              position: 'absolute',
            }}
          dimensions={{columns: this.numColumns, rows: this.numRows}}
          cellSpriteScale={this.cellSpriteScale}
          cellObjs={this.state.cells}
          scale={this.scale}
          onPress={(cellObj, position) => this.cellPressed(cellObj, position)}
        />    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('matrix', () => matrix);
