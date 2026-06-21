# 🤖 PFO 2: Prompt Engineering en Agentes de IA

Este repositorio contiene la resolución de la Práctica Formativa Obligatoria 2, cuyo objetivo es evaluar la capacidad de resolución autónoma de distintos agentes de desarrollo de software (IA) mediante la inyección de un único "One-Shot Prompt" de alta precisión.

## 👤 Datos del Estudiante
* **Nombre y Apellido:** Ivana Zandona
* **Institución:** IFTS N°29
* **Carrera:** Tecnicatura Superior en Desarrollo de Software

---

## 🚀 Deploy Unificado
La interfaz integradora que conecta a todos los agentes evaluados se encuentra desplegada en Vercel:
🔗 **[INGRESAR_AQUI_TU_LINK_DE_VERCEL](https://tu-link-de-vercel.vercel.app)**

---

## 📝 Prompt Maestro Utilizado
Este es el prompt exacto ejecutado en todos los agentes, sin alteraciones, respetando la restricción de no modificar el código generado manualmente:

> **Contexto y Rol**
> Actúa como un Desarrollador Frontend Senior experto en UI/UX y maquetación web. Tu objetivo es generar el código completo para una Landing Page moderna y completamente funcional sobre la experiencia de estudiantes evaluando la autonomía de agentes de Inteligencia Artificial mediante Prompt Engineering.
> 
> **Archivos a Generar**
> Debes inicializar el proyecto y crear desde cero los siguientes tres archivos en el directorio de trabajo (o proporcionar sus bloques de código completos si tu entorno no crea archivos físicos): `index.html`, `styles.css` y `app.js`. No asumas que los archivos ya existen.
> 
> **Reglas de Diseño y Estilo (Estricto)**
> 1. **Tipografía:** Utiliza exclusivamente Google Fonts. Aplica Space Grotesk para todos los títulos, subtítulos (h1 a h6) y elementos destacados. Aplica Inter para los párrafos, descripciones y textos generales.
> 2. **Paleta de Colores (Respeta los códigos hexadecimales exactamente):**
>    * Color Principal: `#db74cf`
>    * Color Secundario: `#ffa5f4`
>    * Color Complementario: `#ffdac0`
>    * Color de Fondo Oscuro: `#3d0b16`
>    * Color Neutro: `#8f827e`
>    * Color Claro: `#fffaf2`
> 3. **Maquetación y Animaciones CSS:** Utiliza exclusivamente CSS Grid y Flexbox. El diseño debe ser 100% responsive (Mobile First). Está absolutamente prohibido utilizar frameworks externos como Bootstrap o Tailwind. Todo el CSS debe ser puro. Implementa efectos visuales y transiciones decorativas fluidas. Tienes total libertad creativa para diseñar animaciones en los elementos (como efectos de hover en tarjetas y botones, o transformaciones) que consideres que mejoran la experiencia de usuario y se adaptan a la temática tecnológica.
> 4. **Interactividad (JavaScript):** Agrega un script para lograr una navegación con smooth scrolling hacia las secciones. Implementa interacciones visuales avanzadas y dinámicas mediante JavaScript. Tienes total libertad para elegir qué efectos creativos aplicar (por ejemplo, animaciones de entrada al hacer scroll, efectos visuales vinculados al movimiento del cursor o micro-interacciones en la interfaz). Sorpréndeme con tu capacidad para darle vida y dinamismo a la Landing Page.
> 5. **Recursos Visuales y Multimedia:** Tienes libertad para generar, diseñar en código o enlazar iconos en formato SVG puro, así como utilizar imágenes de prueba (placeholders) cuando lo consideres oportuno para enriquecer la interfaz. Sin embargo, está estrictamente prohibido el uso de emojis en cualquier parte del código, texto o diseño de la Landing Page.
> 
> **Requisitos de Contenido (Secciones Obligatorias)**
> La Landing Page debe estructurarse obligatoriamente con las siguientes secciones en este orden exacto:
> * **Cabecera (Header):** Un menú de navegación anclado (sticky) en la parte superior. Debe incluir un logo en texto ("AgentDevIA") y enlaces suaves a todas las secciones.
> * **Hero Section:** La sección principal. Debe tener el título impactante "El Futuro del Código, Sin Tocar el Código", un subtítulo explicativo y un botón de llamada a la acción (CTA) grande que diga "Ver Resultados".
> * **Sobre Nosotros (Descripción):** Un bloque de texto que explique cómo un grupo de estudiantes está poniendo a prueba a las herramientas de desarrollo impulsadas por IA, delegando el maquetado completo mediante ingeniería de instrucciones.
> * **Características Evaluadas (Servicios):** Un diseño en formato de tarjetas (Cards) que muestre 3 puntos clave que se están evaluando en los agentes: Autonomía de Código, Precisión del Prompt y Manejo de Tokens de Contexto.
> * **Testimonios (Reseñas):** Al menos 3 reseñas ficticias de estudiantes desarrolladores comentando su experiencia con el desafío de no modificar el código manualmente.
> * **Formulario de Contacto:** Un maquetado visual de un formulario (Nombre, Email, Mensaje, Botón de enviar) invitando a otros desarrolladores a compartir sus prompts. No requiere funcionalidad de backend.
> * **Pie de Página (Footer):** Enlaces ficticios a redes sociales (GitHub, LinkedIn) y un texto de derechos de autor que mencione el proyecto para la Tecnicatura Superior en Desarrollo de Software.
> 
> **Instrucción de Salida:**
> Entrega el código fuente completo y limpio de cada archivo. No omitas ninguna sección ni utilices placeholders como "aquí va tu código". Escribe el código listo para ser desplegado en producción.

---

## 📸 Capturas de Pantalla de los Sitios Generados

### 1. Agente: Antigravity (Modelo: Claude Sonnet 4.6 - Thinking)
> Breve observación: *[Opcional: Podés agregar acá qué tal le fue a este agente]*

![Captura Landing Page Antigravity](RUTA_A_TU_IMAGEN_ANTIGRAVITY.png)

### 2. Agente: Cursor (Modelo: Composer 2.5 Fast)
> Breve observación: *[Opcional: Podés agregar acá qué tal le fue a este agente]*

![Captura Landing Page Cursor](RUTA_A_TU_IMAGEN_CURSOR.png)

### Extra: Agente de Validación (Codex - GPT-5.5 Alto)
> Primer agente evaluado para validar el correcto diseño y límites del prompt.

![Captura Landing Page Codex](RUTA_A_TU_IMAGEN_CODEX.png)