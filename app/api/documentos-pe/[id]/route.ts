import { getDocumentsById } from "@/services/documento-pe";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    {params} :{params: Promise<{id:string}>}

){
    const {id} = await params;
    try{
        const documentoPE = await getDocumentsById(id);

        if(!documentoPE){
            NextResponse.json(`Documento nao encontrado`,{status:404})
        }

        return NextResponse.json(documentoPE);
    } catch(error){
        return NextResponse.json({error:`Erro ao buscar o Documento ${error}`},{status:500});
    };
};

