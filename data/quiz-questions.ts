export type QuizQuestion = {
  id: string;
  question: string;
  /** La primera opción es la correcta; se barajan al mostrar */
  options: string[];
  explanation: string;
  stepId: string;
};

export const QUESTIONS_PER_ROUND = 3;

export const quizQuestions: QuizQuestion[] = [
  {
    id: "capa-visceral",
    question: "¿Qué células forman la capa interna (visceral) de la cápsula de Bowman?",
    options: [
      "Podocitos",
      "Células mesangiales",
      "Células yuxtaglomerulares",
      "Células de la mácula densa",
    ],
    explanation:
      "La cápsula de Bowman tiene una capa externa (parietal) y una interna (visceral) formada por podocitos.",
    stepId: "capsula-bowman",
  },
  {
    id: "barrera-filtracion",
    question: "¿Cuáles son las tres capas de la barrera de filtración glomerular?",
    options: [
      "Endotelio fenestrado, membrana basal y podocitos",
      "Capa parietal, espacio de Bowman y túbulo proximal",
      "Mácula densa, mesangio y células yuxtaglomerulares",
      "Endotelio, músculo liso y borde en cepillo",
    ],
    explanation:
      "El líquido filtrado atraviesa el endotelio fenestrado de los capilares, la membrana basal glomerular y los podocitos.",
    stepId: "glomerulo",
  },
  {
    id: "membrana-carga",
    question: "¿Qué característica de la membrana basal glomerular ayuda a frenar el paso de proteínas?",
    options: [
      "Su carga eléctrica negativa",
      "Sus microvellosidades",
      "Su capacidad de contraerse",
      "La liberación de renina",
    ],
    explanation:
      "Además de su estructura, la carga eléctrica negativa de la membrana basal frena las proteínas y evita que se pierdan en la orina.",
    stepId: "membrana-basal",
  },
  {
    id: "hendiduras",
    question: "¿Cómo se llaman los espacios que dejan los pedicelos de los podocitos al entrelazarse?",
    options: [
      "Hendiduras de filtración",
      "Fenestraciones",
      "Borde en cepillo",
      "Polo urinario",
    ],
    explanation:
      "Los pedicelos se entrelazan y dejan hendiduras de filtración por donde pasan el agua y las moléculas pequeñas.",
    stepId: "podocitos",
  },
  {
    id: "yuxtaglomerulares",
    question: "¿Dónde se ubican las células yuxtaglomerulares y qué liberan?",
    options: [
      "En la pared de la arteriola aferente; liberan renina",
      "En la pared de la arteriola eferente; liberan aldosterona",
      "En el túbulo proximal; liberan glucosa",
      "En el mesangio intraglomerular; liberan residuos",
    ],
    explanation:
      "Están en la pared de la arteriola aferente y liberan renina cuando baja la presión sanguínea.",
    stepId: "celulas-yuxtaglomerulares",
  },
  {
    id: "macula-origen",
    question: "La mácula densa es un grupo de células especializadas de:",
    options: [
      "El túbulo contorneado distal",
      "El túbulo contorneado proximal",
      "La arteriola aferente",
      "La cápsula de Bowman",
    ],
    explanation:
      "Donde el túbulo contorneado distal pasa junto al glomérulo, sus células forman la mácula densa, parte del aparato yuxtaglomerular.",
    stepId: "macula-densa",
  },
  {
    id: "borde-cepillo",
    question: "¿Qué caracteriza a la célula epitelial del túbulo proximal?",
    options: [
      "Un borde en cepillo formado por microvellosidades",
      "Prolongaciones llamadas pedicelos",
      "Un endotelio fenestrado",
      "Una pared de músculo liso",
    ],
    explanation:
      "Su superficie tiene muchas microvellosidades que forman el borde en cepillo, útil para reabsorber sustancias del filtrado.",
    stepId: "celula-epitelial",
  },
  {
    id: "mesangio-intra",
    question: "¿Dónde se ubica el mesangio intraglomerular y qué hace?",
    options: [
      "Entre los capilares glomerulares; se contrae y fagocita residuos",
      "Fuera del glomérulo, entre las arteriolas; transmite señales",
      "En el túbulo distal; detecta el NaCl",
      "En la pared de la arteriola aferente; libera renina",
    ],
    explanation:
      "Está dentro del glomérulo, entre los capilares. Sus células pueden contraerse para cambiar el área de filtración y fagocitan residuos.",
    stepId: "mesangio-intraglomerular",
  },
  {
    id: "presion",
    question: "¿Por qué sube la presión dentro de los capilares glomerulares?",
    options: [
      "Porque la arteriola eferente es más estrecha que la aferente",
      "Porque la mácula densa se contrae",
      "Porque los podocitos bombean la sangre",
      "Porque el espacio de Bowman se llena de sangre",
    ],
    explanation:
      "La arteriola eferente actúa como cuello de botella: al ser más estrecha, eleva la presión que empuja el líquido a través de la barrera.",
    stepId: "arteriola-eferente",
  },
];
