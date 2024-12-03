// Interface para Documentos Encontrados
export interface DocumentosEncontrados {
    id: string; // Identificador único do documento encontrado
    nome: string; // Nome da pessoa ou item relacionado ao documento
    tipoDocumento: string; // Tipo do documento
    contacto: string; // Número de contato relacionado
    linkImagem: string; // Link para a imagem associada ao documento
    descricao: string; // Descrição do documento encontrado
    localizacao: string; // Localização onde o documento foi encontrado
    usuarioId: string; // ID do usuário que registrou o documento encontrado
    usuario?: Usuario; // Relacionamento com o usuário que registrou o documento
  }
  
  // Interface para Documentos Perdidos
  export interface DocumentosPerdidos {
    id: string; // Identificador único do documento perdido
    nome: string; // Nome da pessoa ou item relacionado ao documento perdido
    tipoDocumento: string; // Tipo do documento
    contacto: string; // Número de contato relacionado
    descricao: string; // Descrição do documento perdido
    localizacao: string; // Localização onde o documento foi perdido
    usuarioId: string; // ID do usuário que registrou o documento perdido
    usuario?: Usuario; // Relacionamento com o usuário que registrou o documento
  }
  
  // Interface para o Usuário
  export interface Usuario {
    id: string; // Identificador único do usuário
    nome: string; // Nome do usuário
    apelido: string;
    genero:  string;
    dataNascimento: string;
    contacto:  string;
    email: string; // E-mail do usuário
    senha: string; // Senha do usuário (deve ser armazenada de forma segura, criptografada)
    documentos: DocumentosEncontrados[]; // Lista de documentos encontrados registrados pelo usuário
    documentosPerdidos: DocumentosPerdidos[]; // Lista de documentos perdidos registrados pelo usuário
  }
  