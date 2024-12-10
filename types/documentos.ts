

export interface documentosPe {
    id: string, 
    nome: string, // nome de quem perdeu o documento
    apelido: string, // nome de que achou
    tipoDocumento: string,
    localizacao: string , // localizacao de onde acha ter perdido o documento
    contacto: string, 
    dataPerdida: string, // data em que a pessoa publicou que perdeu o documento
    status: string // Pendente,encontrado,
}


export interface documentosEn {
    id: string,
    nomeDocumento:string, // nome do proprietario do documento
    nome: string, // Nome de quem achou o documento
    codigoDocumento:string, // numero do documento encontrado
    Foto: string, // foto do documento
    tipoDocumento:string,
    localizacao: string, // localizacao em que o documento foi encontrado
    contacto: string, // contacto da pessoa que encontrou o documento
    DataEncontrada: string, // data de publicacao do documento encontrado
    status: string // entregue, pendente
}