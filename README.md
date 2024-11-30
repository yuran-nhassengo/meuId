Sistema de Documentos Perdidos e Encontrados
Este projeto é uma aplicação web desenvolvida com Next.js que tem como objetivo ajudar pessoas a encontrar documentos perdidos e permitir que outros publiquem documentos encontrados. A plataforma facilita a interação entre usuários, permitindo que publiquem e busquem documentos como passaportes, carteiras, RGs, entre outros, de forma simples e eficiente.

Funcionalidades
Publicação de Documentos Encontrados: Usuários podem registrar documentos encontrados, incluindo informações como tipo, descrição, localização e foto do documento.

Busca de Documentos Perdidos: Permite aos usuários procurar documentos perdidos utilizando filtros por tipo, localização e data.

Autenticação de Usuários: Utiliza NextAuth.js para autenticação, permitindo que os usuários se registrem e façam login para gerenciar seus documentos.

Notificações por E-mail: Quando um documento perdido é encontrado, o sistema notifica o usuário por e-mail.

Perfil de Usuário: Cada usuário tem um perfil onde pode visualizar e gerenciar os documentos que publicou ou procurou.

Tecnologias Utilizadas
Next.js: Framework React para o desenvolvimento do frontend e backend.
Prisma: ORM para manipulação do banco de dados (PostgreSQL ou MySQL).
NextAuth.js: Autenticação de usuários com integração ao banco de dados.
SendGrid: Serviço para envio de e-mails (notificações).
AWS S3/Cloudinary: Armazenamento de imagens dos documentos encontrados.