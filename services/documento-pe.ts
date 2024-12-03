import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


export const createDocumentoPE = async (
    nome: string,
    apelido: string,
    tipoDocumento: string,
    localizacao: string,
    contacto: string,
    status: string
) => {

    const documento = await prisma.documentosPerdidos.create({
        data: {
            nome,
            apelido,
            tipoDocumento,
            contacto,
            localizacao,
            status
        },
    });

    return documento;
};

export const getAllDocumentsPE = async () =>{
    const documentos = await prisma.documentosPerdidos.findMany();

    return documentos;
}

export const getDocumentsById = async (id : string) => {
    const documento = await prisma.documentosPerdidos.findUnique({
        where: {id}
    });

    return documento;
}

export const updateDocumentoPE = async(
        id: string,
        data: {
            nome?: string,
            apelido?: string,
            tipoDocumento?: string,
            localizacao?: string,
            status?: string
        }
) => {
    const  updatedDocumento = prisma.documentosPerdidos.update({
        where: {id},
        data
    });

    return updatedDocumento;
};

export const deleteDocumento = async(id: string) =>{
    const deletedDocumento = prisma.documentosPerdidos.delete({
        where:{id}
    });

    return deletedDocumento;
};