export type TourStep = {
  id: string;
  title: string;
  description: string;
  function: string;
  /** Ruta en /public; null = placeholder en UI */
  image: string | null;
  /** Posición del marcador en % sobre la imagen; null = sin número (paso intro) */
  marker: { x: number; y: number; label: number } | null;
};

export const tourSteps: TourStep[] = [
  
  {
    id: "glomerulo",
    title: "El glomérulo renal",
    description:
      "Red de capilares agrupados en forma de ovillo y encapsulados por la cápsula de Bowman. Juntos forman el corpúsculo renal, la primera unidad de filtración de la nefrona.",
    function:
      "Realiza la ultrafiltración del plasma: extrae agua, electrolitos y desechos como la urea y la creatinina, y retiene células sanguíneas y proteínas. Como la arteriola eferente es más estrecha que la aferente, la presión sube y empuja el líquido a través de una barrera de tres capas (endotelio fenestrado, membrana basal y podocitos). El ultrafiltrado cae en el espacio de Bowman y pasa al túbulo proximal.",
    image: null,
    marker: null,
  },
  {
    id: "tubulo-contorneado",
    title: "Tubulo contorneado distal",
    description:
      "Es la unidad de filtración del riñón: un ovillo de capilares envuelto por la cápsula de Bowman. Forma el corpúsculo renal, el primer eslabón de cada nefrona.",
    function:
      "Filtra la sangre para formar la orina primaria (filtrado glomerular), reteniendo células y la mayoría de las proteínas.",
    image: null,
    marker: { x: 49, y: 5, label: 1 },
  },
  {
    id: "macula-densa",
    title: "Mácula densa",
    description:
      "Grupo de células especializadas del túbulo distal (tono amarillo-verdoso) situadas en el polo vascular, junto a las arteriolas.",
    function:
      "Detectan la concentración de NaCl y ayudan a regular la tasa de filtración glomerular (TFG).",
    image: null,
    marker: { x: 47, y: 16, label: 2 },
  },
  {
    id: "arteriola-aferente",
    title: "Arteriola aferente",
    description:
      "Es la vía de acceso de la sangre no filtrada al corpúsculo renal, a través del polo vascular. Su pared de músculo liso puede dilatarse o contraerse según señales nerviosas y químicas.",
    function:
      "Regula el flujo hacia el glomérulo y la TFG. En su tramo final, las células yuxtaglomerulares liberan renina ante caídas de presión, activando el sistema renina-angiotensina-aldosterona.",
    image: "/arteriola_aferente.jpg",
    marker: { x: 36, y: 14, label: 3 },
  },
  {
    id: "arteriola-eferente",
    title: "Arteriola eferente",
    description:
      "Es el vaso que sale del glomérulo por el polo vascular con la sangre ya filtrada. Su pared muscular puede contraerse o dilatarse según señales hormonales y nerviosas.",
    function:
      "Al contraerse actúa como cuello de botella: sube la presión en los capilares y la TFG. Luego se ramifica en capilares peritubulares, clave para la reabsorción y secreción en los túbulos.",
    image: "/arteriola_eferente.jpg",
    marker: { x: 62, y: 14, label: 4 },
  },
  {
    id: "celulas-yuxtaglomerulares",
    title: "Celulas yuxtaglomerulares",
    description:
      "Es el vaso que sale del glomérulo por el polo vascular con la sangre ya filtrada. Su pared muscular puede contraerse o dilatarse según señales hormonales y nerviosas.",
    function:
      "Al contraerse actúa como cuello de botella: sube la presión en los capilares y la TFG. Luego se ramifica en capilares peritubulares, clave para la reabsorción y secreción en los túbulos.",
    image: "/arteriola_eferente.jpg",
    marker: { x: 47, y: 22, label: 5 },
  },
  {
    id: "mesangio-extraglomerular",
    title: "Mesangio extraglomerular",
    description:
      "Células y matriz (azul-verdosas) en el triángulo entre las arteriolas y la mácula densa, fuera del ovillo capilar.",
    function:
      "Brindan soporte estructural y comunican la mácula densa con las células yuxtaglomerulares.",
    image: null,
    marker: { x: 49, y: 24, label: 6 },
  },
  {
    id: "capsula-bowman",
    title: "Cápsula de Bowman",
    description:
      "Estructura en forma de copa (pared exterior beige) que rodea el ovillo capilar y forma el límite del corpúsculo renal.",
    function:
      "Recibe el filtrado que sale de los capilares y lo dirige hacia el polo urinario.",
    image: null,
    marker: { x: 65, y: 30, label: 7 },
  },
  {
    id: "espacio-bowman",
    title: "Espacio de Bowman",
    description:
      "Cavidad de tono azul claro entre la cápsula y el ovillo capilar, también llamada espacio urinario.",
    function:
      "Es donde se acumula el filtrado glomerular antes de pasar al túbulo proximal.",
    image: null,
    marker: { x: 65, y: 47, label: 8 },
  },
  {
    id: "capilar-glomerular",
    title: "Capilar glomerular",
    description:
      "Cavidad de tono azul claro entre la cápsula y el ovillo capilar, también llamada espacio urinario.",
    function:
      "Es donde se acumula el filtrado glomerular antes de pasar al túbulo proximal.",
    image: null,
    marker: { x: 63, y: 54, label: 9 },
  },
  {
    id: "capilares",
    title: "Capilares glomerulares",
    description:
      "Ovillo de capilares fenestrados en el centro del glomérulo. En el corte se ven eritrocitos dentro de su luz.",
    function:
      "Superficie principal de filtración: el plasma atraviesa su pared hacia el espacio de Bowman.",
    image: null,
    marker: { x: 62, y: 59, label: 10 },
  },
  {
    id: "podocitos",
    title: "Podocitos",
    description:
      "Células epiteliales crema con prolongaciones (pedicelos) que abrazan los capilares y forman parte de la barrera de filtración.",
    function:
      "Dejan pasar agua y solutos pequeños e impiden el paso de proteínas grandes y células.",
    image: null,
    marker: { x: 63, y: 42, label: 11 },
  },
  {
    id: "mesangio-intraglomerular",
    title: "Mesangio intraglomerular",
    description:
      "Red de células y matriz (tono violáceo) en el centro del ovillo, entre las asas capilares.",
    function:
      "Sostienen la estructura, fagocitan desechos y ayudan a regular el flujo sanguíneo local.",
    image: null,
    marker: { x: 48, y: 45, label: 12 },
  },
  {
    id: "membrana-basal",
    title: "Membrana basal glomerular",
    description:
      "Red de células y matriz (tono violáceo) en el centro del ovillo, entre las asas capilares.",
    function:
      "Sostienen la estructura, fagocitan desechos y ayudan a regular el flujo sanguíneo local.",
    image: null,
    marker: { x: 56, y: 70, label: 13 },
  },
  {
    id: "celula-epitelial",
    title: "Celula epitelial del túbulo proximal",
    description:
      "Red de células y matriz (tono violáceo) en el centro del ovillo, entre las asas capilares.",
    function:
      "Sostienen la estructura, fagocitan desechos y ayudan a regular el flujo sanguíneo local.",
    image: null,
    marker: { x: 52.5, y: 90, label: 14 },
  },
  {
    id: "polo-urinario",
    title: "Polo urinario",
    description:
      "En la parte inferior, la cápsula se abre hacia el inicio del túbulo contorneado proximal, revestido de células cúbicas.",
    function:
      "Salida del filtrado hacia el resto de la nefrona, donde se reabsorbe y se concentra la orina definitiva.",
    image: null,
    marker: { x: 49.5, y: 90, label: 15 },
  },
];
