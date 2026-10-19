// Plan de entrenamiento: 3 sesiones por semana (A, B y C), sin fechas fijas.
// La fecha real de cada entreno se guarda al hacerlo.
//
// Tiene tres piezas:
// - EXERCISES: qué es cada ejercicio (para qué sirve, cómo se hace, qué vigilar).
// - PLAN: qué se hace cada semana en cada día (orden, series y objetivo).
// - SESSIONS: la secuencia de sesiones. Su id (s3-A...) es la clave con la que se guardan.
//
// Para añadir semanas: copia una semana en PLAN, ajusta los números, añade el número a WEEKS
// y su regla a WEEK_RULES. Las semanas ya hechas no se tocan.

export const WARMUP = [
  "Rotaciones de hombro con goma",
  "Colgado con escápulas activas, 3x10 s",
  "Círculos de muñeca",
  "Hollow y arch suaves",
];

export const DAYS = {
  A: { name: "Tirón" },
  B: { name: "Empuje y posiciones" },
  C: { name: "Transición" },
};

export const EXERCISES = {
  // ---------- Día A: tirón ----------
  "tiron-alto": {
    name: "Tirón alto explosivo hacia el ombligo",
    why: "Entrena la velocidad del tirón, que es lo que te sube el pecho hasta la barra o las anillas en el muscle-up. La altura llega con la velocidad, no con la fuerza máxima.",
    how: [
      "Cuelga con las escápulas activas, los hombros lejos de las orejas.",
      "Tira lo más rápido que puedas, llevando los codos hacia las caderas y no hacia delante.",
      "Intenta llevar el ombligo a la barra, con el cuerpo ligeramente inclinado hacia atrás.",
      "Baja con control y vuelve a colgar antes de la siguiente repetición.",
    ],
    watch: "Va primero, con el cuerpo fresco: con fatiga solo sale una dominada lenta. Para la serie en cuanto pierdas velocidad y descansa 2 minutos. Usa solo la goma necesaria para llegar al ombligo.",
  },
  "dom-pausa": {
    name: "Dominada estricta con pausa arriba",
    why: "Fuerza de tirón sin impulso. La pausa quita el rebote y te enseña a controlar la posición alta, que es donde empieza la transición.",
    how: [
      "Cuelga con los brazos estirados y las escápulas activas.",
      "Sube sin balancearte hasta pasar la barbilla por encima de la barra.",
      "Para 1-2 s arriba, con el pecho hacia la barra.",
      "Baja con control hasta estirar del todo los brazos.",
    ],
    watch: "Termina con 2 repeticiones en reserva. Si la última sale a trompicones, quita una repetición en la serie siguiente.",
  },
  "fl-tuck": {
    name: "Front lever tuck",
    why: "Fuerza de dorsal y de core con los brazos rectos. Es la base del front lever y te enseña a tirar con los hombros sin doblar los codos.",
    how: [
      "Cuelga de la barra y sube las rodillas hacia el pecho, con la espalda redondeada.",
      "Con los brazos rectos, lleva la cadera a la altura de los hombros hasta que la espalda quede paralela al suelo.",
      "Mantén la posición sin doblar los codos.",
      "Baja con control.",
    ],
    watch: "Brazos rectos y hombros hacia abajo, lejos de las orejas. Al principio cuesta y puede molestar en el hombro: si pincha, usa más goma o menos tiempo.",
  },
  "fl-tuck-goma": {
    name: "Front lever tuck con goma",
    why: "Lo mismo que el front lever tuck, pero con ayuda elástica para poder mantener la posición correcta sin llegar al fallo. Primero la posición limpia, después el tiempo.",
    how: [
      "Pasa la goma por la barra y colócala bajo los muslos o la cadera, para que te sostenga la parte baja del cuerpo.",
      "Cuelga y sube las rodillas hacia el pecho, con la espalda redondeada.",
      "Con los brazos rectos, lleva la cadera a la altura de los hombros hasta que la espalda quede paralela al suelo.",
      "Mantén el tiempo marcado y baja con control.",
    ],
    watch: "Quita goma solo cuando 3 series de 8 s salgan limpias, con los brazos rectos. Si el hombro pincha, usa más goma o menos tiempo.",
  },
  "hollow": {
    name: "Hollow hold",
    why: "Es la posición de core que sostiene todo lo gimnástico: cuerpo en forma de plátano con la zona lumbar pegada al suelo.",
    how: [
      "Tumbado boca arriba, pega la zona lumbar al suelo.",
      "Con las piernas rectas y los brazos a los lados, levanta hombros y piernas unos centímetros.",
      "Mantén la lumbar pegada y respira.",
    ],
    watch: "La lumbar no se despega del suelo. Si se despega, sube las piernas o dobla un poco las rodillas.",
  },
  "hollow-brazos": {
    name: "Hollow hold con brazos arriba",
    why: "La misma posición de core, más difícil con los brazos por encima de la cabeza. Se parece más a cómo vas colgado de la barra.",
    how: [
      "Tumbado boca arriba, pega la zona lumbar al suelo.",
      "Estira los brazos por encima de la cabeza y las piernas rectas.",
      "Levanta hombros, brazos y piernas unos centímetros del suelo.",
      "Mantén la lumbar pegada y respira.",
    ],
    watch: "Mejor 20 s bien hechos que 30 s con la espalda arqueada. Si la lumbar se despega, sube las piernas o baja los brazos.",
  },
  "rodillas": {
    name: "Elevación de rodillas estricta",
    why: "Core y flexores de cadera sin impulso. Es la versión fácil de la elevación de piernas rectas.",
    how: [
      "Cuelga con las escápulas activas.",
      "Sube las rodillas hacia el pecho sin balancearte.",
      "Baja con control.",
    ],
    watch: "Sin balanceo ni impulso.",
  },
  "piernas": {
    name: "Elevación de piernas rectas",
    why: "Fuerza de core y de flexores de cadera sin impulso. Es la base del toes-to-bar estricto y del L-sit.",
    how: [
      "Cuelga con las escápulas activas y el cuerpo quieto.",
      "Con las piernas rectas, súbelas sin balancearte hasta la altura marcada: 90° o hasta tocar la barra.",
      "Baja despacio sin que el cuerpo se balancee.",
    ],
    watch: "Sin kipping. Si te balanceas, reduce el recorrido hasta que puedas controlarlo.",
  },

  // ---------- Día B: empuje y posiciones ----------
  "ring-support": {
    name: "Ring support",
    why: "Estabilidad de hombro con los brazos bloqueados. Es la posición en la que acaba el muscle-up y la base de los fondos y del L-sit en anillas.",
    how: [
      "Agarra las anillas y sube a soporte con los brazos estirados y bloqueados.",
      "Mantén los hombros hacia abajo, lejos de las orejas, y el cuerpo recto.",
      "Mantén las anillas pegadas al cuerpo y gira los pulgares un poco hacia fuera, tanto como te deje tu movilidad.",
    ],
    watch: "Si no consigues girar las anillas hacia fuera, mantenlas rectas: es normal y mejora con las semanas. Hombros abajo, sin encogerlos.",
  },
  "fondos": {
    name: "Fondos en anillas o paralelas",
    why: "Fuerza de empuje en el recorrido de subida del muscle-up, cuando pasas el pecho por encima de las manos.",
    how: [
      "Empieza en soporte, con los brazos bloqueados.",
      "Baja con control, inclinando un poco el pecho hacia delante, hasta unos 90° de codo.",
      "Sube hasta bloquear los brazos arriba.",
    ],
    watch: "Sin rebote abajo. Si el hombro protesta, baja menos. En anillas, mantenlas pegadas al cuerpo.",
  },
  "pike": {
    name: "Pike push-up o pino en pared",
    why: "Empuje vertical, el camino hacia el pino y las flexiones de pino.",
    how: [
      "Apoya manos y pies en el suelo con las caderas arriba, formando una uve invertida.",
      "Baja la cabeza hacia delante de las manos, con los codos a unos 45° del cuerpo.",
      "Empuja hasta estirar los brazos.",
    ],
    watch: "La cabeza va delante de las manos, no entre ellas. Controla la bajada.",
  },
  "pike-cajon": {
    name: "Pike push-up con pies elevados",
    why: "Empuje vertical más pesado que el pike normal. Es el paso previo a la flexión de pino.",
    how: [
      "Pon los pies sobre un cajón o banco bajo y las manos en el suelo, con las caderas arriba.",
      "Baja la cabeza hacia delante de las manos, con los codos a unos 45° del cuerpo.",
      "Empuja hasta estirar los brazos.",
    ],
    watch: "Si pierdes el control en la bajada, quita altura. Cabeza delante de las manos, no entre ellas.",
  },
  "remo-anillas": {
    name: "Remo en anillas",
    why: "Tirón horizontal para equilibrar tanto empuje: refuerza la espalda alta y las escápulas, y cuida el hombro.",
    how: [
      "Anillas a la altura de la cintura. Cuerpo recto, pies en el suelo e inclinado hacia atrás.",
      "Tira del pecho hacia las anillas, juntando las escápulas al final.",
      "Baja con control hasta estirar los brazos.",
    ],
    watch: "Cuerpo recto de talones a cabeza: que no caigan las caderas. Cuanto más inclinado, más difícil.",
  },
  "lsit": {
    name: "L-sit",
    why: "Core, flexores de cadera y empuje de hombro a la vez. Te enseña a sostener las piernas elevadas con los brazos bloqueados.",
    how: [
      "En soporte con los brazos bloqueados, sube las piernas rectas hasta la horizontal.",
      "Hombros hacia abajo y pecho abierto.",
      "Mantén sin que bajen las piernas.",
    ],
    watch: "Brazos rectos y hombros abajo. Si las piernas caen, dobla las rodillas.",
  },
  "arch": {
    name: "Arch hold",
    why: "Es la posición contraria al hollow: glúteos y espalda activos. Con el hollow te da control de las dos posiciones del cuerpo gimnástico.",
    how: [
      "Boca abajo, con los brazos estirados por delante y las piernas rectas.",
      "Levanta a la vez pecho, brazos y piernas del suelo.",
      "Aprieta los glúteos y mantén.",
    ],
    watch: "Cuello neutro, mirando al suelo. Sube con el glúteo, no fuerces la zona lumbar.",
  },

  // ---------- Día C: transición ----------
  "fg-hang": {
    name: "False grip hang",
    why: "Es el agarre del muscle-up en anillas: la base de la palma apoyada sobre la anilla, para que la muñeca ya esté encima cuando llegues a la transición.",
    how: [
      "Pon las anillas bajas, para tener los pies cerca del suelo si hace falta.",
      "Coloca la anilla en el pliegue de la base de la palma, en diagonal, con la muñeca doblada por encima.",
      "Cuelga con los brazos estirados y las escápulas activas durante el tiempo marcado.",
    ],
    watch: "Es normal notar presión en la base de la palma al principio. Si se vuelve un dolor agudo, o notas hormigueo o los dedos se duermen, suelta y descansa. Series cortas: no esperes a que se te abra la mano.",
  },
  "remo-fg": {
    name: "Remo en anillas con agarre falso",
    why: "Entrena el agarre falso sin cargar todo tu peso. Es la forma suave de acostumbrar la palma y la muñeca.",
    how: [
      "Anillas a la altura de la cintura, cuerpo recto y pies en el suelo.",
      "Coloca el agarre falso: la anilla en la base de la palma y la muñeca por encima.",
      "Tira del pecho hacia las anillas sin soltar el agarre.",
      "Baja con control.",
    ],
    watch: "Si se te escapa el agarre al subir, pon el cuerpo más vertical para tener menos carga.",
  },
  "neg-mu": {
    name: "Negativas de muscle-up en anillas",
    why: "Aprendes la transición bajando. Es el punto donde ahora te caes, justo al pasar los hombros por debajo de las anillas, así que aquí se gana el muscle-up.",
    how: [
      "Empieza arriba, en soporte sobre las anillas con el agarre falso.",
      "Baja despacio, llevando el pecho hacia delante y los hombros por delante de las manos.",
      "Frena en la parte baja de la transición, con los codos cerca de 90°, en vez de caer.",
      "Termina colgado con los brazos estirados y vuelve a subir con ayuda para repetir.",
    ],
    watch: "El tramo crítico es justo al pasar los hombros. Con goma, busca que cada repetición dure 3-5 s sin caer de golpe. En el parque, haz la negativa en barra.",
  },
  "trans-goma": {
    name: "Transiciones con goma",
    why: "Es el muscle-up con ayuda elástica. Entrena el paso del tirón al empuje sobre la barra, que es lo que más frena el muscle-up estricto.",
    how: [
      "Pasa la goma por la barra y mete los pies o las rodillas en el lazo.",
      "Tira alto, con el pecho hacia la barra y los codos hacia atrás.",
      "Pasa los hombros por delante de la barra y termina en soporte con los brazos bloqueados.",
      "Baja con control, saliendo de la barra hacia atrás.",
    ],
    watch: "Sin balanceo. Elige la goma con la que la transición salga limpia, no la que te haga rebotar. Según ganes fuerza, pasa a una goma más fina.",
  },
  "dom-fg": {
    name: "Dominadas con false grip",
    why: "Practica el agarre falso con tirón vertical, con la muñeca por encima de la barra.",
    how: [
      "Cuelga con la palma sobre la barra y la muñeca por encima.",
      "Sube sin balancearte.",
      "Baja hasta estirar los brazos.",
    ],
    watch: "Si pierdes el agarre en la segunda o tercera repetición, para antes de que se escape.",
  },
  "fondos-prof": {
    name: "Fondos profundos",
    why: "Fuerza de empuje en la parte baja del fondo, donde se atasca la transición.",
    how: [
      "Baja más que en el fondo normal, con el pecho sobre las manos.",
      "Para 2 s abajo, sin dejar caer los hombros.",
      "Sube desde abajo sin rebote.",
    ],
    watch: "En la semana 1 el hombro derecho dio molestias después de este ejercicio. Si vuelve, haz fondos normales y apúntalo.",
  },
  "movilidad": {
    name: "Escápulas, manguito y movilidad de hombro y muñeca",
    why: "Cuida lo que más carga la calistenia: escápulas, manguito de los rotadores y muñecas.",
    how: [
      "Rotaciones externas con goma.",
      "Movimientos de escápulas colgado y en el suelo.",
      "Flexión y extensión suaves de muñeca, y estiramiento de antebrazo.",
    ],
    watch: "Suave y sin dolor. No es un ejercicio para llegar al límite.",
  },
};

