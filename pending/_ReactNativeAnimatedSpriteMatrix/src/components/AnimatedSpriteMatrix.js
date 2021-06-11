import React from 'react';
import {
  View,
} from 'react-native';

import PropTypes from 'prop-types';

import _ from 'lodash';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import randomstring from 'random-string';

import AnimatedSprite from 'react-native-animated-sprite';

class AnimatedSpriteMatrix extends React.Component {
  constructor (props) {
    super(props);
    
    const numCells = this.props.dimensions.rows * this.props.dimensions.columns;
    if (numCells !== this.props.cellObjs.length){
      console.error(`Error: mismatch between matrix dimensions and matrix cells`);
    }
  }

  spriteSize (sprite, scale) {
    // for old sprites size was an object, for new sprites it is a function
    let size = sprite.size; 
    if (_.isFunction(sprite.size)) {
      size = sprite.size(scale);
    }
    return size;
  }

  cellLocation (position, sprite, scale) {
    const row = Math.floor(position / this.props.dimensions.columns);
    const column = position % this.props.dimensions.columns;
    let bottomMargin = 0;
    if (row > 0) {
      bottomMargin = this.props.cellBottomMargin;
    }
    rightMargin = 0;
    if (column > 0) {
      rightMargin = this.props.cellRightMargin;
    }
    const spriteSize = this.spriteSize(sprite, scale);
    const top = row * spriteSize.height + bottomMargin;
    const left = column * spriteSize.width + rightMargin;
    return {top, left};
  }

  cellPress (cell, index) {
    debugger;
    if (!this.props.onPress) return;
    this.props.onPress(cell, index);
  }

  cellPressIn (cell, index) {
    if (!this.props.onPressIn) return;
    this.props.onPressIn(cell, index);
  }
  cellPressOut (cell, index) {
    if (!this.props.onPressOut) return;
    this.props.onPressOut(cell, index);
  }

  render () {
    const cells = _.map(this.props.cellObjs, (cell, index) => {
      // safty for when 
      if (!cell.active) {
        return null;
      }
      return (

        <AnimatedSprite
          sprite={cell.sprite}
          ref={`cell${index}`}
          key={cell.uid}
          animationFrameIndex={cell.sprite.animationIndex(cell.animationKey)}
          loopAnimation={cell.loopAnimation}
          coordinates={this.cellLocation(index, cell.sprite, this.props.cellSpriteScale)}
          size={this.spriteSize(cell.sprite, this.props.cellSpriteScale)}
          draggable={false}
          onPress={() => this.cellPress(cell, index)}
          onPressIn={() => this.cellPressIn(cell, index)}
          onPressOut={() => this.cellPressOut(cell, index)}
        />  

      );
    });
        
    return (
      <View style={this.props.styles}>
        {cells}
      </View>
    );
  }
}

AnimatedSpriteMatrix.propTypes = {
  dimensions: PropTypes.object.isRequired,
  cellObjs: PropTypes.arrayOf(PropTypes.shape(
    {
      sprite: PropTypes.object.isRequired,
      animationKey: PropTypes.string.isRequired,
      loopAnimation: PropTypes.bool.isRequired,
      uid: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    }
  )).isRequired,
  // scale: PropTypes.object.isRequired,
  
  styles: PropTypes.object,
  cellSpriteScale: PropTypes.number,
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  cellRightMargin: PropTypes.number,
  cellBottomMargin: PropTypes.number,
};

AnimatedSpriteMatrix.defaultProps = {
  cellRightMargin: 10,
  cellBottomMargin: 10,
};

reactMixin.onClass(AnimatedSpriteMatrix, TimerMixin);

export default AnimatedSpriteMatrix;
