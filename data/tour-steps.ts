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
    title: "Túbulo contorneado distal",
    description:
      "Porción de la nefrona situada después del asa de Henle y antes del túbulo colector. Pasa junto al glomérulo, y en ese punto sus células forman la mácula densa, parte del aparato yuxtaglomerular.",
    function:
      "Hace el ajuste fino del filtrado: reabsorbe sodio, cloro y calcio y los devuelve a la sangre, lo que ayuda a mantener el equilibrio de electrolitos y el volumen de líquidos. En la mácula densa detecta el NaCl y ayuda a regular la filtración y la liberación de renina.",
    image: "/tubulo_contorneado.jpg",
    marker: { x: 49, y: 5, label: 1 },
  },
  {
    id: "macula-densa",
    title: "Mácula densa",
    description:
      "Grupo de células especializadas del túbulo contorneado distal, ubicado muy cerca del glomérulo. Forma parte del aparato yuxtaglomerular.",
    function:
      "Detecta cambios de sodio y cloro (NaCl) en el líquido tubular. Si el NaCl baja, avisa a las células yuxtaglomerulares para que liberen renina, lo que ayuda a subir la presión arterial y a conservar sodio y agua.",
    image: "/macula_densa.jpg",
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
    title: "Células yuxtaglomerulares",
    description:
      "Células especializadas en la pared de la arteriola aferente, cerca del glomérulo. Forman parte del aparato yuxtaglomerular.",
    function:
      "Detectan cuando baja la presión sanguínea en la arteriola y liberan renina. Esta hormona inicia un proceso que sube la presión arterial y conserva sodio y agua, regulando así el equilibrio de líquidos del organismo.",
    image: "/celulas_yuxtaglomerulares.jpg",
    marker: { x: 47, y: 22, label: 5 },
  },
  {
    id: "mesangio-extraglomerular",
    title: "Mesangio extraglomerular",
    description:
      "Grupo de células ubicado fuera del glomérulo, entre la arteriola aferente, la arteriola eferente y la mácula densa. Forma parte del aparato yuxtaglomerular.",
    function:
      "Recibe y transmite señales entre la mácula densa y las arteriolas para coordinar el aparato yuxtaglomerular. Así ayuda a regular el flujo sanguíneo renal, la filtración glomerular y la liberación de renina.",
    image: "/mesangio_extraglomerular.jpg",
    marker: { x: 49, y: 24, label: 6 },
  },
  {
    id: "capsula-bowman",
    title: "Cápsula de Bowman",
    description:
      "Estructura en forma de copa que rodea al glomérulo. Tiene una capa externa (parietal) y una interna (visceral) formada por podocitos; entre ambas queda el espacio de Bowman.",
    function:
      "Recoge el filtrado glomerular y da inicio a la formación de la orina. El agua y las moléculas pequeñas cruzan los capilares hacia el espacio de Bowman, mientras las células y la mayoría de las proteínas se quedan en la sangre. Luego el filtrado pasa al túbulo contorneado proximal.",
    image: "/capsula.jpg",
    marker: { x: 65, y: 30, label: 7 },
  },
  {
    id: "espacio-bowman",
    title: "Espacio de Bowman",
    description:
      "Espacio entre las dos capas de la cápsula de Bowman que rodea al glomérulo. Allí se acumula el líquido filtrado desde la sangre.",
    function:
      "Recibe el agua y las sustancias pequeñas que atraviesan los capilares y las conduce al túbulo contorneado proximal. Es el primer lugar donde se recoge el líquido que dará origen a la orina.",
    image: "/espacio.jpg",
    marker: { x: 65, y: 47, label: 8 },
  },
  {
    id: "membrana-basal",
    title: "Membrana basal glomerular",
    description:
      "Capa especializada situada entre los capilares glomerulares y los podocitos. Forma parte de la barrera de filtración glomerular.",
    function:
      "Actúa como filtro selectivo: deja pasar agua y moléculas pequeñas, pero frena las grandes, sobre todo las proteínas, gracias a su estructura y su carga eléctrica negativa. Así evita que se pierdan proteínas en la orina y además da soporte a los capilares.",
    image: "/membrana_basal.jpg",
    marker: { x: 62, y: 59, label: 9 },
  },
  {
    id: "capilares-glomerulares",
    title: "Capilares glomerulares",
    description:
      "Red de pequeños vasos sanguíneos dentro del glomérulo, rodeados por podocitos. Forman parte de la barrera de filtración glomerular.",
    function:
      "La sangre llega por la arteriola aferente y circula por ellos. La presión empuja el agua y las moléculas pequeñas hacia el espacio de Bowman, mientras las células y la mayoría de las proteínas se quedan en la sangre. Así producen el filtrado glomerular que luego se convertirá en orina.",
    image: "/capilares_glomerulares.jpg",
    marker: { x: 62, y: 59, label: 10 },
  },
  {
    id: "podocitos",
    title: "Podocitos",
    description:
      "Células especializadas que recubren por fuera los capilares glomerulares. Forman la capa interna de la cápsula de Bowman y tienen prolongaciones llamadas pedicelos.",
    function:
      "Sus pedicelos se entrelazan y dejan hendiduras de filtración por donde pasan el agua y las moléculas pequeñas, mientras frenan las proteínas. Así forman y mantienen la barrera de filtración y evitan la pérdida de proteínas en la orina.",
    image: "/podocitos.jpg",
    marker: { x: 63, y: 42, label: 11 },
  },
  {
    id: "mesangio-intraglomerular",
    title: "Mesangio intraglomerular",
    description:
      "Conjunto de células y matriz de soporte ubicado dentro del glomérulo, entre los capilares glomerulares. Forma parte de la estructura que los sostiene.",
    function:
      "Da soporte a los capilares y ayuda a regular la filtración: sus células pueden contraerse y cambiar el área disponible para filtrar. También fagocitan residuos atrapados, manteniendo limpio el glomérulo.",
    image: "/mesangio_intraglomerular.jpg",
    marker: { x: 48, y: 45, label: 12 },
  },
  {
    id: "celula-epitelial",
    title: "Célula epitelial del túbulo proximal",
    description:
      "Célula que reviste el túbulo contorneado proximal, justo después de la cápsula de Bowman. Su superficie tiene muchas microvellosidades que forman el borde en cepillo.",
    function:
      "Reabsorbe gran parte del agua, el sodio, la glucosa, los aminoácidos y otras sustancias útiles del filtrado y las devuelve a la sangre. También secreta algunos desechos hacia el túbulo, lo que ayuda al equilibrio de agua y electrolitos.",
    image: "/celular_epitelial.jpg",
    marker: { x: 52.5, y: 90, label: 13 },
  },
  {
    id: "polo-urinario",
    title: "Polo urinario",
    description:
      "Zona del corpúsculo renal donde termina la cápsula de Bowman y comienza el túbulo contorneado proximal. Está en el lado opuesto al polo vascular.",
    function:
      "Conecta el corpúsculo renal con el túbulo proximal: el filtrado acumulado en el espacio de Bowman sale por aquí y continúa su recorrido por la nefrona.",
    image: "/polo.jpg",
    marker: { x: 49.5, y: 90, label: 14 },
  },
];
