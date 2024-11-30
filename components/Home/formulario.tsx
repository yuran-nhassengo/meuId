"use client";

import { useState } from "react";

interface FormularioPublicacaoProps {
  onPublicar: (documento: {
    id: number;
    tipoDocumento: string;
    localEncontrado: string;
    dataEncontrado: string;
    fotoURL: string | null;
  }) => void;
}

export default function FormularioPublicacao({ onPublicar }: FormularioPublicacaoProps) {
  const [formData, setFormData] = useState({
    tipoDocumento: "",
    localEncontrado: "",
    autor: "",
    dataEncontrado: "",
    foto: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, foto: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fotoURL = formData.foto
      ? URL.createObjectURL(formData.foto)
      : null;

    const novaPublicacao = {
      id: Date.now(),
      tipoDocumento: formData.tipoDocumento,
      localEncontrado: formData.localEncontrado,
      dataEncontrado: formData.dataEncontrado,
      autor: formData.autor, 
      fotoURL,
    };

    onPublicar(novaPublicacao);

    setFormData({
      tipoDocumento: "",
      autor: "",
      localEncontrado: "",
      dataEncontrado: "",
      foto: null,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Publicar Documento Encontrado
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Documento
          </label>
          <select
            name="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="" disabled>
              Selecione o tipo de documento
            </option>
            <option value="Bilhete de Identidade">Bilhete de Identidade</option>
            <option value="Passaporte">Passaporte</option>
            <option value="Carta de Condução">Carta de Condução</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome da pessoa que  encontrou
          </label>
          <input
            type="text"
            name="autor"
            value={formData.autor}
            onChange={handleInputChange}
            placeholder="Ex: Maura"
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Local Onde Foi Encontrado
          </label>
          <input
            type="text"
            name="localEncontrado"
            value={formData.localEncontrado}
            onChange={handleInputChange}
            placeholder="Ex: Mercado Xipamanine"
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Encontrada
          </label>
          <input
            type="date"
            name="dataEncontrado"
            value={formData.dataEncontrado}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foto do Documento (opcional)
          </label>
          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}
