"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import { BASE_API_URL } from "@/utils/constants";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { fetchdata } from "@/lib/fetchdata";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  if (!BASE_API_URL) {
    return null;
  }
  const handleCheckout = async () => {
    if (!session) router.push("/login");

    const data = await fetchdata(`${BASE_API_URL}/api/orders`, "POST", {
      price: totalPrice,
      products,
      status: "not paied!!",
      userEmail: session?.user.email,
    });

    router.push(`/pay/${data.id}`);
  };

  return (
    <div className="   flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-y-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {/* SINGLE ITEM */}
        {products.map((item) => (
          <div
            className="flex items-center justify-between mb-4"
            key={`${item.id}-${item.optionTitle}`}
          >
            {item.img && (
              <Image className="hidden sm:block" src={item.img} alt="" width={100} height={100} />
            )}
            <div className="">
              <h1 className="uppercase text-sm sm:text-xl font-bold">
               <span>{item.title} </span>x<span>{item.quantity}</span>
              </h1>
              <span>{item.optionTitle}</span>
            </div>
            <h2 className="font-bold">${item.price}</h2>
            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(item)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-auto lg:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems} items)</span>
          <span className="">${Number(totalPrice).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">${Number(totalPrice).toFixed(2)}</span>
        </div>

        <button
          disabled={!products.length ? true : false}
          className={`bg-red-500 text-white p-3 rounded-md w-1/2 self-end ${
            !products.length && "cursor-not-allowed"
          }`}
          onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