// x(id, series, objetivo, nota de esa semana, bloque)
const x = (id, sets, target, note = "", block = "principal") => ({ id, sets, target, note, block });

export const PLAN = {
  1: {
    A: [
      x("fl-tuck", 3, "5-8 s", "Brazos rectos. Calidad antes que tiempo."),
      x("dom-pausa", 3, "5 reps", "Pausa de 1-2 s con la barbilla sobre la barra."),
      x("tiron-alto", 3, "3 reps", "Apunta a qué altura llegas: pecho, ombligo o cintura."),
      x("hollow", 3, "20-30 s", "", "secundario"),
      x("rodillas", 3, "8 reps", "Sin balanceo.", "secundario"),
    ],
    B: [
      x("ring-support", 3, "15 s", "Codos bloqueados, anillas hacia fuera."),
      x("fondos", 3, "5 reps", "Controlados, sin rebote abajo."),
      x("pike", 3, "4-5 reps"),
      x("lsit", 3, "10 s", "", "secundario"),
      x("arch", 3, "20 s", "", "secundario"),
    ],
    C: [
      x("fg-hang", 3, "15 s"),
      x("neg-mu", 4, "2 reps de 3-5 s", "En el parque: negativas en barra."),
      x("trans-goma", 3, "3 reps"),
      x("dom-fg", 3, "4 reps"),
      x("fondos-prof", 3, "5 reps"),
      x("movilidad", 1, "10 min", "", "secundario"),
    ],
  },
  2: {
    A: [
      x("fl-tuck", 4, "6-10 s", "Brazos rectos. Calidad antes que tiempo."),
      x("dom-pausa", 4, "5 reps", "Pausa de 1-2 s con la barbilla sobre la barra."),
      x("tiron-alto", 3, "4 reps", "Apunta a qué altura llegas: pecho, ombligo o cintura."),
      x("hollow", 3, "25-30 s", "", "secundario"),
      x("rodillas", 3, "8 reps", "Sin balanceo.", "secundario"),
    ],
    B: [
      x("ring-support", 4, "15-20 s", "Codos bloqueados, anillas hacia fuera."),
      x("fondos", 4, "5-6 reps", "Controlados, sin rebote abajo."),
      x("pike", 3, "4-5 reps"),
      x("lsit", 4, "10-12 s", "", "secundario"),
      x("arch", 3, "20 s", "", "secundario"),
    ],
    C: [
      x("fg-hang", 3, "15 s"),
      x("neg-mu", 5, "2-3 reps de 3-5 s", "En el parque: negativas en barra."),
      x("trans-goma", 3, "3 reps"),
      x("dom-fg", 3, "4 reps"),
      x("fondos-prof", 3, "5 reps"),
      x("movilidad", 1, "10 min", "", "secundario"),
    ],
  },
  3: {
    A: [
      x("tiron-alto", 5, "2 reps", "Con el cuerpo fresco. Para cuando pierdas velocidad y descansa 2 min. Con goma si no llegas al ombligo."),
      x("dom-pausa", 4, "4 reps", "Pausa de 1-2 s arriba y bajada de 2 s. Termina con 2 reps en reserva."),
      x("fl-tuck-goma", 3, "5 s", "Con goma, sin llegar al fallo."),
      x("hollow-brazos", 3, "25 s", "", "secundario"),
      x("piernas", 3, "6 reps", "Piernas rectas hasta 90°, sin balanceo.", "secundario"),
    ],
    B: [
      x("ring-support", 4, "20-25 s", "Anillas rectas y pegadas al cuerpo. Ábrelas un poco, sin forzar."),
      x("fondos", 4, "6 reps", "Baja en 3 s, sin pasar de 90° de codo. Sube sin rebote."),
      x("pike-cajon", 3, "4 reps", "Pies sobre un cajón bajo. Cabeza delante de las manos."),
      x("remo-anillas", 3, "8 reps", "Cuerpo recto, pecho a las anillas."),
      x("lsit", 4, "12-15 s", "En anillas, con los brazos bloqueados.", "secundario"),
      x("arch", 3, "25 s", "", "secundario"),
    ],
    C: [
      x("fg-hang", 3, "8 s", "Anillas bajas, con los pies cerca del suelo. Para si la presión en la palma se vuelve aguda."),
      x("remo-fg", 2, "5 reps", "Cuerpo más vertical si se te escapa el agarre."),
      x("neg-mu", 4, "3 reps de 3-5 s", "Con goma. Frena al pasar los hombros: que los codos no caigan de golpe a 90°."),
      x("trans-goma", 3, "3 reps lentas", "Con las dos gomas. Entra y sal de la barra hacia atrás, sin balanceo."),
      x("fondos-prof", 3, "5 reps", "Pausa de 2 s abajo. Si el hombro derecho molesta, haz fondos normales."),
      x("movilidad", 1, "10 min", "", "secundario"),
    ],
  },
  4: {
    A: [
      x("tiron-alto", 5, "3 reps", "Igual que la semana 3. Si ya llegas al ombligo, prueba una goma más fina."),
      x("dom-pausa", 4, "4 reps", "Pausa de 1-2 s arriba y bajada de 3 s. Termina con 2 reps en reserva."),
      x("fl-tuck-goma", 3, "6-8 s", "Quita goma solo cuando 3 series de 8 s salgan limpias."),
      x("hollow-brazos", 3, "30 s", "", "secundario"),
      x("piernas", 3, "5 reps", "Piernas rectas hasta tocar la barra, sin balanceo.", "secundario"),
    ],
    B: [
      x("ring-support", 4, "25-30 s", "Abre las anillas un poco más si puedes, sin perder el bloqueo."),
      x("fondos", 4, "7 reps", "Baja en 3 s, sin pasar de 90° de codo. Sube sin rebote."),
      x("pike-cajon", 3, "5 reps", "Pies sobre un cajón bajo. Cabeza delante de las manos."),
      x("remo-anillas", 3, "10 reps", "Cuerpo recto, pecho a las anillas."),
      x("lsit", 4, "15 s", "En anillas, con los brazos bloqueados.", "secundario"),
      x("arch", 3, "30 s", "", "secundario"),
    ],
    C: [
      x("fg-hang", 3, "8-10 s", "Anillas bajas. Para antes de que la presión en la palma sea aguda."),
      x("remo-fg", 2, "6 reps", "Cuerpo más vertical si se te escapa el agarre."),
      x("neg-mu", 4, "3 reps de 3-5 s", "Si la semana 3 salió bien, prueba una goma más fina. Si no, la misma."),
      x("trans-goma", 3, "3 reps", "Si las 3 series salen con 2 reps en reserva, pasa a una sola goma."),
      x("fondos-prof", 3, "6 reps", "Pausa de 2 s abajo. Si el hombro derecho molesta, haz fondos normales."),
      x("movilidad", 1, "10 min", "", "secundario"),
    ],
  },
};

export const WEEKS = [1, 2, 3, 4];

// Sesiones en orden. El id es la clave con la que se guardan en el móvil y en Notion.
export const SESSIONS = WEEKS.flatMap((week) =>
  ["A", "B", "C"].map((day) => ({ id: `s${week}-${day}`, day, week })),
);

// Ejercicios de un día y una semana, ya con su explicación y su objetivo.
export const exercisesFor = (day, week) =>
  (PLAN[week]?.[day] || []).map((p) => ({ ...EXERCISES[p.id], ...p }));

export const WEEK_RULES = {
  1: "Termina cada serie con 2 repeticiones en reserva. Se trata de medir cómo responden hombros y codos, no de cansarte.",
  2: "Sube solo si la semana 1 fue limpia: sin molestias al día siguiente y con las posiciones bien hechas.",
  3: "Semana de técnica: termina cada serie con 2 repeticiones en reserva. Lo explosivo va primero, con el cuerpo fresco. Si el agarre falso da dolor agudo, hormigueo o se te duermen los dedos, para ese ejercicio.",
  4: "Sube solo si la semana 3 acabó con hombros, codos y muñecas en «Bien». Si no, repite la semana 3.",
};
