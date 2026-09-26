export type TourStep = {
  id: string;
  title: string;
  description: string;
  function: string;
};

export const tourSteps: TourStep[] = [
  {
    id: "glomerulo",
    title: "El glomérulo renal",
    description:
      "Es la unidad de filtración del riñón: un ovillo de capilares envuelto por la cápsula de Bowman. Forma parte del corpúsculo renal, el primer eslabón de cada nefrona.",
    function:
      "Filtra la sangre para formar la orina primaria (filtrado glomerular), reteniendo células y la mayoría de las proteínas, y dejando pasar agua, electrolitos y pequeños solutos.",
  },
  {
    id: "capsula-bowman",
    title: "Cápsula de Bowman",
    description:
      "Capa epitelial que rodea el ovillo capilar. Entre su pared y los capilares queda el espacio capsular (espacio de Bowman), visible en azul claro en la ilustración.",
    function:
      "Recoge el líquido que sale de los capilares y lo canaliza hacia el polo urinario, inicio del túbulo renal.",
  },
  {
    id: "arteriolas",
    title: "Arteriolas aferente y eferente",
    description:
      "En el polo vascular (parte superior) entran y salen dos vasos de pared gruesa: la arteriola aferente lleva sangre al glomérulo y la eferente la drena.",
    function:
      "Regulan la presión hidrostática dentro de los capilares. Esa presión es la fuerza principal que impulsa la filtración.",
  },
  {
    id: "capilares",
    title: "Capilares glomerulares",
    description:
      "Red de vasos muy permeables que forman el centro del glomérulo. En el corte se ven eritrocitos dentro de su luz.",
    function:
      "Ofrecen una gran superficie de filtración: el plasma atraviesa su pared endotelial hacia el espacio de Bowman.",
  },
  {
    id: "podocitos",
    title: "Podocitos",
    description:
      "Células epiteliales especializadas (tono crema) que abrazan los capilares con prolongaciones llamadas pedicelos, formando una red tipo «rejilla».",
    function:
      "Integran la barrera de filtración: dejan pasar agua y solutos pequeños, e impiden que escapen proteínas grandes y células.",
  },
  {
    id: "mesangio",
    title: "Células mesangiales",
    description:
      "Red de células (tono violáceo) en el centro del ovillo, entre las asas capilares. Dan apoyo mecánico al glomérulo.",
    function:
      "Sostienen la estructura capilar, ayudan a limpiar residuos de la matriz y pueden modular el flujo sanguíneo local.",
  },
  {
    id: "polo-urinario",
    title: "Polo urinario",
    description:
      "En la parte inferior, la cápsula se abre hacia un tubo revestido de células cúbicas: el inicio del túbulo contorneado proximal.",
    function:
      "Es la salida del filtrado glomerular hacia el resto de la nefrona, donde se reabsorbe y se concentra la orina definitiva.",
  },
];
