"use client";
import Search from "@/components/Search";
import { useSearchParams } from "next/navigation";
import { fetchdata } from "@/lib/fetchdata";
import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "@/utils/constants";
import Card from "@/components/Card";
import { SearchedProduct } from "@/types/types";

const SearchPage = () => {
  const searchparams = useSearchParams();
  const query = searchparams.get("product");

  const [data, setData] = useState<SearchedProduct>([]);

  useEffect(() => {
    const getdata = async () => {
      if (query) {
        try {
          const responseData: SearchedProduct | null = await fetchdata(
            `${BASE_API_URL}/api/products/?product=${query}`,
            "GET"
          );
          setData(responseData ?? []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    getdata();
  }, [query]);

  return (
    <div className="min-h-[79vh] flex flex-col justify-around ">
      <Search />
      {Array.isArray(data) && data.length > 0 ? (
        <div className="flex flex-wrap text-red-500">
          {data.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              img={product.img}
              price={product.price}
            ></Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500">No results found</p>
      )}
    </div>
  );
};

export default SearchPage;
