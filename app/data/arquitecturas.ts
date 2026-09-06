export type Nodo = {
  id: string;
  label: string;
  desc: string;
  pos: [number, number, number];
};

export type Conexion = [string, string];

export type Arquitectura = {
  nodos: Nodo[];
  conexiones: Conexion[];
};

// Convención de z: las entradas al frente (z positivo), el almacenamiento
// al fondo (z negativo), el procesamiento en el plano medio.

export const leneo: Arquitectura = {
  nodos: [
    { id: "moodle", label: "Plugin de Moodle", desc: "El profesor manda a corregir sin salir de su aula.", pos: [-3, 1.5, 1] },
    { id: "plataforma", label: "Plataforma propia", desc: "La otra entrada, para quien no usa Moodle. Mismo backend.", pos: [-3, -1.5, 1] },
    { id: "api", label: "API GraphQL", desc: "La misma puerta para el plugin, para la plataforma o para otro LMS.", pos: [-1, 0, 0] },
    { id: "corrector", label: "Motor de corrección", desc: "Lee la entrega, la califica y explica cada nota.", pos: [1, 1, 0] },
    { id: "rubricas", label: "Rúbricas", desc: "Los criterios de cada institución. Sin ellas la nota no se parece a la del profesor.", pos: [1, -1, -1] },
    { id: "reportes", label: "Reportes", desc: "Convierte la corrección en algo que el profesor puede leer y discutir.", pos: [3, 1.5, 0.5] },
    { id: "pagos", label: "Portal de pagos", desc: "Cobra la licencia de cada institución.", pos: [-1, -2, 0.5] },
  ],
  conexiones: [
    ["moodle", "api"],
    ["plataforma", "api"],
    ["api", "corrector"],
    ["rubricas", "corrector"],
    ["corrector", "reportes"],
    ["plataforma", "pagos"],
  ],
};

export const amigapp: Arquitectura = {
  nodos: [
    { id: "panel", label: "Panel de administración", desc: "El dueño carga su menú y elige plantilla y dominio.", pos: [-3, 1.5, 1] },
    { id: "api", label: "API GraphQL", desc: "Recibe el alta y dispara el despliegue.", pos: [-1, 1.5, 0] },
    { id: "builder", label: "Builder", desc: "Clona la plantilla, inyecta la configuración y compila.", pos: [1, 1.5, 0] },
    { id: "bucket", label: "Bucket", desc: "Guarda el sitio compilado de ese restaurante.", pos: [3, 0.5, -1] },
    { id: "cdn", label: "CDN", desc: "Sirve el menú con el dominio y el certificado del cliente.", pos: [3, -1, 0.5] },
    { id: "dns", label: "DNS", desc: "Apunta sunombre.amig.app a su distribución.", pos: [1, -1.5, 0.5] },
    { id: "meta", label: "Metadata", desc: "Registro del sitio: plantilla, colores, logo, dominio.", pos: [-1, -1.5, -1] },
  ],
  conexiones: [
    ["panel", "api"],
    ["api", "builder"],
    ["builder", "bucket"],
    ["bucket", "cdn"],
    ["cdn", "dns"],
    ["builder", "meta"],
  ],
};

export const maat: Arquitectura = {
  nodos: [
    { id: "onboarding", label: "Onboarding", desc: "La persona se hace una foto y fotografía su documento, desde el móvil o el navegador.", pos: [-3, 0, 1] },
    { id: "ocr", label: "OCR", desc: "Lee el documento y saca los campos: nombre, número, fechas.", pos: [-1, 1.5, 0] },
    { id: "validacion", label: "Validación", desc: "Compara el rostro con el del documento y comprueba que el documento no esté alterado.", pos: [-1, -1.5, 0] },
    { id: "api", label: "API en Go", desc: "El núcleo, sobre Google Cloud. Junta las dos comprobaciones y decide, y guarda por qué.", pos: [1, 0, 0] },
    { id: "expediente", label: "Expediente", desc: "El legajo de esa persona: documentos, resultados y el rastro de cada decisión.", pos: [3, 1, -1] },
    { id: "sanitizacion", label: "Sanitización", desc: "Depura los datos del expediente antes de que salgan hacia la empresa.", pos: [3, -1.25, 0] },
    { id: "portal", label: "Portal B2B", desc: "La empresa consulta expedientes y resuelve a mano los casos dudosos.", pos: [1, -2.25, 0.5] },
  ],
  conexiones: [
    ["onboarding", "ocr"],
    ["onboarding", "validacion"],
    ["ocr", "api"],
    ["validacion", "api"],
    ["api", "expediente"],
    ["expediente", "sanitizacion"],
    ["sanitizacion", "portal"],
  ],
};

export const arquitecturas = { leneo, amigapp, maat };
