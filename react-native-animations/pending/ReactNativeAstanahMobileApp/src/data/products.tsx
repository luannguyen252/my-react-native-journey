import { Product } from "../../types";

const products: Product[] = [
  {
    id: 1,
    image: require("../../assets/products/product1.png"),
    title: "Gucci Mirabe Signature Edition Faux leather Sachel",
    price: 27000,
    discountPrice: 15000,
    description:
      "The Nike Air Max 270 React ENG combines a full-length React foam midsole with a 270 Max Air unit for unrivaled comfort and a striking visual experience.",
    ratings: 6,
    count: 0,
  },
  {
    id: 2,
    image: require("../../assets/products/product2.png"),
    title: "Prada Auth Leanardo Benucci Collection Special 2020",
    price: 35000,
    discountPrice: 20000,

    ratings: 4,
    count: 0,
  },
  {
    id: 3,
    image: require("../../assets/products/product3.png"),
    title: "New Balance Synthetic Leather Backpack",
    price: 35000,
    discountPrice: 20000,
    ratings: 8,
    count: 0,
  },
  {
    id: 4,
    image: require("../../assets/products/product4.png"),
    title: "Gene Bendi new Signature for Women",
    price: 35000,
    discountPrice: 10000,
    ratings: 2,
    count: 0,
  },
  {
    id: 5,
    image: require("../../assets/products/product5.png"),
    title: "FS Nike Air Max 270 Reaction Balance Pro",
    price: 35000,
    discountPrice: 20000,
    count: 0,
  },
];

export default products;
