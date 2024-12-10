import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

const prisma = new PrismaClient();

export const createUser = async (
    nome: string,
    apelido: string,
    genero: string,
    dataNascimento: string,
    contacto: string,
    email: string,
    senha: string,
) => {

    const saltRounds = 10; // Número de rounds de hash
    const hashedPassword = await bcrypt.hash(senha, saltRounds);
    
    const User = await prisma.usuario.create({
        data: {
            nome,
            apelido,
            genero,
            dataNascimento,
            contacto,
            email,
            senha:hashedPassword
        },
    });

    return User;
} ;


export const login = async (email:string, senha:string) =>{

    
    
    const user = await prisma.usuario.findUnique({
        where:{email},
    })

    if(!user){
            throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
        throw new Error("Senha incorreta");
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string, 
        { expiresIn: "1h" } 
    );

    return {
        token,
        user: {
            id: user.id,
            nome: user.nome,
            apelido: user.apelido,
            genero: user.genero,
            dataNascimento: user.dataNascimento,
            contacto: user.contacto,
            email: user.email
        }
    };
};  

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

