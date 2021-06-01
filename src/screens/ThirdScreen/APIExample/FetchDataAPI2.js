import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import styles from "../../SecondScreen/styles";

export default function FetchDataAPI2() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=5")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <Text style={fetchStyles.loadingText}>Loading...</Text>
      ) : (
        <View style={fetchStyles.container}>
          {/* 1. */}
          <View style={{ paddingBottom: 16 }}>
            <Image
              style={{ width: 32, height: 32, borderRadius: 16 }}
              source={{ uri: data.results[0].picture.medium }}
              resizeMode="contain"
            />
            <Text>
              {data.results[0].name.title}, {data.results[0].name.first}{" "}
              {data.results[0].name.last}
            </Text>
            <Text>{data.results[0].phone}</Text>
            <Text>{data.results[0].email}</Text>
            <Text>
              {data.results[0].location.street.number}{" "}
              {data.results[0].location.street.name},{" "}
              {data.results[0].location.state}, {data.results[0].location.city}
            </Text>
          </View>

          {/* 2. */}
          {data.results.map((item, index) => (
            <View key={index} style={{ paddingTop: 16 }}>
              <Image
                style={{ width: 32, height: 32, borderRadius: 16 }}
                source={{ uri: item.picture.medium }}
                resizeMode="contain"
              />
              <Text>
                {item.name.title}. {item.name.first} {item.name.last}
              </Text>
              <Text>{item.phone}</Text>
              <Text>{item.email}</Text>
              <Text>
                {item.location.street.number} {item.location.street.name},{" "}
                {item.location.state}, {item.location.city}
              </Text>
            </View>
          ))}
        </View>
      )}
    </>
  );
}

const fetchStyles = StyleSheet.create({
  loadingText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: "#111827",
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
});
