import React, { useState } from "react";
import Slider from "./Slider";
import Slide from "./Slide";

const slides = [
  {
    color: "#84CC16",
    btnColor: "#4D7C0F",
    title: "Green Detox",
    description:
      "For those of you who like the detox power of kale and spinach, this is the green juice for you! Our Green Detox packs in the leafy greens which gives it a bold taste with a slight zing of ginger. Cucumber provides a nice accent to keep the taste smooth and fresh.",
    picture: require("./assets/green-detox.png"),
    price: "2.75$",
  },
  {
    color: "#EC4899",
    btnColor: "#BE185D",
    title: "Sweet Beet",
    description:
      "The Sweet Beet is your liver’s best friend! Beets provide much needed assistance to cleanse your liver and helps purify blood. Combine that with high amounts of powerful nutrients present in carrots, cucumbers, and apples, and you have a juice that not only loves your liver, but your whole body.",
    picture: require("./assets/sweet-beet.png"),
    price: "2.75$",
  },
  {
    color: "#F59E0B",
    btnColor: "#B45309",
    title: "Ginger Breeze",
    description:
      "A classic combination of ginger, carrots, and apples, it’s a perfect way to cleanse your body. The primary ingredient, carrot juice, is high in Vitamin A which assists the liver in flushing out toxins from the body. The sweet addition of apples and spice of ginger makes for a refreshing juice.",
    picture: require("./assets/ginger-breeze.png"),
    price: "2.5$",
  },
  {
    color: "#F43F5E",
    btnColor: "#BE123C",
    title: "Ruby Rush",
    description:
      "This top seller is a carefully balanced blend of beet and watermelon. The beet juice supports detoxification and helps purify your blood and liver while the watermelon keeps you hydrated and refreshed. Simultaneously sweet and savory, the earthy undertones are complimented by lemon and ginger.",
    picture: require("./assets/ruby-rush.png"),
    price: "2.2$",
  },
  {
    color: "#22C55E",
    btnColor: "#15803D",
    title: "Mega Vitality",
    description:
      "Fiery and sweet, our Mega Vitality juice infuses a cool carrot base with a delicate citrus and ginger tang. A powerhouse blend of antioxidants, vitamins and minerals helps your body renew and balance from the inside out. Here’s to your Mega Vitality!",
    picture: require("./assets/mega-vitality.png"),
    price: "2.5$",
  },
];

export const assets = slides.map(({ picture }) => picture);

const LiquidSwipe = () => {
  const [index, setIndex] = useState(0);
  const prev = slides[index - 1];
  const next = slides[index + 1];
  return (
    <Slider
      key={index}
      index={index}
      setIndex={setIndex}
      prev={prev && <Slide slide={prev} />}
      next={next && <Slide slide={next} />}
    >
      <Slide slide={slides[index]!} />
    </Slider>
  );
};

export default LiquidSwipe;
