import * as React from "react";
import { Text, View, ImageBackground } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import styles, { _shadowStyle } from "./AppleCard.style";

interface IProps {
  style?: any;
  source: any; // ? Not Optional
  smallTitle?: string;
  largeTitle?: string;
  shadowColor?: string;
  footnoteText?: string;
  backgroundStyle?: any;
  footnoteTextStyle?: any;
  smallTitleTextStyle?: any;
  largeTitleTextStyle?: any;
  onPress: () => void;
}

const AppleCard: React.FC<IProps> = (props: IProps) => {
  const {
    source,
    style,
    shadowColor,
    footnoteText,
    footnoteTextStyle,
    backgroundStyle,
    smallTitle,
    largeTitle,
    smallTitleTextStyle,
    largeTitleTextStyle,
    onPress,
  } = props;

  return (
    <View style={_shadowStyle(shadowColor)}>
      <RNBounceable
        bounceEffect={0.95}
        bounceFriction={4}
        {...props}
        style={style}
        onPress={onPress}
      >
        <ImageBackground
          {...props}
          source={source}
          borderRadius={12}
          resizeMode="cover"
          style={[styles.backgroundStyle, backgroundStyle]}
        >
          <View style={styles.topHeaderContainer}>
            <Text style={[styles.smallTitleTextStyle, smallTitleTextStyle]}>
              {smallTitle}
            </Text>
            <Text style={[styles.largeTitleTextStyle, largeTitleTextStyle]}>
              {largeTitle}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={[styles.footnoteTextStyle, footnoteTextStyle]}>
              {footnoteText}
            </Text>
          </View>
        </ImageBackground>
      </RNBounceable>
    </View>
  );
};

AppleCard.defaultProps = {
  shadowColor: "#000",
  smallTitle: "New Game",
  largeTitle: "The Brilliance of Brawl Stars",
  footnoteText:
    "The next game from the markers of Clash Royale is here. Tap to learn more.",
};

export default AppleCard;
