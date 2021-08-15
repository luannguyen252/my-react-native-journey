import React from "react";
import { Category } from "../../types";

import {
  BabyIcon,
  CreamIcon,
  MakeupIcon,
  ManiPedi,
  ShoeIcon,
  DrinksIcon,
  ChildIcon,
  WomanIcon,
  ManIcon,
  PhoneIcon,
  ClothingIcon,
  ChargerIcon,
  PerfumeIcon,
  LaptopIcon,
} from "../Svg";

const categories: Category[] = [
  {
    id: 1,
    label: "Shoes",
    icon: <ShoeIcon />,
  },
  {
    id: 2,
    label: "Baby & Child care",
    icon: <BabyIcon />,
  },

  {
    id: 3,
    label: "Health & Beauty",
    icon: <CreamIcon />,
  },
  {
    id: 4,
    label: "Manicure & Pedicure",
    icon: <ManiPedi />,
  },
  {
    id: 5,
    label: "Beer, Wine & Spirits",
    icon: <DrinksIcon />,
  },
  {
    id: 6,
    label: "Accessories",
    icon: <ChargerIcon />,
  },
  {
    id: 7,
    label: "Fragrances & Scents",
    icon: <PerfumeIcon />,
  },
  {
    id: 15,
    label: "Household Items",
  },
  {
    id: 16,
    label: "Plant Seeds",
  },
];

export default categories;
