// Plan de las dos primeras semanas. Empieza el jueves 1 de octubre de 2026.
// Cada ejercicio define series y objetivo para la semana 1 y la semana 2.

export const WARMUP = [
  "Rotaciones de hombro con goma",
  "Colgado con escápulas activas, 3x10 s",
  "Círculos de muñeca",
  "Hollow y arch suaves",
];

const ex = (id, name, w1, w2, note = "", block = "principal") => ({
  id, name, note, block, weeks: [w1, w2],
});

export const DAYS = {
  A: {
    name: "Tirón",
    exercises: [
      ex("fl-tuck", "Front lever tuck", { sets: 3, target: "5-8 s" }, { sets: 4, target: "6-10 s" }, "Brazos rectos. Calidad antes que tiempo."),
      ex("dom-pausa", "Dominada estricta con pausa arriba", { sets: 3, target: "5 reps" }, { sets: 4, target: "5 reps" }, "Pausa de 1-2 s con la barbilla sobre la barra."),
      ex("tiron-alto", "Tirón alto explosivo hacia el ombligo", { sets: 3, target: "3 reps" }, { sets: 3, target: "4 reps" }, "Apunta a qué altura llegas: pecho, ombligo o cintura."),
      ex("hollow", "Hollow hold", { sets: 3, target: "20-30 s" }, { sets: 3, target: "25-30 s" }, "", "secundario"),
      ex("rodillas", "Elevación de rodillas estricta", { sets: 3, target: "8 reps" }, { sets: 3, target: "8 reps" }, "Sin balanceo.", "secundario"),
    ],
  },
  B: {
    name: "Empuje y posiciones",
    exercises: [
      ex("ring-support", "Ring support", { sets: 3, target: "15 s" }, { sets: 4, target: "15-20 s" }, "Codos bloqueados, anillas hacia fuera."),
      ex("fondos", "Fondos en anillas o paralelas", { sets: 3, target: "5 reps" }, { sets: 4, target: "5-6 reps" }, "Controlados, sin rebote abajo."),
      ex("pike", "Pike push-up o pino en pared", { sets: 3, target: "4-5 reps" }, { sets: 3, target: "4-5 reps" }),
      ex("lsit", "L-sit", { sets: 3, target: "10 s" }, { sets: 4, target: "10-12 s" }, "", "secundario"),
      ex("arch", "Arch hold", { sets: 3, target: "20 s" }, { sets: 3, target: "20 s" }, "", "secundario"),
    ],
  },
  C: {
    name: "Transición",
    exercises: [
      ex("fg-hang", "False grip hang", { sets: 3, target: "15 s" }, { sets: 3, target: "15 s" }),
      ex("neg-mu", "Negativas de muscle-up en anillas", { sets: 4, target: "2 reps de 3-5 s" }, { sets: 5, target: "2-3 reps de 3-5 s" }, "En el parque: negativas en barra."),
      ex("trans-goma", "Transiciones con goma", { sets: 3, target: "3 reps" }, { sets: 3, target: "3 reps" }),
      ex("dom-fg", "Dominadas con false grip", { sets: 3, target: "4 reps" }, { sets: 3, target: "4 reps" }),
      ex("fondos-prof", "Fondos profundos", { sets: 3, target: "5 reps" }, { sets: 3, target: "5 reps" }),
      ex("movilidad", "Escápulas, manguito y movilidad de hombro y muñeca", { sets: 1, target: "10 min" }, { sets: 1, target: "10 min" }, "", "secundario"),
    ],
  },
};

export const CALENDAR = [
  { date: "2026-10-01", day: "A", week: 1 },
  { date: "2026-10-03", day: "B", week: 1 },
  { date: "2026-10-06", day: "C", week: 1 },
  { date: "2026-10-08", day: "A", week: 2 },
  { date: "2026-10-10", day: "B", week: 2 },
  { date: "2026-10-13", day: "C", week: 2 },
];

export const WEEK_RULES = {
  1: "Termina cada serie con 2 repeticiones en reserva. Se trata de medir cómo responden hombros y codos, no de cansarte.",
  2: "Sube solo si la semana 1 fue limpia: sin molestias al día siguiente y con las posiciones bien hechas.",
};
