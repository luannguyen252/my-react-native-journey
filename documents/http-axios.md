# React Native HTTP Axios

```javascript
axios
  .get("Web URL")
  .then(function (response) {
    // handle response
  })
  .catch(function (error) {
    // handle error
  })
  .finally(function () {
    // always executes at the last of any API call
  });
```

```bash
npm instal axios
```

## React Native HTTP Axios Example 1

```javascript
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import axios from "axios";

const HTTPAxiosExample1 = () => {
  const getDataUsingSimpleGetCall = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then(function (response) {
        // Handle success
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // Handle error
        alert(error.message);
      })
      .finally(function () {
        // Always executed
        alert("Finally called");
      });
  };

  const getDataUsingAsyncAwaitGetCall = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      alert(JSON.stringify(response.data));
    } catch (error) {
      // Handle error
      alert(error.message);
    }
  };

  const postDataUsingSimplePostCall = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: "foo",
        body: "bar",
        userId: 1,
      })
      .then(function (response) {
        // Handle success
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // Handle error
        alert(error.message);
      });
  };

  const multipleRequestsInSingleCall = () => {
    axios
      .all([
        axios
          .get("https://jsonplaceholder.typicode.com/posts/1")
          .then(function (response) {
            // Handle success
            alert("Post 1 : " + JSON.stringify(response.data));
          }),
        axios
          .get("https://jsonplaceholder.typicode.com/posts/2")
          .then(function (response) {
            // Handle success
            alert("Post 2 : " + JSON.stringify(response.data));
          }),
      ])
      .then(
        axios.spread(function (acct, perms) {
          // Both requests are now complete
          alert("Both requests are now complete");
        })
      );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, textAlign: "center" }}>
        Example of Axios Networking in React Native
      </Text>
      {/* Running GET Request */}
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={getDataUsingSimpleGetCall}
      >
        <Text>Simple Get Call</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={getDataUsingAsyncAwaitGetCall}
      >
        <Text>Get Data Using Async Await GET</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={postDataUsingSimplePostCall}
      >
        <Text>Post Data Using POST</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={multipleRequestsInSingleCall}
      >
        <Text>Multiple Concurrent Requests In Single Call</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginTop: 18 }}>
        www.aboutreact.com
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    padding: 16,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "100%",
    marginTop: 16,
  },
});

export default HTTPAxiosExample1;
```
