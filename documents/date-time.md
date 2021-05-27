# React Native Date Time

```javascript
var date = new Date().getDate(); //To get the Current Date
var month = new Date().getMonth() + 1; //To get the Current Month
var year = new Date().getFullYear(); //To get the Current Year
var hours = new Date().getHours(); //To get the Current Hours
var min = new Date().getMinutes(); //To get the Current Minutes
var sec = new Date().getSeconds(); //To get the Current Seconds
```

## moment.js

```javascript
var date = moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss a");
```

- `moment()` will return the current date-time
- `utcOffset` is used to set your time zone
- `format` will decide the output format
- For Time Format:
  - Y/YYYY -> Year
  - M -> Month in single-digit (Ex. 8)
  - MM -> Month in double-digit (Ex. 08)
  - MMM -> Month short name (Ex. Aug)
  - MMMM -> Month full name (Ex. August)
  - D -> Day in single-digit (Ex. 5)
  - DD -> Day in single double-digit (Ex. 05)
  - HH -> Hours in 24 hr format
  - hh -> Hours in 12 hr format
  - mm -> Minutes
  - ss -> Seconds
  - a -> am/pm

## React Native Date Time Example 1

```javascript
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

const DateTimeExample1 = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>Current Date Time</Text>
          <Text style={styles.textStyle}>{currentDate}</Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "grey",
          }}
        >
          React Native Get Current Date Time
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "grey",
          }}
        >
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
  },
});

export default DateTimeExample1;
```

## React Native Date Time Example 2

```javascript
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import moment from "moment";

const DateTimeExample2 = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    var date = moment().utcOffset("+05:30").format(" hh:mm:ss a");
    setCurrentDate(date);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>Current Date Time</Text>
          <Text style={styles.textStyle}>{currentDate}</Text>
        </View>
        <Text style={{ fontSize: 18, textAlign: "center", color: "grey" }}>
          React Native Get Current Date Time
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center", color: "grey" }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
  },
});

export default DateTimeExample2;
```
