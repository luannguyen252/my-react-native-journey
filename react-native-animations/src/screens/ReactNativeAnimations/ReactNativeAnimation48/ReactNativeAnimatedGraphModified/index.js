import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import ColumnBar from "./ColumnBar";

const ANIMATION_DELAY = 300;

export default class ReactNativeAnimatedGraphModified extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalVisible: false,
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  componentDidMount() {
    this.generateData();
    this.interval = setInterval(() => {
      this.generateData();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  generateData = () => {
    var sortArray = [];
    var barArray = [];
    const data = [
      { amount: 16.5, current: false, duration: "Jan" },
      { amount: 32, current: false, duration: "Feb" },
      { amount: 24, current: false, duration: "Mar" },
      { amount: 16, current: false, duration: "Apr" },
      { amount: 8.8, current: false, duration: "May" },
      { amount: 12.5, current: false, duration: "Jun" },
      { amount: 24.5, current: true, duration: "Jul" },
      { amount: 4.5, current: false, duration: "Aug" },
    ];

    data.map((value, index) => sortArray.push(value.amount));
    sortArray.sort(function (a, b) {
      return b - a;
    });

    data.map((value, index) =>
      barArray.push({
        height: (200 / sortArray[0]) * value.amount,
        current: value.current,
        duration: value.duration,
        amount: value.amount,
      })
    );

    this.setState({
      data: barArray,
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingLeft: 16,
          paddingRight: 16,
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
        }}
      >
        <View style={{ paddingBottom: 32 }}>
          <Animatable.Text
            animation="fadeInUp"
            delay={ANIMATION_DELAY}
            style={{
              fontSize: 30,
              textAlign: "center",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            Monthly Sales
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={ANIMATION_DELAY + 150}
            style={{
              fontSize: 18,
              lineHeight: 24,
              fontWeight: "400",
              textAlign: "center",
              color: "#9CA3AF",
              paddingTop: 8,
            }}
          >
            Jul 2021
          </Animatable.Text>
        </View>
        <View
          style={{
            height: 275,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {this.state.data.map((value, index) => (
            <ColumnBar
              key={index}
              action={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              value={value.height}
              delay={300}
              flag={value.current}
              duration={value.duration}
              amount={value.amount}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
