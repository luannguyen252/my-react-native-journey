import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import theme, { Box, Text } from "./Theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
});

interface RatingsProps {
  rating: number;
  size?: number;
}

const Ratings = ({ rating, size }: RatingsProps) => {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill("staro");
  const r = [...Array(filledStars).fill("star"), ...maxStars];

  return (
    <Box style={styles.container}>
      {r.map((type, index) => {
        return (
          <AntDesign
            key={index}
            name={type}
            size={size ? size : 12}
            color={theme.colors.yellow}
          />
        );
      })}
    </Box>
  );
};

export default Ratings;
