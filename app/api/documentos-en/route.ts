import { getAllDocumentsEncontrados } from "@/services/documento-en";
import { NextResponse } from "next/server";


export async function GET(){

    try{

        const documentos = await getAllDocumentsEncontrados();
        return NextResponse.json(documentos);

    }catch(error){

        return NextResponse.json({error:`Falha ao buscar Documentos ${error}`},{status:500})
    }
}