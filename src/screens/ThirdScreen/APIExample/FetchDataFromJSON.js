import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function FetchDataFromJSON() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            fontWeight: "700",
            color: "#111827",
          }}
        >
          Loading...
        </Text>
      ) : (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 16,
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              fontWeight: "700",
              color: "#111827",
              textAlign: "center",
              textTransform: "uppercase",
              paddingBottom: 16,
            }}
          >
            {data.title}
          </Text>
          <FlatList
            data={data.articles}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 16,
                  fontWeight: "600",
                  color: "#111827",
                }}
              >
                {item.id + ". " + item.title}
              </Text>
            )}
          />
        </View>
      )}
    </>
  );
}
