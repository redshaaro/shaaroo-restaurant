import { NextResponse } from "next/server";

export const handleErrorResponse = (status: number, message: string) => {
    console.error(message);
    return new NextResponse(JSON.stringify({ message }), { status });
};