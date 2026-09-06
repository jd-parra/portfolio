import Escena from "./components/Escena";
import { arquitecturas } from "./data/arquitecturas";

const proyectos = [
  {
    nombre: "Leneo",
    contexto: "Beessync · desde 2025",
    que: "Producto de evaluación asistida por IA. Corrige tareas y genera retroalimentación pedagógica siguiendo las rúbricas de cada institución. Se distribuye como plugin oficial de Moodle, como API para cualquier LMS y como aplicaciones a medida.",
    hice: "Desarrollé el plugin de Moodle en PHP, el backend en Node.js y GraphQL, la plataforma independiente del plugin, el microfrontend que genera los reportes y el portal de pagos en Next.js.",
    stack: "PHP · Node.js · GraphQL · Next.js · Moodle API",
    url: "https://www.leneo.app/",
    enlace: "leneo.app",
    arq: arquitecturas.leneo,
  },
  {
    nombre: "Amigapp",
    contexto: "Beessync · tesis de grado",
    que: "Plataforma de menús digitales para restaurantes. Cada restaurante tiene su propio dominio y su menú se publica solo, sin que nadie toque un servidor.",
    hice: "Arquitectura multitenant en React y Next.js, con generación de enlaces dinámicos y despliegue automatizado por buckets. Servicios serverless en AWS Lambda y un worker de IA sobre MCP. Llevé el proyecto entero, del diseño al despliegue.",
    stack: "React · Next.js · AWS Lambda · S3 · Route 53",
    url: "https://amig.app/",
    enlace: "amig.app",
    arq: arquitecturas.amigapp,
  },
  {
    nombre: "maat.ai",
    contexto: "Maat · desde 2025",
    que: "Plataforma de validación de identidad y prevención de fraude. Verifica documentos oficiales y arma expedientes digitales para empresas de recursos humanos, financieras y aseguradoras.",
    hice: "Trabajo en el flujo de onboarding: escaneo OCR de documentos y validación de identidad en React, junto con el portal de sanitización de datos. También en la API principal en Go sobre Google Cloud, el portal B2B en Next.js y la app móvil en React Native.",
    stack: "React · Go · Next.js · React Native · Google Cloud",
    url: "https://www.maatai.com/",
    enlace: "maatai.com",
    arq: arquitecturas.maat,
  },
];

const masTrabajo = [
  {
    area: "Facturación electrónica y cobros",
    detalle:
      "Integraciones con QuickBooks, DGII (vía AWS Lambda) y Alanube. Backend de comprobantes fiscales y un sistema de suscripciones, cobros e invoices sobre Node.js y MongoDB.",
    donde: "Beessync · Qbshot",
  },
  {
    area: "Infraestructura y despliegue",
    detalle:
      "EC2, S3, CloudFront y Route 53. Servicios en Lambda, gestor de archivos sobre buckets y un sistema de notificaciones para microfrontends en Python.",
    donde: "Beessync",
  },
  {
    area: "Microservicios y APIs",
    detalle:
      "APIs GraphQL con Apollo y REST sobre Node.js. Microservicios de autenticación y de gestión de rutas de transportistas, con MySQL y JWT.",
    donde: "Beessync · Qbshot",
  },
  {
    area: "Integraciones con terceros",
    detalle:
      "NetSuite y Firebase para Wiki2all, la API de OpenAI para chat y workers, y contratos digitales sobre Web3 y Solidity.",
    donde: "Beessync · Wallet English",
  },
  {
    area: "Notificaciones",
    detalle:
      "Servicio SMTP y SMS con gestión de plantillas y API REST. Notificaciones por Lambda para arquitecturas de microfrontends.",
    donde: "Beessync",
  },
  {
    area: "Librería de iconos",
    detalle:
      "Paquete de iconos en React publicado en npm, usado por el resto de los frontends de la empresa.",
    donde: "Beessync",
  },
];

const stack = [
  ["Frontend", "React, Next.js, React Native, microfrontends"],
  ["Backend", "Node.js, PHP, Go, Python, GraphQL / Apollo, REST"],
  ["Infraestructura", "AWS (EC2, S3, Lambda, CloudFront, Route 53), Google Cloud"],
  ["Datos", "MongoDB, MySQL, Firebase"],
  ["Otros", "WordPress, Moodle API, Web3 / Solidity, npm"],
];

