"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Success = () => {
  const searchparams = useSearchParams();
  const paymentIntent = searchparams.get("payment_intent");
  const router = useRouter();
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/confirm/${paymentIntent}`,{method:"PUT"}
        );
        router.push("/orders")
      } catch (err) {
        console.log(err)
      }
    };
    makeRequest()
  }, [paymentIntent,router]);
  return <div>Success</div>;
};

export default Success;
