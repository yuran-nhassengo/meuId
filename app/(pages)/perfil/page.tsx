
"use client"
import { Header } from "@/components/Header";
import { useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  phoneNumber: string;
  address?: string;
  profilePictureUrl: string;
}

const mockUserProfile: UserProfile = {
  name: "João Silva",
  email: "joao.silva@example.com",
  phoneNumber: "+351 912 345 678",
  address: "Rua dos Exemplos, 123, Lisboa, Portugal",
  profilePictureUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQexxwaG6qMQt_I6TW_ezMQu3suyMWQPKmNgQ&s",
};

const Perfil: React.FC = () => {
  const [userProfile] = useState<UserProfile>(mockUserProfile);

  return (
    <div>
      <Header />
      <div className="mt-16 px-8">
        <h1 className="text-2xl font-bold mb-4">Perfil de Usuário</h1>
        <div className="bg-white dark:bg-gray-950 p-6 shadow-md rounded-lg flex items-center space-x-6">
          <img
            src={userProfile.profilePictureUrl}
            alt="Foto de Perfil"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <p className="text-lg font-semibold">Nome: {userProfile.name}</p>
            <p>Email: {userProfile.email}</p>
            <p>Telefone: {userProfile.phoneNumber}</p>
            {userProfile.address && <p>Endereço: {userProfile.address}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
