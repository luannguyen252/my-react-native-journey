export interface Product {
  title: string;
  subtitle: string;
  color1: string;
  color2: string;
  bgBtnColor: string;
  txtColor: string;
  picture: number;
}

export const products = [
  {
    title: "Watermelon Breeze",
    subtitle:
      "watermelon grape juice blend, raspberry sherbet, strawberries, pineapples",
    color1: "#FECACA",
    color2: "#FCA5A5",
    bgBtnColor: "#B91C1C",
    txtColor: "#991B1B",
    picture: require("./assets/watermelonbreeze_smoothie.png"),
    aspectRatio: 1,
  },
  {
    title: "Aloha Pineapple",
    subtitle:
      "pineapple juice, pineapple sherbet, strawberries, bananas, nonfat Greek yogurt",
    color1: "#FDE68A",
    color2: "#FCD34D",
    bgBtnColor: "#B45309",
    txtColor: "#92400E",
    picture: require("./assets/alohapineapple_herosmoothie.png"),
    aspectRatio: 1,
  },
  {
    title: "Caribbean Passion",
    subtitle:
      "pear white grape mango orange passion juice blend, orange sherbet, strawberries, peaches",
    color1: "#FED7AA",
    color2: "#FDBA74",
    bgBtnColor: "#C2410C",
    txtColor: "#9A3412",
    picture: require("./assets/caribbeanpassion_herosmoothie.png"),
    aspectRatio: 1,
  },
  {
    title: "Summer Blackberry",
    subtitle:
      "blackberry pear juice blend, vanilla coconutmilk, oatmilk frozen dessert, pineapples",
    color1: "#E9D5FF",
    color2: "#D8B4FE",
    bgBtnColor: "#7E22CE",
    txtColor: "#6B21A8",
    picture: require("./assets/blackberry_smoothie.png"),
    aspectRatio: 1,
  },
  {
    title: "Apple 'N Greens",
    subtitle:
      "apple pear strawberry juice blend, kale, mangos, bananas, peaches",
    color1: "#A7F3D0",
    color2: "#6EE7B7",
    bgBtnColor: "#047857",
    txtColor: "#065F46",
    picture: require("./assets/applesngreens_herosmoothie.png"),
    // aspectRatio: 757 / 735,
    aspectRatio: 1,
  },
  {
    title: "Vanilla Blue Sky",
    subtitle:
      "unsweetened almondmilk, vanilla coconutmilk, bananas, pineapples, blue spirulina boost",
    color1: "#BFDBFE",
    color2: "#93C5FD",
    bgBtnColor: "#1D4ED8",
    txtColor: "#1E40AF",
    picture: require("./assets/vanillabluesky_herosmoothie.png"),
    aspectRatio: 1,
  },
];
