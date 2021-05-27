import React, { PropTypes } from 'react';
import { TextInput, View } from 'react-native';
import styles from '../styles';

const SearchBox = (props) => {
    const { onComplete } = props;
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchbox}
          defaultValue={''}
          placeholder={'Enter a City'}
          onSubmitEditing={(event) => {
              onComplete(event.nativeEvent.text);
              this.value = '';
          }}
        />
      </View>);
};

// SearchBox.propTypes = {
//     onComplete: PropTypes.func.isRequired,
// };

export default SearchBox;
