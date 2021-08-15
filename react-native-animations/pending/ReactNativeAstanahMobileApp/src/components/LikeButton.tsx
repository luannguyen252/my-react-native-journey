import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { HeartIcon, HeartIconFill } from "../Svg";

import { Box } from "./Theme";

const styles = StyleSheet.create({
  container: {},
});

interface LikebuttonProps {}

const Likebutton = () => {
  const [like, setLike] = useState(false);
  return (
    <TouchableOpacity onPress={() => setLike(!like)}>
      <Box style={styles.container}>
        {like ? <HeartIconFill /> : <HeartIcon />}
      </Box>
    </TouchableOpacity>
  );
};

export default Likebutton;
