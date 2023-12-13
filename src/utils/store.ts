import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,


      addToCart(item) {
        const products = get().products;
        const productIndex = products.findIndex(
          (product) => product.id === item.id && product.optionTitle === item.optionTitle
        );

        if (productIndex !== -1) {
          const updatedProducts = [...products];
          const existingProduct = updatedProducts[productIndex];
          existingProduct.quantity += item.quantity;
          existingProduct.price += item.price;

          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      }


      ,
      removeFromCart(item) {
        set((state) => {
          const updatedProducts = state.products.filter(
            (product) => !(product.id === item.id && product.optionTitle === item.optionTitle)
          );

          return {
            products: updatedProducts,
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price,
          };
        });
      }
      ,
      resetCart() {
        set(() => {
          return {
            products: INITIAL_STATE.products,
            totalItems: INITIAL_STATE.totalItems,
            totalPrice: INITIAL_STATE.totalPrice,
          }
        })
      }

    }),
    { name: "cart", skipHydration: true }
  )
);
