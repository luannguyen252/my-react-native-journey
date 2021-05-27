import React, { Component } from 'react';
import { View, Text, Platform, FlatList } from 'react-native';
import { Button, Card, List, ListItem, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';

const list = [
  {
    name: 'Amy Farha',
  },
  {
    name: 'Chris Jackson',
  }
]

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerBackTitle: 'Cancel',
      headerTitle: 'Profile',
      headerRight: (
        <Button 
          title="Edit" 
          onPress={() => navigation.navigate({
            routeName: 'editprofile'
          })}
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0, 122, 255, 1)"
        />
      ),
      headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    }
  }

  state = { checked: null };

  renderRow = ({ item, index }) => {
    return (
      <ListItem
        hideChevron
        onPress={() => this.setState({ checked: index })}
        title={
          <CheckBox 
            title={item.name}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => this.setState({ checked: index })}
            checked={this.state.checked === index}
            checkedColor='pink'
            containerStyle={{ backgroundColor: 'white', borderWidth: 0, padding: 0 }}
          />
        }
      />
    )
  }

  render() {
    return (
      /*<View>
        <Card title="Your University">
          <Text style={styles.text}>{this.props.schoolInfo.name}</Text>
        </Card>
      </View>*/
      <List>
        <FlatList
          data={list}
          extraData={this.state.checked}
          renderItem={this.renderRow}
          keyExtractor={item => item.name}
        />
      </List>

    )
  }
}

const styles = {
  text: {
    textAlign: 'center'
  }
}

function mapStateToProps({ data }) {
  return { schoolInfo: data.schoolInfo }
}

export default connect(mapStateToProps)(ProfileScreen);