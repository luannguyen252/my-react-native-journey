const React = require("react-native");
const Avatar = require("./Avatar");
const theme = require("./theme");
const { Component, ListView, View, Text, Image, TouchableOpacity } = React;

const styles = {
  row: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 20,
  },

  info: {
    paddingLeft: 20,
    flex: 1,
    justifyContent: "flex-start",
  },

  title: {
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: 14,
  },

  speaker: {
    color: theme.colors.lightText,
    fontWeight: "300",
    paddingTop: 5,
  },

  clock: {
    color: theme.colors.lightText,
    fontWeight: "300",
    fontSize: 12,
    paddingTop: 1,
  },
};

module.exports = class ScheduleItem extends Component {
  render() {
    let speaker;

    if (this.props.speaker) {
      speaker = <Text style={styles.speaker}>{this.props.speaker}</Text>;
    }

    const activeOpacity = this.props.category ? 0.5 : 1;
    const onPress = this.props.excerpt ? this.props.onPress : () => {};

    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={activeOpacity}
        onPress={onPress}
      >
        <Avatar src={this.props.avatar} category={this.props.category} />
        <View style={styles.info}>
          <Text style={styles.title}>{this.props.title}</Text>
          {speaker}
          <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
            <Image
              source={require("image!ios7-clock-outline")}
              style={{ width: 18, height: 18, marginRight: 5 }}
            />
            <Text style={styles.clock}>{this.props.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};
