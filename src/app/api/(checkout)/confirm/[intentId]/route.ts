import { prisma } from "@/utils/connect"
import { NextResponse } from "next/server"

export const PUT = async ({ params }: { params: { intentId: string } }) => {
    const { intentId } = params
    try {
        const order = await prisma.order.update({ where: { intent_id: intentId }, data: { status: "Being prepared" } })
        return new NextResponse(JSON.stringify("the order is updated"), { status: 200 })

    } catch (err) {
        return new NextResponse(JSON.stringify(err), { status: 500 })


    }


}