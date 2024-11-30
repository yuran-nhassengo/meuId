export default function Introducao() {
    return (
      <section className=" py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold  mb-4">
            Perdeu um documento? Encontrou algo importante?
          </h1>
          <p className="text-lg  mb-6">
            Nossa plataforma conecta quem perdeu com quem encontrou. Seja publicando ou buscando documentos, 
            estamos aqui para tornar esse processo mais rápido, seguro e eficiente. Junte-se a nós e faça parte 
            dessa comunidade de ajuda mútua!
          </p>
          <div className="flex justify-center space-x-4">
            {/*<a
              href="/publish"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Publicar Documento
            </a>*/}
            <a
              href="/find"
              className="bg-gray-100 text-blue-600 px-6 py-3 rounded-lg text-lg shadow-md hover:bg-gray-200 transition-all"
            >
              Buscar Documento
            </a>
          </div>
        </div>
      </section>
    );
  }
  