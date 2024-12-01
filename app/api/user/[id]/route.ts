import { updateUser } from "@/services/usuarios";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(
    request: NextRequest,
    {params}: {params: Promise<{id:string}>}
){
    const {id} = await params;
    const body = await request.json();

    try{
        const updatedUser = await updateUser(id,body);
        return NextResponse.json(updatedUser);
    }catch (error) {
        return NextResponse.json(
            {error: `Error ao fazer a atualizacao do usuario: ${error}`},
            {status:500}
        );
    }
};