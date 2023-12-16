import { MenuType } from "@/types/types";
import Link from "next/link";
import { BASE_API_URL } from "@/utils/constants";
import { fetchdata } from "@/lib/fetchdata";

import React from "react";

const MenuPage = async () => {
  if (!BASE_API_URL) {
    return null;
  }

  const menu: MenuType = await fetchdata(
    `${BASE_API_URL}/api/categories`,
    "GET"
  );
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {menu.map((category) => (
        <Link
          href={`/menu/${category?.slug}`}
          key={category.id}
          className="w-full h-1/3 bg-cover p-8 md:h-[53%]"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} w-1/2`}>
            <h1 className="uppercase font-bold text-[16px] sm:text-3xl leading-normal">{category.title}</h1>
            <p className="text-[12px] leading-normal sm:text-sm ">{category.desc}</p>
            
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
