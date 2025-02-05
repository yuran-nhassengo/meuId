"use client";
import { Header } from "@/components/Header/Header";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface UserProfile {
  name: string;
  email: string;
  phoneNumber: string;
  address?: string;
  city: string;
  country: string;
  nationality: string;
  birthDate: string;
  gender: string;
  maritalStatus: string;
  documentType: string;
  idNumber: string;
  issueDate: string;
  profilePictureUrl?: string;
}

const defaultProfilePicture =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Imagem padrão

const mockUserProfile: UserProfile = {
  name: "João Silva",
  email: "joao.silva@example.com",
  phoneNumber: "+351 912 345 678",
  address: "24 de Julho , 882 , Prédio Zitamar",
  city: "Maputo",
  country: "Moçambique",
  nationality: "Português",
  birthDate: "15/08/1990",
  gender: "Masculino",
  maritalStatus: "Solteiro",
  documentType: "Cartão de Cidadão",
  idNumber: "123456789",
  issueDate: "20/05/2015",
  profilePictureUrl: "https://laisschulz.com/wp-content/uploads/2024/01/poses-para-fotos-femininas-image-24.jpg", // Simula um usuário sem foto de perfil
};

const Perfil: React.FC = () => {
  const [userProfile] = useState<UserProfile>(mockUserProfile);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleEdit = () => {
    alert("Função de edição ainda está a ser implementada!");
  };

  // Gerando link do Google Maps baseado no endereço
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${userProfile.address}, ${userProfile.city}, ${userProfile.country}`
  )}`;

  return (
    <div>
      <Header />
      <div className="mt-16 bg-white dark:bg-black px-2 md:px-8 py-8 max-w-full mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Olá, {userProfile.name}</h1>
        <div className="bg-white dark:bg-gray-950 p-8 shadow-lg rounded-lg flex flex-col items-center space-y-6">
          {/* Foto de perfil */}
          <div className="relative" onClick={() => setIsModalOpen(true)} // Ao clicar abre o modal
          >
            <Image
              src={userProfile.profilePictureUrl || defaultProfilePicture}
              alt="Foto de Perfil"
              width={120}
              height={120}
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700 cursor-pointer"
              onClick={() => setIsModalOpen(true)} // Ao clicar abre o modal
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-32 h-32 border-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>

          {/* Modal para exibir a foto de perfil em tamanho maior */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-50">
              <div className="bg-white p-4 rounded-lg">
                <Image
                  src={userProfile.profilePictureUrl || defaultProfilePicture}
                  alt="Foto de Perfil Completa"
                  width={350}
                  height={350}
                  className="rounded-lg w-full h-auto  sm:w-80 md:w-96 lg:w-120 xl:w-140"
                />

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}

          {/* Nome e contato */}
          <div className="text-center">
            <p className="text-2xl font-semibold">{userProfile.name}</p>
            <p className="text-gray-600">{userProfile.email}</p>
            <p className="text-gray-600">{userProfile.phoneNumber}</p>
          </div>

          {/* Informações Pessoais e Documentação lado a lado */}
          <div className="flex flex-col md:flex-row md:space-x-8 w-full space-y-6 md:space-y-0">
            {/* Informações pessoais */}
            <div className="w-full space-y-3 text-gray-700 dark:text-gray-300">
              <p><strong>Gênero:</strong> {userProfile.gender}</p>
              <p><strong>Estado Civil:</strong> {userProfile.maritalStatus}</p>
              <p><strong>Data de Nascimento:</strong> {userProfile.birthDate}</p>
              <p><strong>Nacionalidade:</strong> {userProfile.nationality}</p>
            </div>

            {/* Documentação */}
            <div className="w-full space-y-3 text-gray-700 dark:text-gray-300">
              <p><strong>Tipo de Documento:</strong> {userProfile.documentType}</p>
              <p><strong>Número do Documento:</strong> {userProfile.idNumber}</p>
              <p><strong>Data de Emissão:</strong> {userProfile.issueDate}</p>
            </div>
          </div>

          {/* Endereço com link para o Google Maps */}
          <div className="w-full text-gray-700 dark:text-gray-300">
            <p>
              <strong>Endereço:</strong> {userProfile.address}, {userProfile.city}, {userProfile.country}
            </p>
            <Link
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Ver no Mapa
            </Link>
          </div>

          {/* Botão de edição */}
          <button
            onClick={handleEdit}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
