import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import StaffIcon from '../assets/StaffIcon.png'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <Image
            source={StaffIcon}
            style={{ height: 70, width: 70, alignSelf: 'center' }}
          />
          <View
            style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginRight: 10,
                color: 'gray'
              }}
            >
              Name:
            </Text>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              {this.props.staffData.Name}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              color: 'gray'
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginRight: 10,
                color: 'gray'
              }}
            >
              Branch:
            </Text>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              {this.props.staffData.Branch}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    staffData: state.homeReducer.staffData
  }
}

export default connect(
  mapStateToProps,
  null
)(Profile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  container2: {
    display: 'flex',
    flexDirection: 'column'
  }
})
