import React from "react";
import { View } from "react-native";
import { MARGIN } from "./Config";
import Tile from "./Tile";
import SortableList from "./SortableList";
import colors from "../../../../assets/styles/colors";

const tiles = [
  {
    id: 1,
    bgColor: colors.red100,
    txtColor: colors.red600,
    delay: 150,
    name: "Red",
  },
  {
    id: 2,
    bgColor: colors.yellow100,
    txtColor: colors.yellow600,
    delay: 250,
    name: "Yellow",
  },
  {
    id: 3,
    bgColor: colors.green100,
    txtColor: colors.green600,
    delay: 350,
    name: "Green",
  },
  {
    id: 4,
    bgColor: colors.purple100,
    txtColor: colors.purple600,
    delay: 450,
    name: "Purple",
  },
  {
    id: 5,
    bgColor: colors.orange100,
    txtColor: colors.orange600,
    delay: 550,
    name: "Orange",
  },
  {
    id: 6,
    bgColor: colors.teal100,
    txtColor: colors.teal600,
    delay: 650,
    name: "Teal",
  },
  {
    id: 7,
    bgColor: colors.pink100,
    txtColor: colors.pink600,
    delay: 750,
    name: "Pink",
  },
  {
    id: 8,
    bgColor: colors.blue100,
    txtColor: colors.blue600,
    delay: 850,
    name: "Blue",
  },
];

const Chrome = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: MARGIN,
        paddingTop: 72,
      }}
    >
      <SortableList
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {/* {[...tiles, ...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + "-" + index}
            id={tile.id + "-" + index}
            color={tile.color}
          />
        ))} */}
        {[...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + "-" + index}
            id={tile.id + "-" + index}
            bgColor={tile.bgColor}
            txtColor={tile.txtColor}
            delay={tile.delay}
            name={tile.name}
          />
        ))}
      </SortableList>
    </View>
  );
};

export default Chrome;
