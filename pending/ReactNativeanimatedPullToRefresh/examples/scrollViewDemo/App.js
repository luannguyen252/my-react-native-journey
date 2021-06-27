 
import React from 'react';
import { Text, View, Dimensions, ScrollView, Image } from 'react-native'
import rocketAnim from './rocketAnim.json'
import progressAnim from './progressAnim.json'
import AnimatedPullToRefresh from 'react-native-animated-pull-to-refresh'

const vw = Dimensions.get('window').width * 0.01
const vh = Dimensions.get('window').height * 0.01

class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      mockData: [
        {
          title: 'You have got that one thing',
          artist: 'One Direction'
        },
        {
          title: 'You have got that one thing',
          artist: 'One Direction'
        },
        {
          title: 'You have got that one thing',
          artist: 'One Direction'
        },
        {
          title: 'You have got that one thing',
          artist: 'One Direction'
        },
        {
          title: 'You have got that one thing',
          artist: 'One Direction'
        },
        {
          title: 'You have got that one thing',
          artist: 'One Direction'
        },
        {
          title: 'You have got that one thing',
          artist: 'One Direction'
        },
        {
          title: 'You have got that one thing',
          artist: 'One Direction'
        },
        {
          title: 'You have got that one thing',
          artist: 'One Direction'
        },
      ],
      isRefreshing: false,
    }

  }


  componentDidMount() {
    setTimeout(this.onRefresh)
  }


  _renderItem = (item, key) => {

    return <View style={{
      paddingHorizontal: 8,
      paddingVertical: 2*vh,
      flexDirection: 'row',
      borderBottomWidth: 0.2,
      borderBottomColor: '#ccc'
    }}
      key={key}
    >
      <Image
        source={require('./audioDisc.png')}
        style={{ height: 10 * vw, width: 10 * vw }}
      />
      <View style={{ marginLeft: 2 * vw, justifyContent: 'center' }}>
        <Text style={{fontWeight: 'bold'}}>{item.artist}</Text>
        <Text>{item.title}</Text>
      </View>
    </View>
  }


  _renderList = () => {

    return this.state.mockData.map((item, index) => {
      return this._renderItem(item, index)
    })
  }


  onRefresh = () => {

    this.setState({ isRefreshing: true });

    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 3000);

  }

  render() {
    return (

      <AnimatedPullToRefresh
        isRefreshing={this.state.isRefreshing}
        onRefresh={this.onRefresh}
        pullHeight={10 * vh}
        backgroundColor={'#5DADE2'}
        renderElement={
          <ScrollView>
            {
              this._renderList()
            }
          </ScrollView>
        }
        duration={2500}


        /*  ******* About Animation Source ******

        You can make a combination of animations to be played in the refresh area, by using the following props.
        Here we have used 2 different animations, you can have upto 4 different animations.

        If you want to run the same animation throughout the refresh process, you have to pass the same animation source
        to the following props.

        */
       
        pullAnimationSource={rocketAnim}
        startRefreshAnimationSource={rocketAnim}

        refreshAnimationSource={progressAnim}
        endRefreshAnimationSource={progressAnim}

      />

    );
  }

};

export default App;
