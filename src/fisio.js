// Ejercicios de fisioterapia (hoja del fisio). Son siempre los mismos.
// Cada ejercicio tiene su dibujo en public/fisio/<id>.png (2 fotogramas de 64x40 px).
// Para cambiar series o repeticiones, edita aquí y haz push.

export const FISIO_INTRO =
  "Los ejercicios del fisio, aparte de los entrenos. Zonas: sóleo, isquiotibial y sacro. Márcalos cuando los hagas.";

export const FISIO = [
  {
    id: "puente",
    name: "Puente de glúteo",
    zone: "Glúteo",
    sets: 3,
    target: "12 veces",
    note: "Espalda y pies en el suelo, rodillas flexionadas. Sube el glúteo.",
  },
  {
    id: "puente-cruzado",
    name: "Puente con pierna cruzada",
    zone: "Glúteo",
    sets: 3,
    target: "8 veces",
    note: "Un tobillo sobre la rodilla contraria. Sube el glúteo.",
  },
  {
    id: "sacro",
    name: "Estiramiento del sacro",
    zone: "Sacro",
    sets: 3,
    target: "6 rebotes",
    note: "De pie, con los pies bajo el cuerpo. Empuja el sacro hacia delante con las manos y, al llegar al máximo, rebotes hacia delante.",
  },
  {
    id: "isquio",
    name: "Isquiotibial, piernas estiradas",
    zone: "Isquiotibial",
    sets: 3,
    target: "12 rebotes",
    note: "De pie, tronco hacia delante lo más paralelo al suelo y piernas estiradas. Repite girando el tronco hacia cada pierna.",
  },
  {
    id: "soleo-tronco",
    name: "Sóleo, tronco hacia delante",
    zone: "Sóleo",
    sets: 3,
    target: "12 rebotes",
    note: "Igual que el isquiotibial pero con la rodilla flexionada, para estirar el sóleo.",
  },
  {
    id: "gemelo",
    name: "Gemelo, rebotes hacia abajo",
    zone: "Gemelo",
    sets: 4,
    target: "12 rebotes",
    note: "De pie, inclinado hacia delante (puedes apoyarte en algo), con las puntas en un escalón. Rebotitos hacia abajo con el talón para dar flexibilidad al gemelo.",
  },
  {
    id: "soleo",
    name: "Sóleo, rebotes con rodilla flexionada",
    zone: "Sóleo",
    sets: 4,
    target: "12 rebotes",
    note: "Igual que el del gemelo pero flexionando la rodilla, para tirar más del sóleo.",
  },
];
