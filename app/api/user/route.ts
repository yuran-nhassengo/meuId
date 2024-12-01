import { getAllUser } from "@/services/usuarios";
import { NextResponse } from "next/server";


export async  function GET() {
    try{
        const users = await getAllUser();
        return NextResponse.json(users);
    }catch (error) {
        return NextResponse.json({error: `Error ${error}`},{status: 500});
    }
} 

