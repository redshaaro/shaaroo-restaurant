import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";


// CHANGE THE STATUS OF AN ORDER
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const body = await req.json();
    if (body === "delivered") {
      await prisma.order.delete({ where: { id: id } })
      return new NextResponse(
        JSON.stringify({ message: "Order has been deleted!" }),
        { status: 200 }
      );
    } else {
      await prisma.order.update({
        where: {
          id: id,
        },
        data: { status: body },
      });
      return new NextResponse(
        JSON.stringify({ message: "Order has been updated!" }),
        { status: 200 }
      );
    }



  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
