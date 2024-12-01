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
} ;


export const getAllUser = async () => {
    const users = await prisma.usuario.findMany();
    return users;
};

export const getUserById = async (id:string) =>{
    const user = await prisma.usuario.findUnique({
        where: {id}
    });
    return user;
};

