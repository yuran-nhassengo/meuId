"use client"
import React, { useState ,  useRef} from "react";
import { Header } from "@/components/Header";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal } from "@/components/conta/modal";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { ModalError } from "@/components/conta/modalerror";
import { documentosEn } from "@/types/documentos";

const schemaStep1 = z.object({
    nomeCompleto: z.string().min(2, "O nome completo é obrigatório."),
    tipoDocumento: z.enum(["BI", "Passaporte", "Carta de Condução", "Outro"], {
        errorMap: () => ({ message: "Selecione um tipo de documento válido." }),
    }),
    numeroDocumento: z.string().nonempty("Número do documento é obrigatório."),
    dataPerda: z.string().nonempty("Data da perda é obrigatória."),
});


const schemaStep2 = z.object({
    nomeAchador: z.string().min(2, "O nome é obrigatório."),
    contacto: z.string()
        .min(8, "Número de celular inválido")
        .regex(
            /^(?:\+?\d{1,3})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/, 
            "Número de celular inválido"
        ),
});



const schemaStep3 = z.object({
    localizacao: z.string().min(5, "A localização é obrigatória."),
    fotoDocumento: z.any().refine((file) => file instanceof File, {
        message: "A foto do documento é obrigatória.",
    }),
});

const schemas = [
    schemaStep1, 
    schemaStep2, 
    schemaStep3, 
];


const stepLabels = ["Documento", "Achador", "Detalhes", "Resumo"];

const LostDocumentForm = () => {
    const [step, setStep] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<documentosEn>({
        nomeDocumento: "", 
        tipoDocumento: "",
        codigoDocumento: "",
        DataEncontrada: "",
        Foto: "",  
        nome: "",
        contacto: "",
        localizacao: "",
        status:"Pendente"
    });
    
    

    console.log("Current Schema:", schemas[step - 1]);

const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
} = useForm({
    resolver: zodResolver(schemas[step - 1] || schemas[0]),
    defaultValues: formData,
    mode: "onBlur",
});

    


const validateAllSteps = async () => {
    let isValid = true;
    for (let i = 0; i < schemas.length; i++) {
        const schema = schemas[i];
        const data = Object.fromEntries(
            Object.entries(formData).filter(([key]) => key in schema.shape)
        );
        try {
            schema.parse(data); // Valida o dado
        } catch (err) {
            isValid = false;
        }
    }
    return isValid;
};


const phoneInputRef = useRef(null); 

const onSubmit = async (data: any) => {
    const newFormData = { ...formData, ...data };
    setFormData(newFormData); 

    const onSubmit = async (data: any) => {
        const newFormData = { ...formData, ...data };
        setFormData(newFormData); 
    
        if (step === stepLabels.length) {
            const allValid = await validateAllSteps();
            if (!allValid) {
                setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
                return;
            }
            setErrorMessage("");
            setModalOpen(true);
        } else {
            const isValid = await trigger();
            if (isValid) {
                setErrorMessage("");
                setStep(step + 1);
            }
        }
    };
    
    if (step === stepLabels.length) {
        const allValid = await validateAllSteps();
        if (!allValid) {
            setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        setErrorMessage("");
        setModalOpen(true);

        try{

            const response = await fetch('/api/documentos-en',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newFormData),
            });

            const data = response.json();

            if (response.ok) {
                // Sucesso: Dados enviados corretamente
                console.log("Formulário enviado com sucesso:", data);
                // Fazer o que for necessário após o sucesso (ex: mostrar uma mensagem de sucesso)
            } else {
                // Erro na requisição
                console.error("Erro ao enviar o formulário:", data);
                setErrorMessage("Erro ao enviar o formulário, tente novamente.");
            }

        }catch(error){
            
            console.error("Erro de rede ou de comunicação:", error);
            setErrorMessage("Erro de rede. Por favor, tente novamente.");
        }

    } else {
        const isValid = await trigger();
        if (isValid) {
            setErrorMessage("");
            setStep(step + 1);
        }
    }
};


const [errorModalOpen, setErrorModalOpen] = useState(false);
const [errorMessage, setErrorMessage] = useState("");


