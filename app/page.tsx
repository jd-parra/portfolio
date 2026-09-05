export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:px-10 sm:py-32">
      <header>
        <p className="font-display text-sm tracking-tight text-[#5A625F]">
          Juan Diego Parra Escalona
        </p>

        <h1 className="font-display mt-6 max-w-2xl text-3xl font-semibold leading-[1.15] tracking-tight sm:text-[2.75rem]">
          Hago que dos sistemas que no fueron hechos para hablarse,
          hablen.
        </h1>

        <p className="font-body mt-6 text-lg leading-relaxed text-[#3C4340]">
          Desarrollador fullstack en Mérida, Venezuela. Integraciones,
          backend y despliegue.
        </p>

        <nav className="font-display mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            href="mailto:juandiegoparrae5@gmail.com"
            className="border-b border-[#1F5F5B]/40 pb-0.5 text-[#1F5F5B] transition-colors hover:border-[#1F5F5B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F5F5B]"
          >
            juandiegoparrae5@gmail.com
          </a>
          <a
            href="https://github.com/jd-parra"
            className="border-b border-[#1F5F5B]/40 pb-0.5 text-[#1F5F5B] transition-colors hover:border-[#1F5F5B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F5F5B]"
          >
            GitHub
          </a>
          <a
            href="/cv-juan-diego-parra.pdf"
            className="border-b border-[#1F5F5B]/40 pb-0.5 text-[#1F5F5B] transition-colors hover:border-[#1F5F5B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F5F5B]"
          >
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
            Llevo cinco años haciendo desarrollo web y móvil, casi siempre
            de punta a punta: frontend, backend y el despliegue.
          </p>
          <p>
            Lo que más he hecho son integraciones. Facturación electrónica
            con QuickBooks, DGII y Alanube. Pasarelas de cobro y
            suscripciones. Conexiones con NetSuite, Firebase y Moodle.
            También bastante infraestructura en AWS: Lambda, S3, CloudFront,
            Route 53.
          </p>
          <p>
            Trabajo sobre todo con React, Next.js, Node.js y PHP, y desde
            hace un tiempo con Go. Hago frontend sin problema, pero donde
            mejor me muevo es en lo de atrás: por qué algo se cae en
            producción, o cómo conectar dos sistemas que no fueron hechos
            para hablarse.
          </p>
        </div>
      </section>
    </main>
  );
}
