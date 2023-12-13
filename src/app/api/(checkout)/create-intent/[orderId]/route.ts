import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_SECRETE_KEY}`);


export const POST = async (request: NextRequest, { params }: { params: { orderId: string } }) => {
  const { orderId } = params;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100 * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { intent_id: paymentIntent.id },
    });

    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  }
  return new NextResponse(
    JSON.stringify({ message: "Order not found!" }),
    { status: 404 }
  );
};
