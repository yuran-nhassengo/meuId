'use client';

import React, { useEffect, useState } from "react";
import { FaPlus, FaFileAlt, FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import FormularioPublicacao from "./formulario";
import Link from "next/link";
import { DocumentosEncontrados } from "@prisma/client";



export default function HomeInf() {
  const [publicacoes, setPublicacoes] = useState<DocumentosEncontrados[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filtro, setFiltro] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const [error, setError] = useState<string | null>(null);

   // Função para buscar dados da API
   const fetchPublicacoes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/documentos-en"); // URL da API (substitua com a URL correta)
      if (!response.ok) {
        throw new Error("Erro ao carregar dados.");
      }
      const data: DocumentosEncontrados[] = await response.json();
      setPublicacoes(data);
    } catch (error: any) {
      setError(error.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  // Chamada à API assim que o componente for montado
  useEffect(() => {
    fetchPublicacoes();
  }, []);

  const handleNovaPublicacao = (documento: DocumentosEncontrados) => {
    setPublicacoes((prev) => [documento, ...prev]);
    setShowForm(false); // Fecha o modal após publicação
  };

  const handleFiltroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltro(event.target.value);
  };

  const publicacoesFiltradas = filtro
    ? publicacoes.filter((doc) => doc.tipoDocumento === filtro)
    : publicacoes;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-400 via-white to-indigo-300 p-6">
    <div className="bg-white w-full max-w-6xl h-auto flex flex-col items-center justify-center mx-auto p-4">
  {/* Dropdown de Filtro */}
  <div className="w-full flex flex-col items-center gap-4 mt-6">
    <select
      value={filtro}
      onChange={handleFiltroChange}
      className="w-full max-w-md px-4 py-2 text-lg shadow-md text-black hover:bg-blue-700 transition-all"
    >
      <option value="">Todos os Documentos</option>
      <option value="Carta de Condução">Carta de Condução</option>
      <option value="passaporte">Passaporte</option>
      <option value="Bilhete de Identidade">Bilhete de Identidade</option>
    </select>

    {/* Botões */}
    <Link href="/form" className="w-full max-w-md">
      <button className="w-full px-4 py-2 text-lg shadow-md text-black hover:bg-blue-700 transition-all">
        Publicar Documento Encontrado
      </button>
    </Link>
    <button className="w-full max-w-md px-4 py-2 text-lg shadow-md text-black hover:bg-blue-700 transition-all">
      Buscar Documento
    </button>
  </div>
</div>

      <div className="max-w-6xl mx-auto">
        {/* Modal do formulário */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Publicar Documento Encontrado</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              {/* <FormularioPublicacao onPublicar={handleNovaPublicacao} /> */}
            </div>
          </div>
        )}

        {/* Lista de publicações */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">
            Documentos Publicados
          </h2>
          {publicacoesFiltradas.length === 0 ? (
            <div className="flex flex-col items-center">
              <p className="text-gray-600 text-lg mb-4">
                Nenhuma publicação encontrada.
              </p>
              <img
                src="https://via.placeholder.com/300x200.png?text=Sem+Publicações"
                alt="Nenhuma publicação"
                className="rounded-lg shadow-md"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {publicacoesFiltradas.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <FaFileAlt className="text-indigo-500 text-2xl mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {doc.tipoDocumento}
                    </h3>
                  </div>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaMapMarkerAlt className="text-indigo-400 mr-2" />
                    <strong>Local:</strong> {doc.localizacao}
                  </p>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaCalendarAlt className="text-indigo-400 mr-2" />
                    <strong>Data:</strong> {2020}
                  </p>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaUser className="text-indigo-400 mr-2" />
                    <strong>Autor:</strong> {doc.nome}
                  </p>
                  {doc.linkImagem && (
                    <div className="mt-4">
                      <img
                        src={doc.linkImagem}
                        alt={doc.tipoDocumento}
                        className="w-full h-40 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
