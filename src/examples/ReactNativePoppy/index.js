import React from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import { PoppyContainer, Poppy } from 'poppy-react-native';

class ReminderDetails extends React.Component {

  renderButton(type, text) {
    return (
      <View style={{ backgroundColor: type === 'danger' ? '#576574' : '#54a0ff', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5 }}>
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>{text}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Description</Text>
        <Text>{this.props.text}</Text>
        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 10 }}>Actions</Text>
        {this.renderButton('success', 'Completed')}
        <View style={{ marginTop: 10 }}/>
        {this.renderButton('danger', 'Remove')}
      </View>
    );
  }
}

export default class App extends React.Component {

  state = {
    loading: true,
    listData: [
      {
        id: '0',
        title: 'Get groceries',
        createdAt: '19 Hours ago',
        description: 'Fridge is running out of food, get groceries.',
        image: 'https://media.gettyimages.com/photos/produce-and-bulk-food-on-display-in-health-food-grocery-store-market-picture-id750415109'
      },
      {
        id: '1',
        title: 'Take dog for a walk',
        createdAt: 'April 3rd 2018',
        description: 'Go for dog walks more often this summer.',
        image: 'https://media.gettyimages.com/photos/young-woman-going-walkies-with-her-dog-picture-id691046197'
      },
      {
        id: '2',
        title: 'Finish school homework',
        createdAt: '3 Days ago',
        description: 'Homework for Math, Science and English.',
        image: 'https://media.gettyimages.com/photos/setting-the-page-on-fire-with-some-hard-work-picture-id492198113'
      },
      {
        id: '3',
        title: 'Create react native app',
        createdAt: '1 mintues ago',
        description: 'Use the poppy-react-native library for nice UX',
        image: 'https://media.gettyimages.com/photos/closeup-of-javascript-on-computer-monitor-picture-id660582997'
      }
    ]
  }

  componentDidMount(){
    this.setState({
      loading: false,
    });
  }

  renderItem({item}) {
    return(
      <Poppy key={item.id} 
             rootRef={this.root} 
             style={{ marginTop: 20 }}
             headerStyle={{ paddingTop: 18, 
                            paddingBottom: 0,
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderRadius: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
             headerStyleTransition={{ 
              paddingTop: 60,
              paddingLeft: 25,
              paddingBottom: 30,
             }}
             headerImage={{uri: item.image}}
             headerImageStyle={{ borderRadius: 8 }}
             content= {{
               component: ReminderDetails,
               props: {
                 text: item.description
               }
              }}>
          <Text style={{ fontSize: 20,  color: '#fff' }}
                styleTransition={{ fontSize: 30 }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 15, color: '#fff', paddingTop: 5 }} showAfterOpen>
            {item.createdAt}
          </Text>
      </Poppy>
    );
  }

  render() {
    return (
      <PoppyContainer ref={c => this.root = c} 
                      style={styles.container}
                      animation='timing'
                      xOffset={8}
                      animationDuration={350}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Reminders</Text>
        </View>
        <View style={styles.content}>
          {
            !this.state.loading ?
            <FlatList data={this.state.listData} 
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem.bind(this)} />
            : null
          }
        </View>
      </PoppyContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#ff4757',
    paddingTop: 80,
    paddingBottom: 30,
    paddingLeft: 20,
    marginTop: -20
  },
  headerText: {
    fontSize: 30,
    color: '#fff'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  cardTitleText: {
    flex: 1,
    fontSize: 30, 
    color: '#fff',
  }
});
