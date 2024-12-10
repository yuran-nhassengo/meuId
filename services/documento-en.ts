import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Interface documentosEn para documentos encontrados
export interface documentosEn {
    id: string,
    nomeDocumento: string, // nome do proprietário do documento
    nome: string, // nome de quem encontrou o documento
    codigoDocumento: string, // número do documento encontrado
    Foto: string, // foto do documento
    tipoDocumento: string, // tipo do documento
    localizacao: string, // local em que o documento foi encontrado
    contacto: string, // contato da pessoa que encontrou o documento
    DataEncontrada: string, // data em que o documento foi encontrado
    status: string, // status do documento (entregue, pendente)
}

// Função para criar um novo documento encontrado
export const createDocumentoEncontrado = async (
    nomeDocumento: string,
    nome: string,
    codigoDocumento: string,
    Foto: string,
    tipoDocumento: string,
    localizacao: string,
    contacto: string,
    DataEncontrada: string,
    status: string
) => {

    const documento = await prisma.documentosEncontrados.create({
        data: {
            nomeDocumento,
            nome,
            codigoDocumento,
            linkImagem: Foto,
            tipoDocumento,
            localizacao,
            contacto,
            status,
        },
    });

    return documento;
};

// Função para obter todos os documentos encontrados
export const getAllDocumentsEncontrados = async () => {
    const documentos = await prisma.documentosEncontrados.findMany();
    return documentos;
};

// Função para obter um documento específico encontrado pelo id
export const getDocumentsEncontradoById = async (id: string) => {
    const documento = await prisma.documentosEncontrados.findUnique({
        where: { id },
    });
    return documento;
};

// Função para atualizar um documento encontrado
export const updateDocumentoEncontrado = async (
    id: string,
    data: {
        nomeDocumento?: string,
        nome?: string,
        codigoDocumento?: string,
        Foto?: string,
        tipoDocumento?: string,
        localizacao?: string,
        status?: string,
    }
) => {
    const updatedDocumento = await prisma.documentosEncontrados.update({
        where: { id },
        data,
    });

    return updatedDocumento;
};

// Função para excluir um documento encontrado
export const deleteDocumentoEncontrado = async (id: string) => {
    const deletedDocumento = await prisma.documentosEncontrados.delete({
        where: { id },
    });

    return deletedDocumento;
};
