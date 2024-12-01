import { deleteUser, getUserById, updateUser } from "@/services/usuarios";
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

export async function DELETE(
    request:NextRequest,
    {params}: {params: Promise<{id: string}>}
){
    const {id} = await params;
    try{
        const deletedUser = await deleteUser(id);
        return NextResponse.json(deletedUser);
    }catch(error){
        return NextResponse.json(
            {error: `Error ao remover o usuario: ${error}`},
            {status:500}
        );
    }
};

export async function GET (
    request: NextRequest,
    {params}: {params: Promise<{id: string}>}
){
    const {id} = await params;

    try{
        const user = await getUserById(id);

        if(!user){
            return NextResponse.json({error: `Usuario nao encontrado`},{status:404});
        }

        return NextResponse.json(user);
    }catch(error) {
        return NextResponse.json(
            {error: `Error ao Buscar o usuario: ${error}`},
            {status:500}
        );
    }
}

