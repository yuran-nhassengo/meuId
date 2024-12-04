"use client";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import MaskedInput from "react-text-mask";
import { Modal } from "@/components/conta/modal";



const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

const schemaStep1 = z.object({
    nome: z.string().min(2, "Nome é obrigatório"),
    apelido: z.string().min(2, "Apelido é obrigatório"),
    genero: z.enum(["Masculino", "Feminino", "Outro"], {
        errorMap: () => ({ message: "Selecione um gênero válido." }),
    }),
    dataNascimento: z.string()
        .min(1, "Data de nascimento é obrigatória")
        .refine((value) => {
            const [day, month, year] = value.split("/").map(Number);
            const inputDate = new Date(year, month - 1, day);
            const currentDate = new Date(currentYear, currentMonth - 1, currentDay);
            if (inputDate > currentDate) {
                return false;
            }

            if (month < 1 || month > 12) {
                return false;
            }

            if (day < 1 || day > 31) {
                return false;
            }

            const daysInMonth = new Date(year, month, 0).getDate();
            if (day > daysInMonth) {
                return false;
            }

            return true;
        }, {
            message: "A data de nascimento deve ser válida (Dia entre 1 e 31, Mês entre 1 e 12, Ano Diferente do atual).",
        }),
});

const schemaStep2 = z.object({
    celular: z.string().min(8, "Número de celular inválido"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmarSenha: z.string().min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmarSenha"],
});

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nome: "",
        apelido: "",
        genero: "",
        dataNascimento: "",
        celular: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(step === 1 ? schemaStep1 : schemaStep2),
        defaultValues: formData,
    });

    const onSubmit = (data: any) => {
        const newFormData = { ...formData, ...data };
        setFormData(newFormData);
        if (step === 3) {
            setModalOpen(true); // Abre o modal
        } else {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const progressBarWidth = (step: number) => `${(step / 3) * 100}%`;


    return (
        <div>
            <Header />
            <div className="flex mt-20  px-6">
                <div className="w-1/2 hidden md:block">
                    <img
                        src="https://laisschulz.com/wp-content/uploads/2024/01/poses-para-fotos-femininas-image-24.jpg"
                        alt="Imagem Institucional"
                        className="w-full h-screen object-cover rounded-lg"
                    />
                </div>

                <div className="md:w-1/2 w-full px-4 sm:px-8">
                    <h1 className="md:text-3xl text-2xl text-center md:text-start pt-4 font-bold mb-6">Formulário de Cadastro</h1>

                    {/* Barra de Progresso */}
                    <div className="w-full mb-4">
                        <div className="w-full bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-green-500 rounded-full"
                                style={{ width: progressBarWidth(step) }}
                            />
                        </div>
                        <div className="md:flex grid mt-1 md:mt-2 text-center md:justify-between text-sm text-gray-500">
                            {["Informações Pessoais", "Credências", "Resumo"].map((label, index) => (
                                <span
                                    key={index}
                                    onClick={() => setStep(index + 1)}
                                    className={`cursor-pointer ${step === index + 1 ? "font-bold" : ""}`}
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Etapas e Campos */}
                        {step === 1 && (
                            <>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="w-full md:w-1/2">
                                        <label className="block text-lg font-semibold">Nome</label>
                                        <Controller
                                            name="nome"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                                                    placeholder="Digite Seu Nome"
                                                />
                                            )}
                                        />
                                        {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label className="block text-lg font-semibold">Apelido</label>
                                        <Controller
                                            name="apelido"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                                                    placeholder="Digite Seu Apelido"

                                                />
                                            )}
                                        />
                                        {errors.apelido && <p className="text-red-500 text-sm">{errors.apelido.message}</p>}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-lg font-semibold">Gênero</label>
                                    <Controller
                                        name="genero"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="relative">
                                                <select
                                                    {...field}
                                                    className="appearance-none w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer text-black/60 "
                                                >
                                                    <option value="" disabled>
                                                        Selecione o seu Gênero
                                                    </option>
                                                    <option value="Masculino">Masculino</option>
                                                    <option value="Feminino">Feminino</option>
                                                    <option value="Outro">Outro</option>
                                                </select>
                                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                                    ▼
                                                </span>
                                            </div>
                                        )}
                                    />
                                    {errors.genero && <p className="text-red-500 text-sm">{errors.genero.message}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-lg font-semibold">Data de Nascimento</label>
                                    <Controller
                                        name="dataNascimento"
                                        control={control}
                                        render={({ field }) => (
                                            <MaskedInput
                                                {...field}
                                                mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                                                className="w-full p-2 border text-black border-gray-300 rounded-md"
                                                placeholder="DD/MM/AAAA"
                                            />
                                        )}
                                    />

                                    {errors.dataNascimento && <p className="text-red-500 text-sm">{errors.dataNascimento.message}</p>}
                                </div>
                            </>
                        )}

                        {/* Etapa 2 */}
                        {step === 2 && (
                            <>

                                <div className="mb-4">
                                    <label className="block text-lg font-semibold">Email</label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="email"
                                                className="w-full p-2 text-black border border-gray-300 rounded-md"
                                                placeholder="Digite Seu Email"
                                            />
                                        )}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                                <div className="mb-4 ">
                                    <label className="block text-lg font-semibold">Número de Celular</label>
                                    <Controller
                                        name="celular"
                                        control={control}
                                        render={({ field }) => (
                                            <PhoneInput
                                                {...field}
                                                country={"mz"}
                                                enableSearch
                                                containerClass="w-full text-black"
                                                inputClass="w-full text-black p-2 border border-gray-300 rounded-md"


                                            />
                                        )}
                                    />
                                    {errors.celular && <p className="text-red-500 text-sm">{errors.celular.message}</p>}
                                </div>


                                <div className="mb-4">
                                    <label className="block text-lg font-semibold">Senha</label>
                                    <Controller
                                        name="senha"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="password"
                                                className="w-full p-2 border text-black border-gray-300 rounded-md"
                                                placeholder="Digite Sua Senha"

                                            />
                                        )}
                                    />
                                    {errors.senha && <p className="text-red-500 text-sm">{errors.senha.message}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-lg font-semibold">Confirmar Senha</label>
                                    <Controller
                                        name="confirmarSenha"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="password"
                                                className="w-full p-2 text-black border border-gray-300 rounded-md"
                                                placeholder="Confirme Sua Senha"

                                            />
                                        )}
                                    />
                                    {errors.confirmarSenha && <p className="text-red-500 text-sm">{errors.confirmarSenha.message}</p>}
                                </div>
                            </>
                        )}

                        {/* Etapa 3 - Resumo */}
                        {step === 3 && (
                            <div className="mt-8 p-4 space-y-2 rounded-md">
                                <h2 className="text-2xl mb-8 font-bold">Resumo das Informações</h2>
                                <p><strong>Nome:</strong> {formData.nome} {formData.apelido}</p>
                                <p><strong>Gênero:</strong> {formData.genero}</p>
                                <p><strong>Data de Nascimento:</strong> {formData.dataNascimento}</p>
                                <p><strong>Email:</strong> {formData.email}</p>
                                <p><strong>Celular:</strong> {formData.celular}</p>
                            </div>
                        )}

                        {/* Navegação entre as etapas */}
                        <div className="flex justify-between pb-5 sm:p-0">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-6 py-2 bg-gray-500 text-white rounded-md"
                                >
                                    Voltar
                                </button>
                            )}
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-500 text-white rounded-md"
                            >
                                {step === 3 ? "Cadastrar" : "Próximo"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
               {/* Modal */}
               <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Cadastro Enviado"
                message="Parabéns! Seu cadastro foi concluído com sucesso. Aguarde a resposta da Direção"
            />
        </div>
    );
};

export default SignUp;