const navigateToStep = async (targetStep: number) => {
    const isValid = await trigger();
    if (!isValid) {
        setErrorMessage("Complete os campos antes de avançar.");
        setErrorModalOpen(true);  
        return;
    }

    setStep(targetStep);
};





    const progressBarWidth = (step: number) => `${(step / stepLabels.length) * 100}%`;

    return (
        <div>
            <Header />
            <div className="flex mt-20 px-1 md:px-6">
                <div className="w-1/2 hidden md:block">
                    <img
                        src="https://elatoda.com.br/wp-content/uploads/2020/03/sozinha-2-olook.jpg"
                        alt="Imagem Institucional"
                        className="w-full h-screen object-cover rounded-lg"
                    />
                </div>
                <div className="md:w-1/2 w-full px-3 sm:px-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Formulário de Documentos Encontrados</h1>

                    {/* Barra de Progresso */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            {stepLabels.map((label, index) => (
                                <button
                                    key={index}
                                    onClick={() => navigateToStep(index + 1)}
                                    className={`text-sm font-medium ${step === index + 1
                                            ? "text-blue-600"
                                            : "text-gray-500"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                                style={{ width: progressBarWidth(step) }}
                            />
                        </div>
                    </div>


                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <ModalError
    isOpen={errorModalOpen}
    onClose={() => setErrorModalOpen(false)}
    title="Erro"
    message={errorMessage}  
/>

                       {/* Etapa 1 */}
{step === 1 && (
    <>
        <div>
            <label className="block text-lg font-semibold">Nome Completo</label>
            <Controller
    name="nomeDocumento"
    control={control}
    render={({ field }) => (
        <input
            {...field}
            className={`w-full p-2 border ${
                errors.nomeDocumento ? "border-red-500" : "border-gray-300"
            } rounded-md text-black`}
            placeholder="Digite seu nome completo"
        />
    )}
/>
{errors.nomeDocumento && (
    <p className="text-red-500 text-sm">{errors.nomeDocumento.message}</p>
)}

        </div>

        <div>
            <label className="block text-lg font-semibold">Tipo de Documento</label>
            <Controller
                name="tipoDocumento"
                control={control}
                render={({ field }) => (
                    <select
                        {...field}
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="BI">BI</option>
                        <option value="Passaporte">Passaporte</option>
                        <option value="Carta de Condução">Carta de Condução</option>
                        <option value="Outro">Outro</option>
                    </select>
                )}
            />
            {errors.tipoDocumento && (
                <p className="text-red-500 text-sm">{errors.tipoDocumento.message}</p>
            )}
        </div>

        <div>
            <label className="block text-lg font-semibold">Número do Documento</label>
            <Controller
                name="codigoDocumento"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                        placeholder="Digite o número"
                    />
                )}
            />
            {errors.codigoDocumento && (
                <p className="text-red-500 text-sm">{errors.codigoDocumento.message}</p>
            )}
        </div>

        <div>
            <label className="block text-lg font-semibold">Data Que Foi Encontrado</label>
            <Controller
                name="DataEncontrada"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                )}
            />
            {errors.DataEncontrada && (
                <p className="text-red-500 text-sm">{errors.DataEncontrada.message}</p>
            )}
        </div>
    </>
)}


                        {/* Etapa 2 */}
                        {step === 2 && (
                            <>




                                <div>
                                    <label className="block text-lg font-semibold">Nome do Achador</label>
                                    <Controller
                                        name="nome"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                className="w-full p-2 border border-gray-300 rounded-md text-black"
                                                placeholder="Digite seu nome"
                                            />
                                        )}
                                    />
                                    {errors.nome && (
                                        <p className="text-red-500 text-sm">{errors.nome.message}</p>
                                    )}
                                </div>

                                <div className="mb-4 ">
                                    <label className="block text-lg font-semibold">Número de Celular</label>
                                    <Controller
                                        name="contacto"
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
                                    {errors.contacto && <p className="text-red-500 text-sm">{errors.contacto.message}</p>}
                                </div>
                            </>
                        )}

                        {/* Etapa 3 */}
                        {step === 3 && (
                            
                            <div>
                                <div>

                                <label className="block text-lg font-semibold">Localização</label>
                                <Controller
                                    name="localizacao"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                                            placeholder="Digite a localização"
                                        />
                                    )}
                                    />
                                {errors.localizacao && (
                                    <p className="text-red-500 text-sm">{errors.localizacao.message}</p>
                                )}
                                </div>
                                <div>
    <label className="block text-lg font-semibold my-3">Foto do Documento</label>
    <Controller
        name="Foto"
        control={control}
        render={({ field }) => (
            <div>
                {!formData.Foto ? (
                    /* Área de upload inicial */
                    <div className="relative w-full p-6 border border-gray-300 rounded-2xl  text-center hover:bg-gray-300  duration-500 cursor-pointer transition-all ">
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                
                                if (file) {
                                    field.onChange(file); // Atualiza o valor no react-hook-form
                                    

                                    // Gera pré-visualização
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            previewFoto: reader.result as string,
                                        }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        <div className="flex flex-col items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-400 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5V12a9 9 0 019-9h.5m0 0L16.5 7m-3.5-4v6M12 15v6m0 0h3m-3 0H9"
                                />
                            </svg>
                            <p className="text-sm text-gray-600 font-medium">
                                Clique ou arraste para enviar uma foto
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="relative w-full h-60 rounded-2xl overflow-hidden transition-all bg-black dark:bg-gray-900 duration-500">
                        <img
                            src={formData.Foto}
                            alt="Pré-visualização do documento"
                            className="w-full h-full bg-cover object-contain"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prev) => ({
                                    ...prev,
                                    Foto: "",
                                }))
                            }
                            className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-2 rounded"
                        >
                            Remover
                        </button>
                    </div>
                )}

                {formData.Foto && (
                    <p className="text-sm text-green-600 mt-2">
                        Arquivo selecionado: {formData.Foto}
                    </p>
                )}

                {errors.Foto && (
                    <p className="text-red-500 text-sm mt-2">{errors.Foto.message}</p>
                )}
            </div>
        )}
    />
</div>
                            </div>
                            
                        )}

{step === 4 && (
    <div className="mt-4 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Resumo</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">

            <p>
                <strong>Nome Completo:</strong> {formData.nomeDocumento || "Não Confirmados"}
            </p>
            <p>
                <strong>Tipo de Documento:</strong> {formData.tipoDocumento || "Não Confirmados"}
            </p>

            
            <p>
                <strong>Número do Documento:</strong> {formData.codigoDocumento || "Não Confirmados"}
            </p>
            <p>
                <strong>Data da Perda:</strong> {formData.DataEncontrada || "Não Confirmados"}
            </p>


            <p>
                <strong>Nome do Achador:</strong> {formData.nome || "Não Confirmados"}
            </p>
            <p>
                <strong>Contacto:</strong> {formData.contacto || "Não Confirmados"}
            </p>

            
            <p>
                <strong>Localização:</strong> {formData.localizacao || "Não Confirmados"}
            </p>
            {formData.Foto && (
                 <div className="relative w-full h-48  overflow-hidden transition-all duration-500 col-span-1 lg:col-span-2 ">
                <strong>Foto do Documento:</strong>

                 <img
                     src={formData.Foto}
                     alt="Pré-visualização do documento"
                     className="w-full h-full bg-cover mt-1 object-contain"
                 />
                </div>
            )}
        </div>
    </div>
)}



<div className="flex justify-between pb-4">
    {step > 1 && (
        <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="px-6 py-2 bg-gray-500 text-white rounded-md"
        >
            Voltar
        </button>
    )}
    <button
    type="submit"
    className={`px-6 py-2 rounded-md ${
        step === stepLabels.length
            ? "bg-green-500 text-white"
            : "bg-blue-500 text-white"
    }`}
>
    {step === stepLabels.length ? "Finalizar" : "Confirmar"}
</button>

</div>

                    </form>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Envio Concluído"
                message="Suas informações foram enviadas com sucesso."
            />
        </div>
    );
};

export default LostDocumentForm;
