import { getAllDocumentsPE } from "@/services/documento-pe";
import { NextResponse } from "next/server";



export async function GET () {

    try {
            const documentosPE = await getAllDocumentsPE();
            return NextResponse.json(documentosPE);

    } catch(error) {
        
        return NextResponse.json({error:`Falha ao buscar Documentos ${error}`},{status:500})
    }

};

export async function POST (request: Request) {
        const body = await request.json();
    try {
            const {nome,apelido,tipoDocumento,localizacao,contacto} = body;
    }
}