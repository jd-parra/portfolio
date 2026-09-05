const proyectos = [
  {
    nombre: "Leneo",
    contexto: "Beessync · desde 2025",
    que: "Producto de evaluación asistida por IA. Corrige tareas y genera retroalimentación pedagógica siguiendo las rúbricas de cada institución. Se distribuye como plugin oficial de Moodle, como API para cualquier LMS y como aplicaciones a medida.",
    hice: "Desarrollé el plugin de Moodle en PHP, el backend en Node.js y GraphQL, la plataforma independiente del plugin, el microfrontend que genera los reportes y el portal de pagos en Next.js.",
    url: "https://www.leneo.app/",
    enlace: "leneo.app",
  },
  {
    nombre: "Amigapp",
    contexto: "Beessync · tesis de grado",
    que: "Plataforma de menús digitales para restaurantes. Cada restaurante tiene su propio dominio y su menú se publica solo, sin que nadie toque un servidor.",
    hice: "Arquitectura multitenant en React y Next.js, con generación de enlaces dinámicos y despliegue automatizado por buckets. Servicios serverless en AWS Lambda y un worker de IA sobre MCP. Llevé el proyecto entero, del diseño al despliegue.",
    url: "https://amig.app/",
    enlace: "amig.app",
  },
  {
    nombre: "maat.ai",
    contexto: "Maat · desde 2025",
    que: "Plataforma de validación de identidad y prevención de fraude. Verifica documentos oficiales y arma expedientes digitales para empresas de recursos humanos, financieras y aseguradoras.",
    hice: "Trabajo en el flujo de onboarding: escaneo OCR de documentos y validación de identidad en React, junto con el portal de sanitización de datos. También en la API principal en Go sobre Google Cloud, el portal B2B en Next.js y la app móvil en React Native.",
    url: "https://www.maatai.com/",
    enlace: "maatai.com",
  },
];

const enlace =
  "border-b border-[#1F5F5B]/40 pb-0.5 text-[#1F5F5B] transition-colors hover:border-[#1F5F5B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F5F5B]";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:px-10 sm:py-32">
      <header>
        <p className="font-display text-sm tracking-tight text-[#5A625F]">
          Juan Diego Parra Escalona
        </p>

        <h1 className="font-display mt-6 max-w-2xl text-3xl font-semibold leading-[1.15] tracking-tight sm:text-[2.75rem]">
          Construyo el producto entero, de la pantalla al despliegue.
        </h1>

        <p className="font-body mt-6 text-lg leading-relaxed text-[#3C4340]">
          Desarrollador fullstack en Mérida, Venezuela.
        </p>

        <nav className="font-display mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="mailto:juandiegoparrae5@gmail.com" className={enlace}>
            juandiegoparrae5@gmail.com
          </a>
          <a href="https://github.com/jd-parra" className={enlace}>
            GitHub
          </a>
          <a href="/cv-juan-diego-parra.pdf" className={enlace}>
            Currículum
          </a>
        </nav>
      </header>

      <hr className="my-16 border-0 border-t border-[#D5D9D3]" />

      <section>
        <h2 className="font-display text-sm font-medium tracking-tight text-[#1F5F5B]">
          Sobre mí
        </h2>

        <div className="font-body mt-6 space-y-6 text-lg leading-[1.7] text-[#262C2A]">
          <p>
            Soy desarrollador fullstack con cinco años de experiencia en
            React, Next.js, Node.js, GraphQL y AWS. Me gusta el trabajo de
            producto: entender qué necesita el usuario, diseñar la API que
            lo sostiene y llevarlo hasta el despliegue.
          </p>
          <p>
            Me encanta aprender cosas nuevas y no espero a que me las pidan:
            si algo hace falta, lo levanto. Trabajo bien con la gente, tomo
            decisiones y sostengo lo que construyo.
          </p>
        </div>
      </section>

      <hr className="my-16 border-0 border-t border-[#D5D9D3]" />

      <section>
        <h2 className="font-display text-sm font-medium tracking-tight text-[#1F5F5B]">
          En lo que he trabajado
        </h2>

        <div className="mt-8 divide-y divide-[#D5D9D3]">
          {proyectos.map((p) => (
            <article key={p.nombre} className="py-8 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {p.nombre}
                </h3>
                <p className="font-display text-sm text-[#5A625F]">
                  {p.contexto}
                </p>
              </div>

              <p className="font-body mt-3 text-lg leading-[1.7] text-[#262C2A]">
                {p.que}
              </p>

              <p className="font-body mt-3 text-lg leading-[1.7] text-[#262C2A]">
                {p.hice}
              </p>

              <a href={p.url} className={`${enlace} font-display mt-4 inline-block text-sm`}>
                {p.enlace}
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}