const link =
  "border-b border-[#1F5F5B]/40 pb-0.5 text-[#1F5F5B] transition-colors hover:border-[#1F5F5B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F5F5B]";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col px-6 py-16 sm:px-10 sm:py-24 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-20">
      <header className="order-2 mt-20 border-t border-[#D5D9D3] pt-8 lg:order-0 lg:sticky lg:top-24 lg:mt-0 lg:self-start lg:border-0 lg:pt-0">
        <nav className="font-display flex flex-wrap gap-x-6 gap-y-2 text-sm lg:flex-col lg:items-start lg:gap-2">
          <a href="mailto:juandiegoparrae5@gmail.com" className={link}>
            Correo
          </a>
          <a
            href="https://github.com/jd-parra"
            target="_blank"
            rel="noreferrer"
            className={link}
          >
            GitHub
          </a>
          <a href="/cv-juan-diego-parra.pdf" className={link}>
            Currículum
          </a>
        </nav>
      </header>

      <main className="order-1 lg:order-0">
        <h1 className="font-display max-w-[15ch] text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          Juan Diego Parra Escalona
        </h1>

        <p className="font-body mt-5 max-w-[50ch] text-xl leading-snug text-[#3C4340]">
          Desarrollador fullstack. Construyo plataformas completas: la
          interfaz, la API y el despliegue.
        </p>

        <p className="font-body mt-2 text-lg text-[#5A625F]">
          Mérida, Venezuela
        </p>

        <h2
          id="sobre"
          className="font-display mt-16 scroll-mt-24 text-sm font-medium tracking-tight text-[#1F5F5B]"
        >
          Sobre mí
        </h2>

        <div className="font-body mt-6 max-w-[62ch] space-y-6 text-lg leading-[1.7] text-[#262C2A]">
          <p>
            Soy desarrollador fullstack con cinco años de experiencia en
            React, Next.js, Node.js, GraphQL y AWS. Me gusta el trabajo de
            producto: entender qué necesita el usuario, diseñar la API que
            lo sostiene y llevarlo hasta el despliegue.
          </p>
          <p>
            Me encanta aprender cosas nuevas y no espero a que me las pidan,
            si algo hace falta, lo levanto. Trabajo bien con las personas, tomo
            decisiones y sostengo lo que construyo.
          </p>
        </div>

        <h2
          id="trabajo"
          className="font-display mt-20 scroll-mt-24 text-sm font-medium tracking-tight text-[#1F5F5B]"
        >
          En lo que he trabajado
        </h2>

        <div className="mt-6 divide-y divide-[#D5D9D3] border-t border-[#D5D9D3]">
          {proyectos.map((p) => (
            <article key={p.nombre} className="py-10">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {p.nombre}
                </h3>
                <p className="font-display text-sm text-[#5A625F]">
                  {p.contexto}
                </p>
              </div>

              <div className="font-body mt-4 max-w-[62ch] space-y-4 text-lg leading-[1.7] text-[#262C2A]">
                <p>{p.que}</p>
                <p>{p.hice}</p>
              </div>

              <p className="font-display mt-5 text-sm text-[#5A625F]">
                {p.stack}
              </p>

              <Escena arq={p.arq} />

              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className={`${link} font-display mt-4 inline-block text-sm`}
              >
                {p.enlace}
              </a>
            </article>
          ))}
        </div>

        <h2
          id="mas"
          className="font-display mt-24 scroll-mt-24 text-sm font-medium tracking-tight text-[#1F5F5B]"
        >
          Y algunas cosas más
        </h2>

        <p className="font-body mt-4 max-w-[62ch] text-lg leading-[1.7] text-[#262C2A]">
          Más de cuarenta proyectos en cinco años. Agrupados por lo que
          resuelven, en lugar de uno por uno:
        </p>

        <dl className="mt-8 divide-y divide-[#D5D9D3] border-t border-[#D5D9D3]">
          {masTrabajo.map((m) => (
            <div key={m.area} className="py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <dt className="font-display text-lg font-semibold tracking-tight">
                  {m.area}
                </dt>
                <span className="font-display text-sm text-[#5A625F]">
                  {m.donde}
                </span>
              </div>
              <dd className="font-body mt-2 max-w-[62ch] text-lg leading-[1.7] text-[#262C2A]">
                {m.detalle}
              </dd>
            </div>
          ))}
        </dl>

        <h2
          id="stack"
          className="font-display mt-24 scroll-mt-24 text-sm font-medium tracking-tight text-[#1F5F5B]"
        >
          Stack
        </h2>

        <dl className="mt-6 max-w-[62ch] space-y-3">
          {stack.map(([k, v]) => (
            <div key={k} className="font-body flex flex-wrap gap-x-4 text-lg">
              <dt className="font-display w-36 shrink-0 text-base font-semibold">
                {k}
              </dt>
              <dd className="text-[#262C2A]">{v}</dd>
            </div>
          ))}
        </dl>
      </main>
    </div>
  );
}