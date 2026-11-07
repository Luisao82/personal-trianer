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
  "tb-neg": {
    name: "Negativa de toes-to-bar",
    why: "Tus piernas pasan de 90° pero no llegan a la barra: te falta fuerza en la parte alta, cuando el cuerpo se dobla por la cadera. Aquí subes con ayuda y entrenas justo ese tramo bajando despacio.",
    how: [
      "Cuelga con las escápulas activas.",
      "Sube las piernas rectas hasta tocar la barra con los pies. Puedes usar un pequeño impulso para llegar.",
      "Baja las piernas rectas en 4 s, sin que el cuerpo se balancee.",
      "Vuelve a colgar quieto antes de la repetición siguiente.",
    ],
    watch: "El tramo difícil es el de la barra a los 90°: ahí es donde tienes que frenar. Si caes de golpe, sube con las rodillas un poco flexionadas y baja con ellas estiradas poco a poco.",
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
  "neg-pino": {
    name: "Negativa de flexión de pino en pared",
    why: "Es el paso siguiente al pike con pies elevados, que ya te sale bien. Entrena el empuje vertical con la carga de todo el cuerpo y te enseña a controlar la bajada cabeza abajo.",
    how: [
      "Sube a pino de cara a la pared, con el pecho hacia la pared y los brazos estirados.",
      "Baja la cabeza hacia una colchoneta fina en 3 s, con los codos a unos 45° del cuerpo.",
      "Toca la colchoneta con la cabeza sin dejarte caer y sube con ayuda de las piernas si hace falta.",
      "Vuelve a pino y repite.",
    ],
    watch: "Pon una colchoneta de 5-8 cm bajo la cabeza para limitar la profundidad. Si la bajada se descontrola, quita una repetición. Si el hombro pincha, vuelve al pike con pies elevados.",
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
  "pino-pared": {
    name: "Pino de cara a la pared",
    why: "Postura y línea de pino: aprender a sostener el cuerpo recto sobre las manos, con los hombros abiertos. Es la base de cualquier trabajo de pino.",
    how: [
      "Coloca las manos a unos 15-20 cm de la pared y sube los pies por la pared hasta quedar con el pecho hacia ella.",
      "Empuja el suelo con las manos para subir los hombros hacia las orejas.",
      "Aprieta glúteos y costillas hacia dentro, para que el cuerpo quede recto, sin curva en la espalda.",
      "Mantén el tiempo marcado y baja con control.",
    ],
    watch: "Cuerpo recto y no un arco. Si la zona lumbar se hunde, aprieta glúteo y acerca las manos a la pared. Para la serie antes de que las muñecas protesten.",
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
  "trans-anillas": {
    name: "Transición en anillas bajas con pies en el suelo",
    why: "Es el paso intermedio entre la transición con goma en barra y el muscle-up en anillas. Con los pies en el suelo cargas menos peso sobre el agarre falso y practicas el giro de las muñecas por encima de las anillas.",
    how: [
      "Anillas a la altura del pecho, con el agarre falso y los pies en el suelo, un poco por delante.",
      "Tira hasta que las anillas lleguen al pecho y pasa los codos por detrás.",
      "Gira las muñecas por encima de las anillas y empuja hasta quedar en soporte con los brazos bloqueados. Ayúdate con las piernas lo justo.",
      "Baja con control y vuelve a empezar.",
    ],
    watch: "Quita ayuda de las piernas poco a poco. Si el agarre falso te hace daño en la palma, sube las anillas o colócalas más abajo en el pliegue antes de seguir.",
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
  5: {
    A: [
      x("tiron-alto", 5, "3 reps", "Goma azul. En las dos últimas series, prueba la goma más fina y apunta hasta dónde llegas: si no llegas al ombligo, vuelve a la azul."),
      x("dom-pausa", 4, "5 reps", "Pausa de 2 s arriba. Termina con 1-2 reps en reserva."),
      x("fl-tuck", 4, "3 s", "Sin goma. Si no consigues 3 s limpios, haz 3 series de 8 s con la goma roja."),
      x("tb-neg", 3, "4 reps", "Sube con impulso pequeño y baja las piernas rectas en 4 s."),
      x("hollow-brazos", 3, "35 s", "", "secundario"),
    ],
    B: [
      x("ring-support", 4, "20 s", "Anillas giradas un poco hacia fuera. Glúteos y costillas apretados, cuerpo recto."),
      x("fondos", 4, "8 reps", "Baja en 3 s hasta 90° de codo. Sube sin rebote."),
      x("neg-pino", 3, "3 reps", "Baja en 3 s a una colchoneta de 5-8 cm. Pecho hacia la pared."),
      x("remo-anillas", 3, "8 reps", "Pausa de 2 s con el pecho en las anillas."),
      x("lsit", 4, "15-18 s", "Empuja el suelo hacia abajo. Hombros lejos de las orejas, mirada al frente.", "secundario"),
      x("pino-pared", 3, "20 s", "De cara a la pared, cuerpo recto.", "secundario"),
    ],
    C: [
      x("fg-hang", 3, "10 s", "Anillas bajas. Para antes de que la presión en la palma sea aguda."),
      x("remo-fg", 3, "6 reps", "Cuerpo casi horizontal para que cueste más."),
      x("trans-anillas", 3, "4 reps", "Anillas bajas, pies en el suelo. Quita ayuda de las piernas poco a poco."),
      x("neg-mu", 3, "2 reps de 3-5 s", "Con una goma más gruesa que la de la semana 4. Para la serie si el agarre falso se abre."),
      x("trans-goma", 3, "3 reps", "Cambia la goma negra por otra más fina, o quítala. Si no sale limpia, vuelve a la anterior."),
      x("fondos-prof", 3, "6 reps", "Pausa de 2 s abajo. Si el hombro derecho molesta, haz fondos normales."),
      x("movilidad", 1, "10 min", "Añade estiramiento de la base de la palma.", "secundario"),
    ],
  },
  6: {
    A: [
      x("tiron-alto", 5, "3 reps", "Prueba la goma más fina en todas las series. Si no llegas al ombligo, vuelve a la azul."),
      x("dom-pausa", 4, "5 reps", "Pausa de 1-2 s arriba y bajada de 3 s. Termina con 1-2 reps en reserva."),
      x("fl-tuck", 4, "4 s", "Sin goma. Cadera a la altura de los hombros y brazos rectos."),
      x("tb-neg", 3, "5 reps", "Baja las piernas rectas en 4 s. Tocar la barra con los pies en cada repetición."),
      x("hollow-brazos", 3, "40 s", "", "secundario"),
    ],
    B: [
      x("ring-support", 4, "25 s", "Anillas giradas hacia fuera, sin perder el cuerpo recto."),
      x("fondos", 4, "6 reps", "Pausa de 1 s a 90° de codo. Si tienes chaleco o disco, +5 kg."),
      x("neg-pino", 3, "4 reps", "Baja en 3 s a una colchoneta de 5-8 cm. Pecho hacia la pared."),
      x("remo-anillas", 3, "6 reps", "Pies elevados. Cuerpo recto, pecho a las anillas."),
      x("lsit", 4, "18-20 s", "Empuja el suelo hacia abajo. Hombros lejos de las orejas.", "secundario"),
      x("pino-pared", 3, "25 s", "De cara a la pared, cuerpo recto.", "secundario"),
    ],
    C: [
      x("fg-hang", 3, "10-12 s", "Anillas bajas. Para antes de que la presión en la palma sea aguda."),
      x("remo-fg", 3, "6 reps", "Cuerpo casi horizontal y pausa de 1 s con el pecho en las anillas."),
      x("trans-anillas", 3, "5 reps", "Anillas bajas, pies en el suelo. Menos ayuda de las piernas que en la semana 5."),
      x("neg-mu", 3, "2-3 reps de 3-5 s", "Con la misma goma que en la semana 5, o una más fina si salió limpio."),
      x("trans-goma", 3, "3 reps", "Con una sola goma."),
      x("fondos-prof", 3, "7 reps", "Pausa de 2 s abajo. Si el hombro derecho molesta, haz fondos normales."),
      x("movilidad", 1, "10 min", "Incluye el estiramiento de la base de la palma.", "secundario"),
    ],
  },
};

export const WEEKS = [1, 2, 3, 4, 5, 6];

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
  5: "Se sube un escalón en lo que ya domina (front lever sin goma, negativas de pino) y se recorta el volumen de agarre falso, que es donde aparece el dolor. Termina con 1-2 repeticiones en reserva.",
  6: "Sube solo si la semana 5 acabó con hombros, codos y muñecas en «Bien» y la palma aguanta el agarre falso. Si no, repite la semana 5.",
};

// Objetivo de cada sesión y consejos para cumplirlo. Solo las semanas 5 y 6 los tienen por ahora.
export const GOALS = {
  5: {
    A: {
      objetivo: "Tu primer front lever tuck sin goma: 4 series de 3 s con la cadera a la altura de los hombros. Y llevar los pies a la barra bajando las piernas con control.",
      tips: [
        "Haz el tirón alto primero, con el cuerpo fresco, y descansa 2 min entre series.",
        "En el front lever tuck, empuja la barra hacia abajo como si quisieras alargar los brazos, y sube la cadera hasta los hombros. Pide que te graben de lado para comprobar el ángulo.",
        "En la negativa de toes-to-bar, el tramo difícil es de la barra a los 90°: ahí es donde tienes que frenar.",
      ],
    },
    B: {
      objetivo: "Soporte limpio en anillas con las anillas un poco giradas hacia fuera y el cuerpo recto, y empuje vertical controlado con las negativas de pino.",
      tips: [
        "En el ring support, aprieta glúteos y mete las costillas hacia dentro para no encoger la parte frontal, y mira al frente.",
        "En el L-sit, empuja el suelo hacia abajo, saca pecho y mantén los codos bloqueados. Lo importante es el tiempo con la posición bien hecha, aunque las piernas queden un poco por debajo de la horizontal.",
        "En la negativa de pino, coloca una colchoneta fina bajo la cabeza y baja en 3 s. No busques profundidad.",
      ],
    },
    C: {
      objetivo: "Hacer las 3 series de negativas de muscle-up sin que el agarre falso te rompa la serie, y subir a transiciones con una sola goma en pocas semanas.",
      tips: [
        "El dolor de la base de la palma es el límite. Haz series cortas y para cuando notes que el agarre empieza a abrirse.",
        "Coloca la anilla en el pliegue de la base de la palma, en diagonal, con la muñeca por encima. Si hace falta, prueba una venda fina de tape antes de empezar.",
        "Si aparece hormigueo, los dedos se duermen o hay dolor en reposo o por la noche, para el agarre falso y pregúntale al fisio.",
      ],
    },
  },
  6: {
    A: {
      objetivo: "Front lever tuck sin goma: 4 series de 4 s, y tocar la barra con los pies en las 5 repeticiones de la negativa de toes-to-bar.",
      tips: [
        "Si en la semana 5 no conseguiste 3 s limpios, repite el front lever tuck de la semana 5 con la goma roja en vez de subir.",
        "Prueba la goma más fina en todas las series del tirón alto. Si pierdes altura, vuelve a la azul.",
        "En la negativa de toes-to-bar, no dejes que el cuerpo se balancee al volver abajo.",
      ],
    },
    B: {
      objetivo: "Sumar tiempo en el L-sit hasta 18-20 s y empuje de fondos más pesado, con 4 repeticiones de negativa de pino controladas.",
      tips: [
        "El lastre en los fondos es opcional: solo si la semana 5 salió con 1-2 repeticiones en reserva y el hombro está bien.",
        "En el remo con pies elevados, mantén el cuerpo recto de talones a cabeza y tira del pecho a las anillas.",
        "En el pino de cara a la pared, para antes de que las muñecas protesten.",
      ],
    },
    C: {
      objetivo: "Transiciones con una sola goma y negativas de muscle-up en anillas con control, con la palma aguantando el agarre falso.",
      tips: [
        "Si la palma está muy sensible, deja las negativas en 2 reps y no subas la goma más fina.",
        "En las transiciones en anillas bajas, usa cada semana un poco menos de ayuda con las piernas.",
        "Apunta en el comentario de la sesión cómo está la palma al día siguiente: es el dato que decide la semana 7.",
      ],
    },
  },
};

export const goalFor = (day, week) => GOALS[week]?.[day] || null;
