export type MatchPair = {
  id: string;
  term: string;
  description: string;
};

export const PAIRS_PER_ROUND = 3;

export const matchPairs: MatchPair[] = [
  {
    id: "podocitos",
    term: "Podocitos",
    description:
      "Células con pedicelos que forman la capa visceral de la cápsula de Bowman.",
  },
  {
    id: "membrana-basal",
    term: "Membrana basal glomerular",
    description:
      "Capa con carga eléctrica negativa situada entre los capilares y los podocitos.",
  },
  {
    id: "macula-densa",
    term: "Mácula densa",
    description:
      "Células del túbulo contorneado distal que detectan la concentración de NaCl.",
  },
  {
    id: "celulas-yuxtaglomerulares",
    term: "Células yuxtaglomerulares",
    description:
      "Células de la pared de la arteriola aferente que liberan renina.",
  },
  {
    id: "mesangio-intraglomerular",
    term: "Mesangio intraglomerular",
    description:
      "Células entre los capilares glomerulares que se contraen y fagocitan residuos.",
  },
  {
    id: "mesangio-extraglomerular",
    term: "Mesangio extraglomerular",
    description:
      "Células fuera del glomérulo, entre las arteriolas y la mácula densa, que transmiten señales.",
  },
  {
    id: "celula-epitelial",
    term: "Célula epitelial del túbulo proximal",
    description:
      "Célula con borde en cepillo que reabsorbe agua, glucosa y aminoácidos.",
  },
  {
    id: "espacio-bowman",
    term: "Espacio de Bowman",
    description:
      "Espacio entre las dos capas de la cápsula donde se acumula el filtrado.",
  },
  {
    id: "arteriola-eferente",
    term: "Arteriola eferente",
    description:
      "Vaso más estrecho que sale del glomérulo y eleva la presión en los capilares.",
  },
];
