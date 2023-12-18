"use client";
import { useState } from "react";
import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_API_URL } from "@/utils/constants";
import { fetchdata } from "@/lib/fetchdata";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const [state, setState] = useState("");

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }

  const { isLoading, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchdata(`${BASE_API_URL}/api/orders`, "GET"),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, state }: { id: string; state: string }) => {
      return fetchdata(`${BASE_API_URL}/api/orders/${id}`, "PUT", { state });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  if (!BASE_API_URL) {
    return null;
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    mutation.mutate({ id, state });
    setState("");
    toast.success("The order status has been changed!");
  };

  if (isLoading || status === "loading") return "Loading...";

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: OrderType) => (
            <tr
              className={`${item.status !== "delivered" && "bg-red-50"}`}
              key={item?.id}
            >
              <td className="hidden md:block py-6 px-1">{item?.id}</td>
              <td className="py-6 px-1">
                <ul>
                  <li>
                    Date: {item.createdAt.toString().slice(0, 10)}
                    <li>Time: {item.createdAt.toString().slice(11, 22)}</li>
                  </li>
                </ul>
              </td>
              <td className="py-6 px-1">{Number(item.price).toFixed(2)}</td>
              <td className="hidden md:block py-6 px-1">
                {item?.products?.map((product) => (
                  <ol key={product.id}>
                    {" "}
                    <li>
                      {product.quantity}X{product.title}
                      {product.optionTitle ? -product.optionTitle : ""}
                    </li>
                  </ol>
                ))}
              </td>
              {session?.user.isAdmin ? (
                <td>
                  <form
                    className="flex items-center justify-center gap-4"
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    <select
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                      className="p-2 ring-1 ring-red-100 rounded-md"
                    >
                      <option value="">Select Status</option>
                      <option value="delivered">delivered</option>
                      <option value="preparing">being prepared</option>
                      <option value="on-way">on-way</option>
                    </select>

                    <button
                      disabled={!state.length ? true : false}
                      type="submit"
                      className={`bg-red-400 p-2 rounded-full ${
                        !state.length && "cursor-not-allowed"
                      }`}
                    >
                      <Image src="/edit.png" alt="" width={20} height={20} />
                    </button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
