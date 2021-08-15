import React, {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";

import { AppContext, User, Product, ACTIONS } from "../../types";

interface ProviderProps {
  children: ReactNode;
}

export const SHIPPING_COST = 500;
export const IMPORT_CHARGES = 75;

const Context = createContext<AppContext>({
  isLoggedIn: false,
  setUserState: () => {},
  user: {},
  addUserDetails: () => {},
  cart: [],
  manageCart: () => {},
  isProductInCart: () => false,
  cartTotal: 0,
});

const Provider = ({ children }: ProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [user, setUser] = useState<User>({
    fullName: "Super Admin",
    email: "admin@admin.com",
    password: "12345",
  });

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => (total += item.count * item.price));
    setCartTotal(Number(total.toFixed(2)));
  };

  const isProductInCart = (item: Product) => {
    if (cart.find((product) => product.id === item.id)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const manageCart = (action: ACTIONS, product?: Product) => {
    let tempCart: Product[] = [];
    let updateProduct: Product;
    let updatedProductIndex = 0;
    switch (action) {
      case "ADD_TO_CART":
        if (isProductInCart(product!)) {
          return;
        }
        product!.count = 1;
        setCart([...cart, product!]);
        break;
      case "REMOVE_FROM_CART":
        setCart(cart.filter((cartItem) => cartItem.id !== product!.id));
        break;
      case "EMPTY_CART":
        setCart([]);
        break;
      case "INCREASE_COUNT":
        tempCart = [...cart];
        updatedProductIndex = tempCart.findIndex(
          (item) => item.id === product!.id
        );
        updateProduct = tempCart[updatedProductIndex];
        updateProduct.count++;
        tempCart[updatedProductIndex] = updateProduct;
        setCart(tempCart);
        break;
      case "DECREASE_COUNT":
        tempCart = [...cart];
        updatedProductIndex = tempCart.findIndex(
          (item) => item.id === product!.id
        );
        updateProduct = tempCart[updatedProductIndex];
        if (updateProduct.count === 1) {
          setCart(cart.filter((item) => item.id !== product!.id));
          return;
        }
        updateProduct.count--;
        tempCart[updatedProductIndex] = updateProduct;
        setCart(tempCart);
        break;
      default:
        break;
    }
  };

  const setUserState = (state: boolean) => {
    setIsLoggedIn(state);
  };

  const addUserDetails = (userDetails: User) => {
    setUser(userDetails);
  };

  const state: AppContext = {
    isLoggedIn,
    setUserState,
    user,
    addUserDetails,
    isProductInCart,
    manageCart,
    cart,
    cartTotal,
  };
  return <Context.Provider value={state}>{children}</Context.Provider>;
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
