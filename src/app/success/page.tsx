"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/utils/store";

import { BASE_API_URL } from "@/utils/constants";

import { useEffect } from "react";

const Success = () => {
  const { resetCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  const searchparams = useSearchParams();
  const paymentIntent = searchparams.get("payment_intent");
  const router = useRouter();
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `${BASE_API_URL}/api/confirm/${paymentIntent}`,
          { method: "PUT" }
        );
        if (res.ok) {
          router.push("/orders");
          resetCart();
        } else {
          throw new Error("Paymed Failed");
        }
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [paymentIntent, router, resetCart]);
  if (!BASE_API_URL) {
    return null;
  }
  return (
    <div>
      Success Do not close the tab. Redirecting you to the orders dashboard
    </div>
  );
};

export default Success;
