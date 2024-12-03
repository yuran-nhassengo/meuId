import { deleteDocumento, getDocumentsById, updateDocumentoPE } from "@/services/documento-pe";
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


export async function DELETE (
    {params} : {params: Promise<{id:string}>}
){
    const {id} = await params;

    try{
        const documentoPE = await deleteDocumento(id);
        return NextResponse.json(documentoPE);
    }catch(error){
        return NextResponse.json({error:`Falha ao remover documento ${error}`},{status:500});
    }
};

export async function PUT(
    request: NextRequest,
    {params}:{params:Promise<{id:string}>}
){
        const body = await request.json()
        const {id} = await params;

        try{
            const updatedDocumento = updateDocumentoPE(id,body);
            return NextResponse.json(updatedDocumento);
        }catch(error){
            return NextResponse.json({error:`Falha ao tentar atualizar o documento ${error}`},{status:500});
        }
};

