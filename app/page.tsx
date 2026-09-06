import Escena from "./components/Escena";
import { FondoReactivo } from "./components/FondoReactivo";
import { ProveedorGuia } from "./components/guia";
import Mascota from "./components/Mascota";
import NavSecciones from "./components/NavSecciones";
import { Reveal } from "./components/Reveal";
import { ThemeToggle } from "./components/ThemeToggle";
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
  [
    "Infraestructura",
    "AWS (EC2, S3, Lambda, CloudFront, Route 53), Google Cloud",
  ],
  ["Datos", "MongoDB, MySQL, Firebase"],
  ["Otros", "WordPress, Moodle API, Web3 / Solidity, npm"],
];

const enlace = "link-underline font-sans text-sm text-link";

const cifras = [
  { valor: "+40", etiqueta: "proyectos" },
  { valor: "5", etiqueta: "años" },
  { valor: "∞", etiqueta: "ganas de aprender" },
];

const contactos = [
  { label: "Correo", href: "mailto:juandiegoparrae5@gmail.com" },
  { label: "GitHub", href: "https://github.com/jd-parra" },
  { label: "Currículum", href: "/cv-juan-diego-parra.pdf" },
];

function Etiqueta({ children }: { children: React.ReactNode }) {
  return <p className="font-sans text-sm font-medium text-link">{children}</p>;
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <FondoReactivo />

      <ProveedorGuia>
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-y-16 px-6 py-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-20 lg:px-10 lg:py-0">
          <aside className="order-2 lg:order-none lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:py-20">
            <NavSecciones />

            <div className="mt-12 hidden flex-col gap-8 lg:flex">
              <dl className="flex flex-col gap-3 border-l border-border pl-4">
                {cifras.map((c) => (
                  <div key={c.etiqueta} className="flex items-baseline gap-2">
                    <dt className="font-sans text-lg leading-none">
                      {c.valor}
                    </dt>
                    <dd className="font-sans text-xs text-muted-foreground">
                      {c.etiqueta}
                    </dd>
                  </div>
                ))}
              </dl>
              <Mascota />
            </div>

            <div className="flex flex-col gap-6 border-t border-border pt-8 lg:mt-0 lg:border-0 lg:pt-0">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-3">
                {contactos.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                      className={enlace}
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ThemeToggle />
            </div>
          </aside>

          <main className="order-1 max-w-2xl py-4 lg:order-none lg:py-20">
            <Reveal as="header">
              <h1 className="text-balance font-sans text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl">
                Juan Diego Parra Escalona
              </h1>
              <p className="mt-6 text-pretty text-xl leading-relaxed text-foreground/90">
                Desarrollador fullstack. Construyo plataformas completas: la
                interfaz, la API y el despliegue.
              </p>
              <p className="mt-3 text-lg text-muted-foreground">
                Mérida, Venezuela
              </p>
            </Reveal>

            <section id="sobre" className="scroll-mt-16 pt-24">
              <Reveal>
                <Etiqueta>Sobre mí</Etiqueta>
              </Reveal>
              <Reveal
                delay={80}
                className="mt-8 space-y-6 text-lg leading-relaxed"
              >
                <p>
                  Soy desarrollador fullstack con cinco años de experiencia en
                  React, Next.js, Node.js, GraphQL y AWS. Me gusta el trabajo de
                  producto: entender qué necesita el usuario, diseñar la API que
                  lo sostiene y llevarlo hasta el despliegue.
                </p>
                <p>
                  Me encanta aprender cosas nuevas y no espero a que me las
                  pidan, si algo hace falta, lo levanto. Trabajo bien con las
                  personas, tomo decisiones y sostengo lo que construyo.
                </p>
              </Reveal>
            </section>

            <section id="trabajo" className="scroll-mt-16 pt-24">
              <Reveal>
                <Etiqueta>En lo que he trabajado</Etiqueta>
              </Reveal>

              {proyectos.map((p, i) => (
                <Reveal
                  key={p.nombre}
                  delay={80}
                  className={`border-t border-border pt-10 ${
                    i === 0 ? "mt-8" : "mt-16"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h2 className="font-sans text-3xl font-bold tracking-tight">
                      {p.nombre}
                    </h2>
                    <span className="shrink-0 font-sans text-sm text-muted-foreground">
                      {p.contexto}
                    </span>
                  </div>

                  <div className="mt-6 space-y-6 text-lg leading-relaxed">
                    <p>{p.que}</p>
                    <p>{p.hice}</p>
                  </div>

                  <p className="mt-6 font-sans text-sm text-muted-foreground">
                    {p.stack}
                  </p>

                  <Escena arq={p.arq} />

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`${enlace} mt-8 inline-block`}
                  >
                    {p.enlace}
                  </a>
                </Reveal>
              ))}
            </section>

            <section id="mas" className="scroll-mt-16 pt-24">
              <Reveal>
                <Etiqueta>Y algunas cosas más</Etiqueta>
              </Reveal>

              <Reveal delay={80} className="mt-8">
                <p className="text-lg leading-relaxed">
                  Más de cuarenta proyectos en cinco años. Agrupados por lo que
                  resuelven, en lugar de uno por uno:
                </p>

                <dl className="mt-10 divide-y divide-border border-t border-border">
                  {masTrabajo.map((m) => (
                    <div key={m.area} className="py-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <dt className="font-sans text-lg font-semibold tracking-tight">
                          {m.area}
                        </dt>
                        <span className="font-sans text-sm text-muted-foreground">
                          {m.donde}
                        </span>
                      </div>
                      <dd className="mt-2 text-lg leading-relaxed">
                        {m.detalle}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </section>

            <section id="stack" className="scroll-mt-16 pb-24 pt-24">
              <Reveal>
                <Etiqueta>Stack</Etiqueta>
              </Reveal>

              <Reveal delay={80}>
                <dl className="mt-8 divide-y divide-border border-t border-border">
                  {stack.map(([k, v]) => (
                    <div
                      key={k}
                      className="grid gap-x-6 py-4 sm:grid-cols-[9rem_1fr] sm:items-baseline"
                    >
                      <dt className="font-sans text-sm text-muted-foreground">
                        {k}
                      </dt>
                      <dd className="mt-1 text-lg leading-snug sm:mt-0">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </section>
          </main>
        </div>
      </ProveedorGuia>
    </div>
  );
}
