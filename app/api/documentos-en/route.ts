import { createDocumentoEncontrado, getAllDocumentsEncontrados } from "@/services/documento-en";
import { NextResponse } from "next/server";


export async function GET(){

    try{

        const documentos = await getAllDocumentsEncontrados();
        return NextResponse.json(documentos);

    }catch(error){

        return NextResponse.json({error:`Falha ao buscar Documentos ${error}`},{status:500})
    }
}

export async function POST(request:Request){

    const body = await request.json();

    try{

        
        const {nome,nomeDocumento,codigoDocumento,Foto,localizacao,contacto,tipoDocumento,status} = body;
        console.log("Dados que chegaram.......",body)
       

        // Passar os dados para o serviço
        const newDocumentoEn = await createDocumentoEncontrado(
            nomeDocumento,
            nome,
            codigoDocumento,
            Foto,
            tipoDocumento,
            localizacao,
            contacto,
            status
        );

        // Responder com os dados do novo documento
        return NextResponse.json(newDocumentoEn);


    } catch(error){
        return NextResponse.json({error:`Falha ao tentar publicar o Artigo ${error}`},{status:500});
    }
}