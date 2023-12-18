import React from "react";
import Link from "next/link";
import Image from "next/image";
type Props = {
  id: string;
  img?: string;
  title: string;
  price: string;
};

const Card = ({ id, img, title, price }: Props) => {
  return (
    <Link
      className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
      href={`/product/${id}`}
    
    >
      {/* IMAGE CONTAINER */}
      {img && (
        <div className="relative h-[80%]">
          <Image src={img} alt="img" fill className="object-contain" />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="flex items-center justify-between font-bold">
        <h1 className="text-2xl uppercase p-2">{title}</h1>
        <h2 className="group-hover:hidden text-xl">${price}</h2>
        <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default Card;
