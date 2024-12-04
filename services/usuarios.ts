import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (
    nome: string,
    email: string,
    senha: string,
) => {

    const saltRounds = 10; // Número de rounds de hash
    const hashedPassword = await bcrypt.hash(senha, saltRounds);
    
    const User = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha:hashedPassword
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

export const updateUser = async (
    id:string,
    data:{
        nome?: string;
        emaail?: string;
    }
) => {
    const user = await prisma.usuario.update({
        where:{id},
        data
    });

    return user;
};

export const deleteUser = async (id: string) => {
    const user = await prisma.usuario.delete({
        where: {id}
    });

    return user;
};

