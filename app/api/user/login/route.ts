import { login } from "@/services/usuarios";
import { NextResponse } from "next/server";


export async function POST(
    request:Request
){
        const body = await request.json();

        try{
            const {email,senha} = body;

            const {token,user} = await login(email,senha);
            return NextResponse.json({ token, user }, { status: 200 });
        }catch (error) {
            return NextResponse.json({ error: `Error ${error}` }, { status: 401 });
        }
}