import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { Card, Button } from 'react-native-elements';
import { Bar } from 'react-native-progress';
import { progressBar, primaryColor } from '../styles/common';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Badge extends React.PureComponent {
  renderHeader = () => {
    const { details } = this.props.badge;
    return (
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={{ uri: details.iconUrl }}
        />
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={styles.title}>
            {details.title}
          </Text>
          <Bar 
            progress={details.progress}
            color={progressBar.color}
            height={progressBar.height}
          />
        </View>
      </View>
    );
  }

  renderDescription = () => {
    const { details } = this.props.badge;
    return (
      <Text style={styles.description}>
        {details.description}
      </Text>
    );
  }

  renderAction = () => {
    return (
      <Button
        backgroundColor={primaryColor}
        buttonStyle={styles.button}
        title='View Activities'
        onPress={() => this.props.onPress(this.props.badge, this.props.index)}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          {this.renderHeader()}
          {this.renderDescription()}
          {this.renderAction()}
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  card: {
    width: SCREEN_WIDTH, 
    borderWidth: 0,
    marginTop: 0, 
    marginBottom: 10,
    paddingTop: 0
  },
  header: {
    flexDirection: 'row',
    top: 5
  },
  image: {
    left: -15,
    resizeMode: 'contain',
    width: SCREEN_HEIGHT / 5.5,
    height: SCREEN_HEIGHT / 5.5
  },
  title: {
    marginBottom: 10,
    fontWeight: 'bold'
  },
  description: {
    marginTop: 10,
    marginBottom: 15
  },
  button: {
    borderRadius: 0,
    marginBottom: 15,
    alignSelf: 'center'
  }
});

Badge.propTypes = {
  badge: PropTypes.object,
  onPress: PropTypes.func,
  index: PropTypes.number
}

export default Badge;