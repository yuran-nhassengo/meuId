import { v2 as cloudinary } from 'cloudinary';

// Configuração do Cloudinary com a URL fornecida
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL, // Usando a URL do ambiente
});

export const uploadImageToCloudinary = async (file: File | null): Promise<string> => {
  if (!file) {
    throw new Error("Nenhum arquivo fornecido");
  }

  try {
    // Cria um FormData para enviar o arquivo de imagem
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "seu_preset");  // Defina seu preset no Cloudinary se necessário

    // Envia a imagem para o Cloudinary
    const response = await fetch('https://api.cloudinary.com/v1_1/dqxgmjjtm/image/upload', {
      method: 'POST',
      body: formData,
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error('Erro ao fazer upload para o Cloudinary');
    }

    const result = await response.json();

    // Retorna a URL segura da imagem
    return result.secure_url;
  } catch (error) {
    console.error("Erro ao enviar imagem para o Cloudinary:", error);
    throw new Error("Falha ao enviar a imagem");
  }
};
