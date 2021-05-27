import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from 'prop-types';

const SCHOOLS = [
  { label: 'DePaul University', value: 'depaul' },
  { label: 'Fudan University', value: 'fudan' },
  /*{ label: 'DePaul University', value: 'depaul' },
  { label: 'Fudan University', value: 'fudan' },
  { label: 'DePaul University', value: 'depaul' },
  { label: 'Fudan University', value: 'fudan' },
  { label: 'DePaul University', value: 'depaul' },
  { label: 'Fudan University', value: 'fudan' }*/
]

const SchoolSelect = props => {
  onSelectComplete = () => {
    props.onSelectComplete(this.select.value());
  }

  setRef = ref => {
    this.select = ref;
  }

  return (
    <View>
      <Dropdown
        ref={this.setRef}
        data={SCHOOLS}
        value={props.value}
        dropdownPosition={0}
        containerStyle={props.containerStyle}
        baseColor='rgba(0, 0, 0, .87)'
      />
      <Button
        title={props.buttonText}
        raised
        buttonStyle={props.buttonStyle}
        onPress={onSelectComplete}
      />
    </View>
  )
}

SchoolSelect.propTypes = {
  buttonText: PropTypes.string,
  value: PropTypes.string,
  onSelectComplete: PropTypes.func,
  containerStyle: PropTypes.object,
  buttonStyle: PropTypes.object
}

SchoolSelect.defaultProps = {
  buttonText: 'Save',
  value: SCHOOLS[0].value,
  onSelectComplete: () => {},
  containerStyle: {},
  buttonStyle: {}
}

export default SchoolSelect;