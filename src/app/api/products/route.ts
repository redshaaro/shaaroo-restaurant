import { handleErrorResponse } from "@/lib/handlerror";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");
  const search = searchParams.get("product");



  // FETCH SEARCHED PRODUCTS
  if (search) {
    try {
      const products = await prisma.product.findMany({
        where: {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          title: true,
          img: true,
          price: true

        }

      });

      if (products.length === 0) {
        return new NextResponse(
          JSON.stringify({ message: "No results found" }),
          { status: 200 }
        );
      } else {
        return new NextResponse(JSON.stringify(products), { status: 200 });
      }
    } catch (err) {
      console.log(err);
      return handleErrorResponse(500, "Something went wrong");
    }
  } else {
    // FETCH ALL PRODUCTS
    try {
      const products = await prisma.product.findMany({
        where: {
          ...(cat ? { catSlug: cat } : { isFeatured: true }),
        },
      });

      console.log("All Products:", products);

      return new NextResponse(JSON.stringify(products), { status: 200 });
    } catch (err) {
      console.log(err);
      return handleErrorResponse(500, "Something went wrong");
    }
  }
};
