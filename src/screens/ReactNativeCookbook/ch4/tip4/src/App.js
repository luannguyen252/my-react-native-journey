import React, { PureComponent } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

class App extends PureComponent {
  state = {
    history: [],
  };

  componentWillMount() {
    this.ws = new WebSocket("ws://localhost:3001");

    this.ws.onopen = this.onOpenConnection;
    this.ws.onmessage = this.onMessageReceived;
    this.ws.onerror = this.onError;
    this.ws.onclose = this.onClose;
  }

  onOpenConnection = () => {
    console.log("Open!");
  };

  onMessageReceived = (event) => {
    this.setState({
      history: [...this.state.history, { owner: false, msg: event.data }],
    });
  };

  onError = (event) => {
    console.log("onerror", event.message);
  };

  onClose = (event) => {
    console.log("onclose", event.code, event.reason);
  };

  onSendMessage = () => {
    const { text } = this.state;

    this.setState({
      text: "",
      history: [...this.state.history, { owner: true, msg: text }],
    });
    this.ws.send(text);
  };

  onChangeText = (text) => {
    this.setState({ text });
  };

  renderMessage(item, index) {
    const kind = item.owner ? styles.me : styles.friend;

    return (
      <View style={[styles.msg, kind]} key={index}>
        <Text>{item.msg}</Text>
      </View>
    );
  }

  render() {
    const { history, text } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.toolbar}>Simple Chat</Text>
        <ScrollView style={styles.content}>
          {history.map(this.renderMessage)}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSendMessage}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    flex: 1,
  },
  toolbar: {
    backgroundColor: "#34495e",
    color: "#fff",
    fontSize: 20,
    padding: 25,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  msg: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  me: {
    alignSelf: "flex-start",
    backgroundColor: "#1abc9c",
    marginRight: 100,
  },
  friend: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    marginLeft: 100,
  },
  inputContainer: {
    backgroundColor: "#bdc3c7",
    padding: 5,
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
  },
});

export default App;
