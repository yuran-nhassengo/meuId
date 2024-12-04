import { createUser, getAllUser } from "@/services/usuarios";
import { NextResponse } from "next/server";


export async  function GET() {
    try{
        const users = await getAllUser();
        return NextResponse.json(users);
    }catch (error) {
        return NextResponse.json({error: `Error ${error}`},{status: 500});
    }
} 

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const {nome,email,senha} = body;
        const newUser = await createUser(nome,email,senha);
        return NextResponse.json(newUser,{status: 201});

    }catch (error){
        return NextResponse.json({error: `Error ${error}`},{status: 500});

    }
}