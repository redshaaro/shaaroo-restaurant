"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {BASE_API_URL} from "@/utils/constants"

import { useEffect } from "react";

const Success = () => {
  const searchparams = useSearchParams();
  const paymentIntent = searchparams.get("payment_intent");
  const router = useRouter();
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `${BASE_API_URL}/api/confirm/${paymentIntent}`,{method:"PUT"}
        );
        router.push("/orders")
      } catch (err) {
        console.log(err)
      }
    };
    makeRequest()
  }, [paymentIntent,router]);
  if(!BASE_API_URL){
    return null
  }
  return <div>Success Do not close the tab. Redirecting you to the orders dashboard</div>;
};

export default Success;
