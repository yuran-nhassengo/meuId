import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const createUser = async (
    nome: string,
    email: string,
    senha: string,
) => {
    const User = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha
        },
    });

    return User;
} 