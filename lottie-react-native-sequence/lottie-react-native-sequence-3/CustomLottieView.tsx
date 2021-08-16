import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";

interface Props {
  sources: string[];
  isRepeatLastJson: boolean;
  style?: StyleProp<ViewStyle>;
  LastComponent?: JSX.Element;
}

const CustomLottieView = (props: Props) => {
  const { sources, isRepeatLastJson, LastComponent = null } = props;
  const [index, setIndex] = useState(0);
  const [hide, setHide] = useState(false);
  const [showLastComponent, setShowLastComponent] = useState(false);

  const _onAnimationFinish = () => {
    const newIndex = (index + 1) % sources.length;

    if (newIndex === 0 && !LastComponent) {
      setHide(true);
      return;
    }

    if (newIndex === 0 && LastComponent) {
      setShowLastComponent(true);
      return;
    }

    setIndex((index + 1) % sources.length); //tăng index lên 1 khi onAnimationFinish được gọi, nếu index +1 === số lượng json thì reset về 0
  };

  const isLastJson = index === sources.length - 1; //index lần này có phải đang trỏ đên json cuối cùng?

  if (hide) return null;

  if (showLastComponent) return LastComponent;

  return (
    <LottieView
      {...props}
      key={`LottieView${index}`} //Render lại LottieView mỗi khi index thay đổi
      source={sources[index]}
      autoPlay={true}
      speed={1}
      loop={isLastJson && isRepeatLastJson} //Lặp lại json cuối khi isLastJson = true và isRepeatLastJson =true
      onAnimationFinish={
        isLastJson && isRepeatLastJson ? undefined : _onAnimationFinish
      }
    />
  );
};

export default CustomLottieView;
