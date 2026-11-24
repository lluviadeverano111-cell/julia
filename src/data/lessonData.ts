import ex4BeachImg from '../assets/images/ex4_beach.jpg';
import ex4BusImg from '../assets/images/ex4_bus.jpg';
import ex4CardsImg from '../assets/images/ex4_cards.jpg';
import ex4CinemaImg from '../assets/images/ex4_cinema.jpg';
import ex4CoatImg from '../assets/images/ex4_coat.jpg';
import ex4RainHomeImg from '../assets/images/ex4_rain_home.jpg';
import ex4StudyImg from '../assets/images/ex4_study.jpg';
import ex1CoffeeNightImg from '../assets/images/ex1_coffee_night_1795456211180.jpg';
import ex1AirportFlightImg from '../assets/images/ex1_airport_flight_1795456210965.jpg';
import ex1TicketsImg from '../assets/images/ex1_tickets_1795455618400.jpg';
import ex1SnowmanImg from '../assets/images/ex1_snowman_1795456211337.jpg';
import ex1SleepyMorningImg from '../assets/images/ex1_sleepy_morning_1795456210649.jpg';
import whoMomImg from '../assets/images/cartoon_la_madre_1795456325215.jpg';
import whoChefImg from '../assets/images/cartoon_el_cocinero_1795456326264.jpg';
import whoDoctorImg from '../assets/images/cartoon_la_doctora_1795456326104.jpg';
import whoTeacherImg from '../assets/images/cartoon_la_profesora_1795456325846.jpg';
import listenMountainImg from '../assets/images/listen_mountain_1795455619704.jpg';

export interface WordEntry {
  lemma: string;
  infinitiveRu?: string;
  pos: string;
  ru: string;
  note?: string;
  isConditionalMarker?: boolean;
}

export const GRAMMAR_TABLE = [
  {
    id: "g1",
    ifClause: "si + presente de indicativo",
    mainClause: "presente de indicativo",
    meaningRu: "Общее правило, привычка, закономерность (всегда)",
    exampleEs: "Si hace frío, me pongo el abrigo.",
    exampleRu: "Если холодно, я надеваю пальто."
  },
  {
    id: "g2",
    ifClause: "si + presente de indicativo",
    mainClause: "futuro simple / ir a + infinitivo / imperativo / tener que + infinitivo",
    meaningRu: "Реальное условие в будущем, план, совет, приказ или обязанность",
    exampleEs: "Si mañana llueve, nos quedaremos en casa.",
    exampleRu: "Если завтра пойдёт дождь, мы останемся дома."
  },
  {
    id: "g3",
    ifClause: "si + pretérito perfecto compuesto",
    mainClause: "presente de indicativo / futuro simple / ir a + infinitivo / imperativo",
    meaningRu: "Условие уже завершилось к настоящему моменту (результат важен сейчас)",
    exampleEs: "Si has terminado, puedes salir.",
    exampleRu: "Если ты уже закончил, можешь выйти."
  },
  {
    id: "g4",
    ifClause: "si + pretérito imperfecto",
    mainClause: "pretérito imperfecto",
    meaningRu: "Повторяющаяся привычка в прошлом («когда / если раньше бывало...»)",
    exampleEs: "Si hacía frío, me ponía el abrigo.",
    exampleRu: "Если было холодно, я (обычно) надевал пальто."
  },
  {
    id: "g5",
    ifClause: "si + pretérito indefinido (pretérito perfecto simple)",
    mainClause: "presente de indicativo / futuro simple / ir a + infinitivo / imperativo",
    meaningRu: "Единичное завершённое действие в прошлом влияет на настоящее или будущее",
    exampleEs: "Si anoche dormiste poco, hoy tendrás sueño.",
    exampleRu: "Если прошлой ночью ты мало спал, сегодня будешь хотеть спать."
  }
];
export const TRAPS_DATA = [
  {
    id: "trap-1",
    title: "Ловушка 1. Никогда futuro после условного si!",
    wrong: "Si mañana lloverá, nos quedaremos en casa.",
    right: "Si mañana llueve, nos quedaremos en casa.",
    explanationRu: "В русском мы говорим «если пойдёт дождь» (будущее), но в испанском после условного si (если) будущее время ЗАПРЕЩЕНО — ставим presente de indicativo."
  },
  {
    id: "trap-2",
    title: "Ловушка 2. si (если) без ударения vs sí (да) с ударением",
    wrong: "Sí tienes tiempo, llámame.",
    right: "Si tienes tiempo, llámame.",
    explanationRu: "Союз «если» пишется БЕЗ ударения (si). С ударением (sí) пишется частица «да» или ударное местоимение «себя»."
  },
  {
    id: "trap-3",
    title: "Ловушка 3. Косвенный вопрос (si = «ли») — тут futuro МОЖНО!",
    wrong: "Перевод: «Не знаю, если завтра пойдёт дождь».",
    right: "No sé si mañana lloverá. = Не знаю, пойдёт ли завтра дождь.",
    explanationRu: "После глаголов saber, preguntar, dudar союз si означает «ли» (косвенный вопрос), а не условие. В этом случае futuro simple полностью правильно!"
  },
  {
    id: "trap-4",
    title: "Ловушка 4. Порядок частей и запятая",
    wrong: "Te llamo, si tengo tiempo.",
    right: "Si tengo tiempo, te llamo. / Te llamo si tengo tiempo.",
    explanationRu: "Если придаточное с si стоит вначале — ставим запятую. Если главная часть стоит первой, а si в середине — в испанском запятая обычно НЕ ставится."
  }
];
export const EXTRA_EXAMPLES = [
  {
    es: "Si tienes sed, bebe agua.",
    ru: "Если хочешь пить, выпей воды.",
    tag: "si + presente de indicativo → imperativo"
  },
  {
    es: "Si no te das prisa, vas a perder el autobús.",
    ru: "Если ты не поторопишься, опоздаешь на автобус.",
    tag: "si + presente de indicativo → ir a + infinitivo"
  },
  {
    es: "Si el vuelo se cancela, nos devolverán el dinero.",
    ru: "Если рейс отменят, нам вернут деньги.",
    tag: "si + presente de indicativo → futuro simple"
  },
  {
    es: "Si Pedro llegaba tarde, siempre cenaba solo.",
    ru: "Если Педро приходил поздно, он всегда ужинал один.",
    tag: "si + pretérito imperfecto → pretérito imperfecto"
  },
  {
    es: "Si ya has enviado el correo, descansa un poco.",
    ru: "Если ты уже отправил письмо, отдохни немного.",
    tag: "si + pretérito perfecto compuesto → imperativo"
  },
  {
    es: "Si ayer no compraste entradas, hoy tendrás que hacer cola.",
    ru: "Если вчера ты не купил билеты, сегодня тебе придётся стоять в очереди.",
    tag: "si + pretérito indefinido → tener que + infinitivo"
  }
];
export const LESSON_VOCAB = [
  { es: "darse prisa", ru: "торопиться, спешить" },
  { es: "perder el autobús / el tren", ru: "опоздать на автобус / поезд" },
  { es: "ponerse el abrigo", ru: "надеть пальто" },
  { es: "aprobar el examen", ru: "сдать экзамен" },
  { es: "hacer cola", ru: "стоять в очереди" },
  { es: "quedarse en casa", ru: "остаться дома" },
  { es: "devolver el dinero", ru: "вернуть деньги" },
  { es: "llegar tarde / a tiempo", ru: "опоздать / прийти вовремя" },
  { es: "guardar un plato", ru: "оставить (приберечь) тарелку еды" },
  { es: "tener sueño", ru: "хотеть спать" }
];
export const FORMULA_MATCH_ROWS = [
  {
    id: "fm1",
    formulaLabel: "si + presente de indicativo → presente de indicativo",
    meaningRu: "Постоянная привычка или факт",
    correctExampleEs: "Si bebo café por la noche, no duermo bien.",
    correctExampleRu: "Если я пью кофе вечером, я плохо сплю."
  },
  {
    id: "fm2",
    formulaLabel: "si + presente de indicativo → futuro simple / ir a + infinitivo / imperativo / tener que + infinitivo",
    meaningRu: "Реальный план, прогноз или совет на будущее",
    correctExampleEs: "Si estudias esta semana, aprobarás el examen sin problema.",
    correctExampleRu: "Если будешь заниматься на этой неделе, сдашь экзамен без проблем."
  },
  {
    id: "fm3",
    formulaLabel: "si + pretérito perfecto compuesto → presente de indicativo / futuro simple / imperativo",
    meaningRu: "Условие с результатом к настоящему моменту",
    correctExampleEs: "Si ya has cenado, vamos a dar un paseo.",
    correctExampleRu: "Если ты уже поужинал, пойдём прогуляемся."
  },
  {
    id: "fm4",
    formulaLabel: "si + pretérito imperfecto → pretérito imperfecto",
    meaningRu: "Повторяющаяся привычка в прошлом",
    correctExampleEs: "Si nevaba en invierno, hacíamos muñecos de nieve.",
    correctExampleRu: "Если зимой шёл снег, мы лепили снеговиков."
  },
  {
    id: "fm5",
    formulaLabel: "si + pretérito indefinido (pretérito perfecto simple) → presente / futuro / imperativo",
    meaningRu: "Прошлый факт влияет на ситуацию сейчас или завтра",
    correctExampleEs: "Si ayer dejaste la ventana abierta, hoy hace frío en la habitación.",
    correctExampleRu: "Если вчера ты оставил окно открытым, сегодня в комнате холодно."
  }
];
export const EX1_MINIMAL_PAIRS = [
  {
    id: 1,
    audioEs: "Si bebo café por la noche, no duermo bien.",
    formulaTag: "si + presente de indicativo → presente de indicativo",
    meaningRu: "Если я пью кофе вечером, я плохо сплю.",
    imageUrl: ex1CoffeeNightImg,
    imageAlt: "Чашка кофе рядом с книгой и ночной лампой у тёмного окна",
    options: [
      { id: "a", label: "Si bebía café por la noche, no dormía bien." },
      { id: "b", label: "Si bebo café por la noche, no duermo bien." },
      { id: "c", label: "Si he bebido café por la noche, no dormiré bien." }
    ],
    correctId: "b",
    explanationRu: "Прозвучали формы presente (bebo → no duermo) — это постоянная привычка сейчас."
  },
  {
    id: 2,
    audioEs: "Si el vuelo se cancela, nos devolverán el dinero.",
    formulaTag: "si + presente de indicativo → futuro simple",
    meaningRu: "Если рейс отменят, нам вернут деньги.",
    imageUrl: ex1AirportFlightImg,
    imageAlt: "Чемодан, паспорт и посадочный талон в терминале аэропорта на фоне самолётов",
    options: [
      { id: "a", label: "Si el vuelo se cancelaba, nos devolvían el dinero." },
      { id: "b", label: "Si el vuelo se ha cancelado, nos devuelven el dinero." },
      { id: "c", label: "Si el vuelo se cancela, nos devolverán el dinero." }
    ],
    correctId: "c",
    explanationRu: "Прозвучала связка presente + futuro simple (se cancela → nos devolverán) — реальное условие на будущее."
  },
  {
    id: 3,
    audioEs: "Si ya has comprado las entradas, entra primero.",
    formulaTag: "si + pretérito perfecto compuesto → imperativo",
    meaningRu: "Если ты уже купил билеты, заходи первым.",
    imageUrl: ex1TicketsImg,
    imageAlt: "Девушка держит билеты у освещённого входа в испанский кинотеатр вечером",
    options: [
      { id: "a", label: "Si ya has comprado las entradas, entra primero." },
      { id: "b", label: "Si compras las entradas, entrarás primero." },
      { id: "c", label: "Si comprabas las entradas, entrabas primero." }
    ],
    correctId: "a",
    explanationRu: "Прозвучало pretérito perfecto compuesto (has comprado) + imperativo (entra) — результат уже есть к настоящему моменту."
  },
  {
    id: 4,
    audioEs: "Si nevaba en invierno, hacíamos muñecos de nieve.",
    formulaTag: "si + pretérito imperfecto → pretérito imperfecto",
    meaningRu: "Если зимой шёл снег, мы лепили снеговиков.",
    imageUrl: ex1SnowmanImg,
    imageAlt: "Снеговик с красным шарфом в заснеженном солнечном парке",
    options: [
      { id: "a", label: "Si nieva en invierno, haremos muñecos de nieve." },
      { id: "b", label: "Si nevaba en invierno, hacíamos muñecos de nieve." },
      { id: "c", label: "Si ha nevado en invierno, hacemos muñecos de nieve." }
    ],
    correctId: "b",
    explanationRu: "Оба глагола прозвучали в pretérito imperfecto (nevaba → hacíamos) — повторяющаяся привычка в прошлом."
  },
  {
    id: 5,
    audioEs: "Si anoche dormiste poco, hoy tendrás sueño.",
    formulaTag: "si + pretérito indefinido → futuro simple",
    meaningRu: "Если прошлой ночью ты мало спал, сегодня будешь хотеть спать.",
    imageUrl: ex1SleepyMorningImg,
    imageAlt: "Сонная девушка за утренним столом рядом с будильником и чашкой кофе",
    options: [
      { id: "a", label: "Si duermes poco, hoy tienes sueño." },
      { id: "b", label: "Si dormías poco, siempre tenías sueño." },
      { id: "c", label: "Si anoche dormiste poco, hoy tendrás sueño." }
    ],
    correctId: "c",
    explanationRu: "Прозвучало pretérito indefinido (anoche dormiste) + futuro simple (hoy tendrás) — завершённый факт в прошлом влияет на сегодня."
  }
];
export const CHARACTER_TAGS = [
  { id: "habit-now", label: "Привычка сейчас" },
  { id: "future-plan", label: "План на будущее" },
  { id: "past-habit", label: "Воспоминание из детства" },
  { id: "advice", label: "Совет / просьба (imperativo)" }
];
export const EX2_CHARACTERS = [
  {
    id: "ch1",
    name: "Sofía",
    quoteEs: "Si el sábado no llueve, vamos a subir a la montaña.",
    correctTagId: "future-plan",
    explanationRu: "si + presente de indicativo (llueve) → ir a + infinitivo (vamos a subir): конкретный план на субботу."
  },
  {
    id: "ch2",
    name: "Mateo",
    quoteEs: "De niño, si tenía tiempo libre, siempre pintaba barcos en el cuaderno.",
    correctTagId: "past-habit",
    explanationRu: "si + pretérito imperfecto (tenía) → pretérito imperfecto (pintaba): повторяющаяся привычка в прошлом."
  },
  {
    id: "ch3",
    name: "Elena",
    quoteEs: "Si ya has enviado el correo, descansa un poco.",
    correctTagId: "advice",
    explanationRu: "si + pretérito perfecto compuesto (has enviado) → imperativo (descansa): совет / просьба."
  },
  {
    id: "ch4",
    name: "Diego",
    quoteEs: "Si trabajo desde casa, siempre preparo la comida a las dos.",
    correctTagId: "habit-now",
    explanationRu: "si + presente de indicativo (trabajo) → presente de indicativo (preparo): регулярная привычка сейчас."
  }
];
export const LISTEN_MATCH_PICTURES = [
  {
    id: 1,
    audioEs: "Si no te das prisa, vas a perder el autobús.",
    correctOptionId: "bus",
    explanationRu: "«Если не поторопишься, опоздаешь на автобус» — si + presente de indicativo (te das prisa) → ir a + infinitivo (vas a perder).",
    options: [
      { id: "beach", imageUrl: ex4BeachImg, imageAlt: "Солнечный пляж" },
      { id: "bus", imageUrl: ex4BusImg, imageAlt: "Человек бежит за автобусом" },
      { id: "rain", imageUrl: ex4RainHomeImg, imageAlt: "Дождь за окном уютной комнаты" }
    ]
  },
  {
    id: 2,
    audioEs: "Si hace frío, me pongo el abrigo.",
    correctOptionId: "coat",
    explanationRu: "«Если холодно, я надеваю пальто» — общая привычка: si + presente de indicativo (hace) → presente de indicativo (me pongo).",
    options: [
      { id: "cinema", imageUrl: ex4CinemaImg, imageAlt: "Вечерний кинотеатр" },
      { id: "study", imageUrl: ex4StudyImg, imageAlt: "Учёба за столом с конспектом" },
      { id: "coat", imageUrl: ex4CoatImg, imageAlt: "Девушка в тёплом пальто и шарфе" }
    ]
  },
  {
    id: 3,
    audioEs: "Si mañana llueve, nos quedaremos en casa.",
    correctOptionId: "rain",
    explanationRu: "«Если завтра пойдёт дождь, мы останемся дома» — реальный план: si + presente (llueve) → futuro simple (nos quedaremos).",
    options: [
      { id: "rain", imageUrl: ex4RainHomeImg, imageAlt: "Уютный вечер дома во время дождя" },
      { id: "mountain", imageUrl: listenMountainImg, imageAlt: "Горная тропа в солнечную погоду" },
      { id: "bus", imageUrl: ex4BusImg, imageAlt: "Погоня за уходящим автобусом" }
    ]
  },
  {
    id: 4,
    audioEs: "Si el sábado no llueve, vamos a subir a la montaña.",
    correctOptionId: "mountain",
    explanationRu: "«Если в субботу не будет дождя, мы поднимемся в горы» — si + presente (no llueve) → ir a + infinitivo (vamos a subir).",
    options: [
      { id: "cards", imageUrl: ex4CardsImg, imageAlt: "Игра в карты и чай за столом" },
      { id: "mountain", imageUrl: listenMountainImg, imageAlt: "Поход в горы с рюкзаками" },
      { id: "coat", imageUrl: ex4CoatImg, imageAlt: "Прохладная улица в пальто" }
    ]
  },
  {
    id: 5,
    audioEs: "Si estudias esta semana, aprobarás el examen sin problema.",
    correctOptionId: "study",
    explanationRu: "«Если будешь заниматься на этой неделе, сдашь экзамен без проблем» — si + presente (estudias) → futuro simple (aprobarás).",
    options: [
      { id: "beach", imageUrl: ex4BeachImg, imageAlt: "Отдых на пляже" },
      { id: "cinema", imageUrl: ex4CinemaImg, imageAlt: "Поход в кино" },
      { id: "study", imageUrl: ex4StudyImg, imageAlt: "Подготовка к экзамену по конспекту" }
    ]
  }
];
export const WHO_SAID_SPEAKERS = [
  {
    id: "mom",
    labelEs: "La madre",
    imageUrl: whoMomImg,
    imageAlt: "La madre"
  },
  {
    id: "chef",
    labelEs: "El cocinero",
    imageUrl: whoChefImg,
    imageAlt: "El cocinero"
  },
  {
    id: "doctor",
    labelEs: "La doctora",
    imageUrl: whoDoctorImg,
    imageAlt: "La doctora"
  },
  {
    id: "teacher",
    labelEs: "La profesora",
    imageUrl: whoTeacherImg,
    imageAlt: "La profesora"
  }
];
export const WHO_SAID_ITEMS: Array<{
  id: number;
  audioEs: string;
  correctSpeakerId: string;
  voiceName: 'Kore' | 'Puck';
  explanationRu: string;
}> = [
  {
    id: 1,
    audioEs: "Si la sopa está un poco sosa, añade una pizca de sal antes de servir los platos a los clientes.",
    correctSpeakerId: "chef",
    voiceName: "Puck",
    explanationRu: "El cocinero: «Если суп немного пресный, добавь щепотку соли перед тем, как подавать блюда гостям» (si + presente de indicativo → imperativo)."
  },
  {
    id: 2,
    audioEs: "Si mañana sigues teniendo fiebre, toma estas pastillas y vuelve a mi consulta.",
    correctSpeakerId: "doctor",
    voiceName: "Kore",
    explanationRu: "La doctora: «Если завтра у тебя всё ещё будет температура, прими эти таблетки и приходи снова ко мне на приём» (si + presente de indicativo → imperativo)."
  },
  {
    id: 3,
    audioEs: "Si ya has recogido tu habitación y has hecho los deberes, puedes salir a jugar con tus amigos.",
    correctSpeakerId: "mom",
    voiceName: "Kore",
    explanationRu: "La madre: «Если ты уже убрал в своей комнате и сделал уроки, можешь пойти погулять с друзьями» (si + pretérito perfecto compuesto → presente de indicativo)."
  },
  {
    id: 4,
    audioEs: "Si repasáis bien el tema de hoy, aprobaréis el examen del viernes sin problema.",
    correctSpeakerId: "teacher",
    voiceName: "Kore",
    explanationRu: "La profesora: «Если вы хорошо повторите сегодняшнюю тему, вы без проблем сдадите пятничный экзамен» (si + presente de indicativo → futuro simple)."
  }
];
export const EX3_CHOICE = [
  {
    id: 1,
    promptEs: "Si mañana ___ buen tiempo, comeremos en la terraza.",
    options: ["hace", "hará", "hacía"],
    correctAnswer: "hace",
    explanationRu: "После условного si нельзя ставить futuro (hará) — нужен presente de indicativo: hace."
  },
  {
    id: 2,
    promptEs: "Si ya ___ el trabajo, puedes irte a casa.",
    options: ["terminarás", "has terminado", "terminabas"],
    correctAnswer: "has terminado",
    explanationRu: "Маркер «ya» + результат к настоящему моменту → pretérito perfecto compuesto (has terminado)."
  },
  {
    id: 3,
    promptEs: "Cuando era pequeña, si ___ frío, mi madre me preparaba sopa caliente.",
    options: ["hace", "hará", "hacía"],
    correctAnswer: "hacía",
    explanationRu: "Привычка в прошлом (cuando era pequeña, preparaba) требует pretérito imperfecto: hacía."
  },
  {
    id: 4,
    promptEs: "Si no sabes la dirección, ___ en el mapa del móvil.",
    options: ["búscala", "buscarás", "buscabas"],
    correctAnswer: "búscala",
    explanationRu: "Здесь даётся прямой совет: si + presente de indicativo → imperativo (búscala)."
  },
  {
    id: 5,
    promptEs: "No sé si esta tarde ___ tiempo para pasar por tu casa.",
    options: ["tendré", "tenía", "ten"],
    correctAnswer: "tendré",
    explanationRu: "После «No sé si...» это косвенный вопрос («будет ли»), поэтому futuro simple (tendré) здесь правильно."
  }
];
export const EX4_PICTURES = [
  {
    id: 1,
    imageUrl: ex4BeachImg,
    imageAlt: "Солнечный испанский пляж с бирюзовым морем",
    situationRu: "Выбирай фразу про план на солнечное воскресенье:",
    options: [
      { id: "a", es: "Si el domingo hará sol, iremos a la playa." },
      { id: "b", es: "Si el domingo hace sol, iremos a la playa." },
      { id: "c", es: "Sí el domingo hace sol, vamos a la playa." }
    ],
    correctId: "b",
    explanationRu: "После условного si (без ударения) ставится presente de indicativo (hace), а в следствии — futuro simple (iremos)."
  },
  {
    id: 2,
    imageUrl: ex4BusImg,
    imageAlt: "Человек бежит за уезжающим автобусом",
    situationRu: "Выбирай правильное предупреждение:",
    options: [
      { id: "a", es: "Si no correrás rápido, perderás el autobús." },
      { id: "b", es: "Si no corrías rápido, vas a perder el autobús." },
      { id: "c", es: "Si no te das prisa, vas a perder el autobús." }
    ],
    correctId: "c",
    explanationRu: "si + presente de indicativo (te das prisa) → ir a + infinitivo (vas a perder)."
  },
  {
    id: 3,
    imageUrl: ex4CoatImg,
    imageAlt: "Девушка в тёплом пальто и шарфе на осенней улице Мадрида",
    situationRu: "Выбирай совет на прохладное утро:",
    options: [
      { id: "a", es: "Si hace frío fuera, ponte el abrigo y la bufanda." },
      { id: "b", es: "Si hará mucho frío fuera, te pondrás el abrigo." },
      { id: "c", es: "Si hacías frío fuera, ponte el abrigo y la bufanda." }
    ],
    correctId: "a",
    explanationRu: "Реальное условие сейчас + совет: si + presente de indicativo (hace) → imperativo (ponte)."
  },
  {
    id: 4,
    imageUrl: ex4CinemaImg,
    imageAlt: "Вход в вечерний кинотеатр",
    situationRu: "Друзья обсуждают поход в кино, если успеют закончить дела:",
    options: [
      { id: "a", es: "Si terminaremos pronto el trabajo, vamos al cine." },
      { id: "b", es: "Sí terminamos pronto el trabajo, iremos al cine." },
      { id: "c", es: "Si terminamos pronto el trabajo, vamos a ver una película." }
    ],
    correctId: "c",
    explanationRu: "si (без ударения) + presente de indicativo (terminamos) → ir a + infinitivo (vamos a ver)."
  },
  {
    id: 5,
    imageUrl: ex4RainHomeImg,
    imageAlt: "Уютный вечер дома, когда за окном идёт дождь",
    situationRu: "Если вечером пойдёт дождь, останемся дома:",
    options: [
      { id: "a", es: "Si llovía esta tarde, nos quedaremos en casa." },
      { id: "b", es: "Si llueve esta tarde, nos quedaremos en casa." },
      { id: "c", es: "Si lloverá esta tarde, nos quedamos en casa." }
    ],
    correctId: "b",
    explanationRu: "si + presente de indicativo (llueve) → futuro simple (nos quedaremos)."
  },
  {
    id: 6,
    imageUrl: ex4StudyImg,
    imageAlt: "Студентка занимается испанским с конспектом и жёлтым маркером",
    situationRu: "Поддержка перед экзаменом B1:",
    options: [
      { id: "a", es: "Si repasarás tus apuntes, apruebas el examen." },
      { id: "b", es: "Sí repasas tus apuntes cada día, aprobarás el examen." },
      { id: "c", es: "Si repasas tus apuntes cada día, aprobarás el examen." }
    ],
    correctId: "c",
    explanationRu: "si (без ударения) + presente de indicativo (repasas) → futuro simple (aprobarás)."
  },
  {
    id: 7,
    imageUrl: ex4CardsImg,
    imageAlt: "Игральные карты, чай и домашний пирог на деревянном столе у дождливого окна",
    situationRu: "Воспоминание о детских летах у бабушки:",
    options: [
      { id: "a", es: "Si llovía en verano, jugábamos a las cartas en la cocina." },
      { id: "b", es: "Si llueve en verano, jugábamos a las cartas en la cocina." },
      { id: "c", es: "Si lloverá en verano, jugábamos a las cartas." }
    ],
    correctId: "a",
    explanationRu: "Привычка в прошлом: si + pretérito imperfecto (llovía) → pretérito imperfecto (jugábamos)."
  }
];
export const EX5_VERB_FORMS = [
  {
    id: 1,
    parts: ["Si mañana ", " (hacer) buen tiempo, nosotros ", " (ir) al parque."],
    blanks: [
      { infinitive: "hacer", accepted: ["hace"], displayAnswer: "hace" },
      {
        infinitive: "ir",
        accepted: ["iremos", "vamos a ir", "vamos"],
        displayAnswer: "iremos / vamos a ir"
      }
    ],
    ruHint: "Если завтра будет хорошая погода, мы пойдём в парк.",
    explanationRu: "После si — presente de indicativo (hace). В главной части подходит и futuro simple (iremos), и ir a + infinitivo (vamos a ir)."
  },
  {
    id: 2,
    parts: ["Si ", " (tener, tú) tiempo esta tarde, ", " (llamar, tú — imperativo) a tu abuela."],
    blanks: [
      { infinitive: "tener", accepted: ["tienes"], displayAnswer: "tienes" },
      { infinitive: "llamar", accepted: ["llama"], displayAnswer: "llama" }
    ],
    ruHint: "Если у тебя будет время сегодня днём, позвони бабушке.",
    explanationRu: "si + presente de indicativo (tienes) → imperativo (llama)."
  },
  {
    id: 3,
    parts: ["Si encuentro una oferta barata, yo ", " (comprar) los billetes hoy mismo."],
    blanks: [
      {
        infinitive: "comprar",
        accepted: ["compraré", "voy a comprar", "compro"],
        displayAnswer: "compraré / voy a comprar"
      }
    ],
    ruHint: "Если я найду дешёвое предложение, я куплю билеты прямо сегодня.",
    explanationRu: "В главной части будущего следствия принимаются и futuro simple (compraré), и ir a + infinitivo (voy a comprar)."
  },
  {
    id: 4,
    parts: ["Si ya ", " (terminar, vosotros) el ejercicio, ", " (poder, vosotros) descansar."],
    blanks: [
      { infinitive: "terminar", accepted: ["habéis terminado"], displayAnswer: "habéis terminado" },
      {
        infinitive: "poder",
        accepted: ["podéis", "podréis", "vais a poder"],
        displayAnswer: "podéis / podréis / vais a poder"
      }
    ],
    ruHint: "Если вы уже закончили упражнение, можете (сможете) отдохнуть.",
    explanationRu: "С маркером «ya» используется pretérito perfecto compuesto (habéis terminado), а в главной части — podéis, podréis или vais a poder."
  },
  {
    id: 5,
    parts: ["Si anoche no ", " (dormir, tú) bien, hoy ", " (tener, tú) mucho sueño."],
    blanks: [
      { infinitive: "dormir", accepted: ["dormiste"], displayAnswer: "dormiste" },
      {
        infinitive: "tener",
        accepted: ["tendrás", "vas a tener", "tienes"],
        displayAnswer: "tendrás / vas a tener"
      }
    ],
    ruHint: "Если прошлой ночью ты плохо спал, сегодня будешь очень хотеть спать.",
    explanationRu: "Маркер «anoche» требует pretérito indefinido (dormiste), а следствие сегодня — tendrás / vas a tener / tienes."
  },
  {
    id: 6,
    parts: ["Si no nos ", " (dar, nosotros) prisa, ", " (perder, nosotros) el tren."],
    blanks: [
      { infinitive: "dar", accepted: ["damos"], displayAnswer: "damos" },
      {
        infinitive: "perder",
        accepted: ["perderemos", "vamos a perder", "perdemos"],
        displayAnswer: "perderemos / vamos a perder"
      }
    ],
    ruHint: "Если мы не поторопимся, мы опоздаем на поезд.",
    explanationRu: "После si — presente de indicativo (damos), в следствии — perderemos или vamos a perder."
  }
];
export const EX6_FIND_ERRORS = [
  {
    id: 1,
    sentenceEs: "Si mañana lloverá, nos quedaremos en casa.",
    translationRu: "Если завтра пойдёт дождь, мы останемся дома.",
    errorType: "token",
    wrongTokenIndex: 2,
    trapLabel: "Ловушка 1: futuro после si",
    fixedEs: "Si mañana llueve, nos quedaremos en casa.",
    correctionRu: "После условного si нельзя ставить futuro simple (lloverá) — нужен presente de indicativo: llueve."
  },
  {
    id: 2,
    sentenceEs: "Sí tienes alguna duda, pregúntame sin miedo.",
    translationRu: "Если у тебя есть сомнения, спроси меня без стеснения.",
    errorType: "token",
    wrongTokenIndex: 0,
    trapLabel: "Ловушка 2: si vs sí",
    fixedEs: "Si tienes alguna duda, pregúntame sin miedo.",
    correctionRu: "Условный союз «если» пишется БЕЗ ударения (si). «Sí» с ударением означает «да»."
  },
  {
    id: 3,
    sentenceEs: "No sé si mañana vendrá Carlos a la reunión.",
    translationRu: "Не знаю, если завтра Карлос придёт на встречу.",
    errorType: "translation",
    trapLabel: "Ловушка 3: косвенный вопрос («ли»)",
    fixedRu: "Не знаю, придёт ли завтра Карлос на встречу.",
    correctionRu: "Испанское предложение с futuro (vendrá) полностью верно! Ошибка в русском переводе: в косвенном вопросе si переводится как «ли», а не «если»."
  },
  {
    id: 4,
    sentenceEs: "Si cuando eras niño tenías fiebre, tu madre te dará té con miel.",
    translationRu: "Когда ты был ребёнком, если у тебя была температура, мама давала тебе чай с мёдом.",
    errorType: "token",
    wrongTokenIndex: 9,
    trapLabel: "Согласование времён в прошлом",
    fixedEs: "Si cuando eras niño tenías fiebre, tu madre te daba té con miel.",
    correctionRu: "Для привычки в прошлом в обеих частях нужен pretérito imperfecto: tenías → daba (а не futuro dará)."
  },
  {
    id: 5,
    sentenceEs: "Te llamaré si llego antes de las ocho.",
    translationRu: "Я позвоню тебе, если приеду до восьми.",
    errorType: "none",
    trapLabel: "Ловушка 4: порядок частей",
    correctionRu: "Ошибок нет! Главная часть стоит первой (Te llamaré), запятая перед si не нужна, после si стоит presente (llego)."
  },
  {
    id: 6,
    sentenceEs: "Me preguntaron si aprobaré el examen de español.",
    translationRu: "Меня спросили, если я сдам экзамен по испанскому.",
    errorType: "translation",
    trapLabel: "Ловушка 3: косвенный вопрос («ли»)",
    fixedRu: "Меня спросили, сдам ли я экзамен по испанскому.",
    correctionRu: "В испанском всё верно (косвенный вопрос допускает futuro simple — aprobaré), а в переводе вместо «если» должно быть «сдам ли»."
  },
  {
    id: 7,
    sentenceEs: "Si ya habrás comprado el pan, prepara los bocadillos.",
    translationRu: "Если ты уже купил хлеб, приготовь бутерброды.",
    errorType: "token",
    wrongTokenIndex: 2,
    trapLabel: "Ловушка 1: futuro после si",
    fixedEs: "Si ya has comprado el pan, prepara los bocadillos.",
    correctionRu: "После si нельзя ставить futuro compuesto (habrás comprado) — нужен pretérito perfecto compuesto: has comprado."
  }
];
export const EX7_TRANSLATE_SENTENCES = [
  {
    id: 1,
    ruPrompt: "Если завтра не будет дождя, мы пойдём гулять в центр.",
    correctSentence: "Si mañana no llueve, pasearemos por el centro.",
    acceptedVariants: [
      "Si mañana no llueve, pasearemos por el centro.",
      "Si mañana no llueve, vamos a pasear por el centro.",
      "Si mañana no llueve, iremos a pasear por el centro.",
      "Si no llueve mañana, pasearemos por el centro.",
      "Si no llueve mañana, vamos a pasear por el centro.",
      "Si no llueve mañana, iremos a pasear por el centro.",
      "Si mañana no llueve, vamos a dar un paseo por el centro.",
      "Si mañana no llueve, iremos a dar un paseo por el centro.",
      "Si mañana no llueve, daremos un paseo por el centro.",
      "Si mañana no llueve, nosotros pasearemos por el centro.",
      "Si mañana no llueve, nosotros vamos a pasear por el centro."
    ],
    explanationRu: "После si — presente de indicativo (no llueve), в следствии — futuro simple (pasearemos) или ir a + infinitivo (vamos a pasear)."
  },
  {
    id: 2,
    ruPrompt: "Если ты уже прочитал статью, расскажи мне главную идею.",
    correctSentence: "Si ya has leído el artículo, cuéntame la idea principal.",
    acceptedVariants: [
      "Si ya has leído el artículo, cuéntame la idea principal.",
      "Si tú ya has leído el artículo, cuéntame la idea principal.",
      "Si ya has leído el artículo, dime la idea principal.",
      "Si ya leíste el artículo, cuéntame la idea principal.",
      "Si ya leíste el artículo, dime la idea principal."
    ],
    explanationRu: "Результат к настоящему моменту (has leído) + повелительное наклонение (cuéntame)."
  },
  {
    id: 3,
    ruPrompt: "Позвони мне, если опоздаешь на поезд.",
    correctSentence: "Llámame si pierdes el tren.",
    acceptedVariants: [
      "Llámame si pierdes el tren.",
      "Si pierdes el tren, llámame.",
      "Llámame si tú pierdes el tren.",
      "Si tú pierdes el tren, llámame.",
      "Llámame si llegas tarde al tren.",
      "Si llegas tarde al tren, llámame."
    ],
    explanationRu: "Главная часть (Llámame) стоит вначале — запятая перед si не нужна, после si ставится presente (pierdes)."
  },
  {
    id: 4,
    ruPrompt: "Если холодно, я надеваю пальто.",
    correctSentence: "Si hace frío, me pongo el abrigo.",
    acceptedVariants: [
      "Si hace frío, me pongo el abrigo.",
      "Me pongo el abrigo si hace frío.",
      "Si hace frío, yo me pongo el abrigo.",
      "Si hace frío, me pongo un abrigo.",
      "Me pongo un abrigo si hace frío."
    ],
    explanationRu: "Общее правило / привычка: si + presente de indicativo (hace) → presente de indicativo (me pongo)."
  },
  {
    id: 5,
    ruPrompt: "Если завтра будет солнечно, мы пойдём на пляж.",
    correctSentence: "Si mañana hace sol, iremos a la playa.",
    acceptedVariants: [
      "Si mañana hace sol, iremos a la playa.",
      "Si mañana hace sol, vamos a ir a la playa.",
      "Si mañana hace sol, vamos a la playa.",
      "Si hace sol mañana, iremos a la playa.",
      "Si hace sol mañana, vamos a ir a la playa.",
      "Si hace sol mañana, vamos a la playa.",
      "Si mañana hace sol, nosotros iremos a la playa.",
      "Si mañana hace sol, nosotros vamos a ir a la playa."
    ],
    explanationRu: "После si — presente de indicativo (hace sol), в следствии — futuro simple (iremos) или ir a + infinitivo (vamos a ir)."
  }
];
export const LESSON_TEXTS = [
  {
    id: "t1",
    tabLabel: "Texto 1 · Диалог",
    title: "Planes para el sábado (Lucía y Daniel)",
    isDialogue: true,
    dialogueLines: [
      { speaker: "Lucía", es: "Oye, Daniel, ¿qué hacemos este sábado? Si hace buen tiempo, podemos ir a la sierra." },
      { speaker: "Daniel", es: "Me parece genial, pero he visto las noticias: no sé si lloverá por la tarde." },
      { speaker: "Lucía", es: "Bueno, si llueve por la tarde, nos quedamos en la ciudad y vamos a la exposición nueva." },
      { speaker: "Daniel", es: "Perfecto. Oye, si ya has comprado los billetes del autobús, envíame la hora por mensaje." },
      { speaker: "Lucía", es: "Todavía no los he comprado. Si me confirmas esta noche, los compro mañana por la mañana." },
      { speaker: "Daniel", es: "Trato hecho. Y si salimos temprano, desayunaremos churros cerca de la estación." }
    ]
  },
  {
    id: "t2",
    tabLabel: "Texto 2 · Рассказ",
    title: "Los veranos en casa de la abuela",
    isDialogue: false,
    paragraphEs: "Cuando Clara era pequeña, pasaba los veranos en casa de su abuela. La abuela tenía varias reglas. Si hacía mucho calor, los niños no salían al jardín hasta las cinco de la tarde. Si llovía, jugaban a las cartas en la cocina. Si alguien llegaba tarde a la cena, la abuela le guardaba un plato en el horno. Y si Clara ayudaba en la cocina, la abuela le daba un trozo de tarta. Hoy Clara recuerda aquellos veranos con mucho cariño."
  }
];
export const TEXTOS_TF_STATEMENTS = [
  // Texto 1 (Lucía y Daniel)
  {
    id: 1,
    textId: "t1",
    statementEs: "Si hace buen tiempo el sábado, Lucía propone ir a la sierra.",
    isTrue: true,
    explanationRu: "Верно: Лусия говорит «Si hace buen tiempo, podemos ir a la sierra»."
  },
  {
    id: 2,
    textId: "t1",
    statementEs: "Daniel está completamente seguro de que no lloverá por la tarde.",
    isTrue: false,
    explanationRu: "Неверно: Даниэль говорит «no sé si lloverá por la tarde» (он не уверен, пойдёт ли дождь)."
  },
  {
    id: 3,
    textId: "t1",
    statementEs: "Si llueve por la tarde, piensan quedarse en la ciudad e ir a una exposición nueva.",
    isTrue: true,
    explanationRu: "Верно: «si llueve por la tarde, nos quedamos en la ciudad y vamos a la exposición nueva»."
  },
  {
    id: 4,
    textId: "t1",
    statementEs: "Lucía ya ha comprado los billetes del autobús.",
    isTrue: false,
    explanationRu: "Неверно: Лусия отвечает «Todavía no los he comprado»."
  },
  {
    id: 5,
    textId: "t1",
    statementEs: "Si salen temprano el sábado, desayunarán churros cerca de la estación.",
    isTrue: true,
    explanationRu: "Верно: Даниэль предлагает «si salimos temprano, desayunaremos churros cerca de la estación»."
  },
  // Texto 2 (Clara y su abuela)
  {
    id: 6,
    textId: "t2",
    statementEs: "En verano, si hacía mucho calor, los niños salían al jardín por la mañana.",
    isTrue: false,
    explanationRu: "Неверно: «Si hacía mucho calor, los niños no salían al jardín hasta las cinco de la tarde»."
  },
  {
    id: 7,
    textId: "t2",
    statementEs: "Si llovía, los niños jugaban a las cartas en la cocina.",
    isTrue: true,
    explanationRu: "Верно: «Si llovía, jugaban a las cartas en la cocina»."
  },
  {
    id: 8,
    textId: "t2",
    statementEs: "Si alguien llegaba tarde a la cena, la abuela le guardaba un plato en el horno.",
    isTrue: true,
    explanationRu: "Верно: «Si alguien llegaba tarde a la cena, la abuela le guardaba un plato en el horno»."
  },
  {
    id: 9,
    textId: "t2",
    statementEs: "Si Clara ayudaba en la cocina, la abuela le daba un trozo de tarta.",
    isTrue: true,
    explanationRu: "Верно: «Y si Clara ayudaba en la cocina, la abuela le daba un trozo de tarta»."
  }
];
export const TEXTOS_WORD_DICTIONARY: Record<string, WordEntry> = {
  oye: { lemma: "oír", infinitiveRu: "слышать (разг. «слушай»)", pos: "гл. (imperativo)", ru: "слушай" },
  daniel: { lemma: "Daniel", pos: "имя собств.", ru: "Даниэль" },
  qué: { lemma: "qué", pos: "вопр. мест.", ru: "что" },
  hacemos: { lemma: "hacer", infinitiveRu: "делать", pos: "гл. (presente)", ru: "мы делаем / будем делать" },
  este: { lemma: "este", pos: "указ. мест.", ru: "этот" },
  sábado: { lemma: "el sábado", pos: "сущ. м. р.", ru: "суббота" },
  si: { lemma: "si", pos: "союз", ru: "если / ли (в косвенном вопросе)" },
  hace: { lemma: "hacer", infinitiveRu: "делать (о погоде — стоять)", pos: "гл. (presente)", ru: "стоит (хорошая погода)" },
  buen: { lemma: "bueno / buen", pos: "прил.", ru: "хороший" },
  tiempo: { lemma: "el tiempo", pos: "сущ. м. р.", ru: "погода / время" },
  podemos: { lemma: "poder", infinitiveRu: "мочь", pos: "гл. (presente)", ru: "мы можем" },
  ir: { lemma: "ir", infinitiveRu: "идти, ехать", pos: "гл. (infinitivo)", ru: "поехать, пойти" },
  a: { lemma: "a", pos: "предлог", ru: "в, к, на" },
  la: { lemma: "la", pos: "артикль ж. р.", ru: "(определённый артикль)" },
  sierra: { lemma: "la sierra", pos: "сущ. ж. р.", ru: "горы, горная гряда" },
  me: { lemma: "me", pos: "мест.", ru: "мне / меня" },
  parece: { lemma: "parecer", infinitiveRu: "казаться", pos: "гл. (presente)", ru: "кажется (me parece genial = отлично!)" },
  genial: { lemma: "genial", pos: "прил.", ru: "отлично, здорово" },
  pero: { lemma: "pero", pos: "союз", ru: "но" },
  he: { lemma: "haber", infinitiveRu: "вспом. гл. (pretérito perfecto)", pos: "вспом. гл. (yo)", ru: "часть «he visto» / «he comprado»" },
  visto: { lemma: "ver", infinitiveRu: "видеть, смотреть", pos: "прич.", ru: "видел, посмотрел" },
  las: { lemma: "la / las", pos: "артикль ж. р. мн. ч.", ru: "(определённый артикль)" },
  noticias: { lemma: "la noticia", pos: "сущ. ж. р.", ru: "новости" },
  no: { lemma: "no", pos: "отриц. частица", ru: "не" },
  sé: { lemma: "saber", infinitiveRu: "знать", pos: "гл. (presente, yo)", ru: "я знаю" },
  lloverá: { lemma: "llover", infinitiveRu: "идти (о дожде)", pos: "гл. (futuro simple)", ru: "пойдёт (ли) дождь" },
  por: { lemma: "por", pos: "предлог", ru: "по, днём / вечером / утром" },
  tarde: { lemma: "la tarde / tarde", pos: "сущ. / нареч.", ru: "вечер, вторая половина дня; поздно" },
  bueno: { lemma: "bueno", pos: "междом.", ru: "ну ладно, хорошо" },
  llueve: { lemma: "llover", infinitiveRu: "идти (о дожде)", pos: "гл. (presente)", ru: "идёт дождь" },
  nos: { lemma: "nos", pos: "возвр. мест.", ru: "себя (nos quedamos = мы останемся)" },
  quedamos: { lemma: "quedarse", infinitiveRu: "оставаться", pos: "гл. (presente)", ru: "мы останемся" },
  en: { lemma: "en", pos: "предлог", ru: "в, на" },
  ciudad: { lemma: "la ciudad", pos: "сущ. ж. р.", ru: "город" },
  y: { lemma: "y", pos: "союз", ru: "и" },
  vamos: { lemma: "ir", infinitiveRu: "идти, ехать", pos: "гл. (presente)", ru: "мы пойдём" },
  exposición: { lemma: "la exposición", pos: "сущ. ж. р.", ru: "выставка" },
  nueva: { lemma: "nuevo / nueva", pos: "прил.", ru: "новая" },
  perfecto: { lemma: "perfecto", pos: "прил.", ru: "отлично, идеально" },
  ya: { lemma: "ya", pos: "наречие", ru: "уже" },
  has: { lemma: "haber", infinitiveRu: "вспом. гл. (pretérito perfecto)", pos: "вспом. гл. (tú)", ru: "часть «has comprado» (ты купила)" },
  comprado: { lemma: "comprar", infinitiveRu: "покупать", pos: "прич.", ru: "купил / купила" },
  los: { lemma: "el / los", pos: "артикль / мест.", ru: "(артикль м. р. мн. ч. / их)" },
  billetes: { lemma: "el billete", pos: "сущ. м. р.", ru: "билеты" },
  del: { lemma: "de + el", pos: "слияние", ru: "(родительный падеж м. р.)" },
  autobús: { lemma: "el autobús", pos: "сущ. м. р.", ru: "автобус" },
  envíame: { lemma: "enviar + me", infinitiveRu: "отправлять", pos: "гл. (imperativo)", ru: "пришли мне" },
  hora: { lemma: "la hora", pos: "сущ. ж. р.", ru: "время, час" },
  mensaje: { lemma: "el mensaje", pos: "сущ. м. р.", ru: "сообщение" },
  todavía: { lemma: "todavía", pos: "наречие", ru: "ещё (todavía no = ещё нет)" },
  confirmas: { lemma: "confirmar", infinitiveRu: "подтверждать", pos: "гл. (presente, tú)", ru: "ты подтвердишь" },
  esta: { lemma: "este / esta", pos: "указ. мест.", ru: "эта" },
  noche: { lemma: "la noche", pos: "сущ. ж. р.", ru: "ночь, вечер (esta noche = сегодня вечером)" },
  compro: { lemma: "comprar", infinitiveRu: "покупать", pos: "гл. (presente, yo)", ru: "я куплю" },
  mañana: { lemma: "mañana / la mañana", pos: "нареч. / сущ.", ru: "завтра / утро" },
  trato: { lemma: "el trato", pos: "сущ. м. р.", ru: "сделка (trato hecho = договорились!)" },
  hecho: { lemma: "hacer", infinitiveRu: "делать", pos: "прич.", ru: "сделано (trato hecho = по рукам!)" },
  salimos: { lemma: "salir", infinitiveRu: "выходить, выезжать", pos: "гл. (presente)", ru: "мы выйдем / выедем" },
  temprano: { lemma: "temprano", pos: "наречие", ru: "рано" },
  desayunaremos: { lemma: "desayunar", infinitiveRu: "завтракать", pos: "гл. (futuro simple)", ru: "мы позавтракаем" },
  churros: { lemma: "el churro", pos: "сущ. м. р.", ru: "чуррос (испанская сладкая выпечка)" },
  cerca: { lemma: "cerca de", pos: "наречие", ru: "рядом с, около" },
  de: { lemma: "de", pos: "предлог", ru: "из, от" },
  estación: { lemma: "la estación", pos: "сущ. ж. р.", ru: "вокзал, станция" },
  // Texto 2 (Clara)
  cuando: { lemma: "cuando", pos: "союз", ru: "когда" },
  clara: { lemma: "Clara", pos: "имя собств.", ru: "Клара" },
  era: { lemma: "ser", infinitiveRu: "быть", pos: "гл. (pretérito imperfecto)", ru: "была" },
  pequeña: { lemma: "pequeño / pequeña", pos: "прил.", ru: "маленькая" },
  pasaba: { lemma: "pasar", infinitiveRu: "проводить (время)", pos: "гл. (pretérito imperfecto)", ru: "проводила" },
  veranos: { lemma: "el verano", pos: "сущ. м. р.", ru: "лета (летние сезоны)" },
  casa: { lemma: "la casa", pos: "сущ. ж. р.", ru: "дом (en casa de = у кого-то дома)" },
  su: { lemma: "su", pos: "притяж. мест.", ru: "её / свой" },
  abuela: { lemma: "la abuela", pos: "сущ. ж. р.", ru: "бабушка" },
  tenía: { lemma: "tener", infinitiveRu: "иметь", pos: "гл. (pretérito imperfecto)", ru: "имела (у неё было)" },
  varias: { lemma: "varios / varias", pos: "мест.", ru: "несколько" },
  reglas: { lemma: "la regla", pos: "сущ. ж. р.", ru: "правила" },
  hacía: { lemma: "hacer", infinitiveRu: "делать (о погоде)", pos: "гл. (pretérito imperfecto)", ru: "было (жарко)" },
  mucho: { lemma: "mucho", pos: "нареч. / мест.", ru: "очень, много" },
  calor: { lemma: "el calor", pos: "сущ. м. р.", ru: "жара (hacer calor = быть жарким)" },
  niños: { lemma: "el niño", pos: "сущ. м. р.", ru: "дети" },
  salían: { lemma: "salir", infinitiveRu: "выходить", pos: "гл. (pretérito imperfecto)", ru: "выходили" },
  al: { lemma: "a + el", pos: "слияние", ru: "в, к" },
  jardín: { lemma: "el jardín", pos: "сущ. м. р.", ru: "сад" },
  hasta: { lemma: "hasta", pos: "предлог", ru: "до" },
  cinco: { lemma: "cinco", pos: "числ.", ru: "пять (las cinco = пять часов)" },
  llovía: { lemma: "llover", infinitiveRu: "идти (о дожде)", pos: "гл. (pretérito imperfecto)", ru: "шёл дождь" },
  jugaban: { lemma: "jugar", infinitiveRu: "играть", pos: "гл. (pretérito imperfecto)", ru: "играли" },
  cartas: { lemma: "la carta", pos: "сущ. ж. р.", ru: "карты (игральные)" },
  cocina: { lemma: "la cocina", pos: "сущ. ж. р.", ru: "кухня" },
  alguien: { lemma: "alguien", pos: "мест.", ru: "кто-то" },
  llegaba: { lemma: "llegar", infinitiveRu: "приходить, прибывать", pos: "гл. (pretérito imperfecto)", ru: "приходил (llegar tarde = опаздывать)" },
  cena: { lemma: "la cena", pos: "сущ. ж. р.", ru: "ужин" },
  le: { lemma: "le", pos: "мест.", ru: "ему / ей" },
  guardaba: { lemma: "guardar", infinitiveRu: "оставлять, приберегать", pos: "гл. (pretérito imperfecto)", ru: "оставляла, приберегала" },
  un: { lemma: "un", pos: "артикль м. р.", ru: "один / (неопред. артикль)" },
  plato: { lemma: "el plato", pos: "сущ. м. р.", ru: "тарелка (еды)" },
  el: { lemma: "el", pos: "артикль м. р.", ru: "(определённый артикль)" },
  horno: { lemma: "el horno", pos: "сущ. м. р.", ru: "духовка" },
  ayudaba: { lemma: "ayudar", infinitiveRu: "помогать", pos: "гл. (pretérito imperfecto)", ru: "помогала" },
  daba: { lemma: "dar", infinitiveRu: "давать", pos: "гл. (pretérito imperfecto)", ru: "давала" },
  trozo: { lemma: "el trozo", pos: "сущ. м. р.", ru: "кусок" },
  tarta: { lemma: "la tarta", pos: "сущ. ж. р.", ru: "пирог, торт" },
  hoy: { lemma: "hoy", pos: "наречие", ru: "сегодня, сейчас" },
  recuerda: { lemma: "recordar", infinitiveRu: "вспоминать, помнить", pos: "гл. (presente)", ru: "вспоминает" },
  aquellos: { lemma: "aquel / aquellos", pos: "указ. мест.", ru: "те (далёкие)" },
  con: { lemma: "con", pos: "предлог", ru: "с" },
  cariño: { lemma: "el cariño", pos: "сущ. м. р.", ru: "теплота, нежность" }
};
export const MINI_TEST_QUESTIONS = [
  {
    id: 1,
    question: "Какое предложение грамматически ПРАВИЛЬНОЕ?",
    options: [
      { id: "a", label: "Si mañana tendré tiempo, iré al gimnasio." },
      { id: "b", label: "Si mañana tengo tiempo, iré al gimnasio." },
      { id: "c", label: "Sí mañana tengo tiempo, iré al gimnasio." }
    ],
    correctId: "b",
    explanationRu: "После условного si (без ударения) ставится presente de indicativo (tengo), никогда futuro."
  },
  {
    id: 2,
    question: "Какую форму нужно выбрать для привычки в прошлом: «Si ___ tiempo libre, leíamos juntos»?",
    options: [
      { id: "a", label: "tenemos" },
      { id: "b", label: "tendremos" },
      { id: "c", label: "teníamos" }
    ],
    correctId: "c",
    explanationRu: "Для повторяющейся привычки в прошлом используется связка pretérito imperfecto → pretérito imperfecto (teníamos → leíamos)."
  },
  {
    id: 3,
    question: "Почему в фразе «No sé si vendrán hoy» можно поставить futuro simple (vendrán)?",
    options: [
      { id: "a", label: "Потому что с глаголом venir всегда ставится futuro" },
      { id: "b", label: "Потому что это косвенный вопрос (si = «ли»), а не условие" },
      { id: "c", label: "Это исключение только для множественного числа" }
    ],
    correctId: "b",
    explanationRu: "Запрет на futuro действует только для условного si («если»). В косвенном вопросе («придут ли») futuro simple правильно."
  },
  {
    id: 4,
    question: "Чем можно заменить futuro simple в главной части «Si corres, llegarás a tiempo»?",
    options: [
      { id: "a", label: "vas a llegar (ir a + infinitivo)" },
      { id: "b", label: "llegabas (pretérito imperfecto)" },
      { id: "c", label: "llegaste (pretérito indefinido)" }
    ],
    correctId: "a",
    explanationRu: "В следствии реального условия на будущее отлично работает и futuro simple (llegarás), и ir a + infinitivo (vas a llegar)."
  },
  {
    id: 5,
    question: "Выбери правильную пунктуацию:",
    options: [
      { id: "a", label: "Te escribo si llego antes." },
      { id: "b", label: "Te escribo, sí llego antes." },
      { id: "c", label: "Si llego antes te, escribo." }
    ],
    correctId: "a",
    explanationRu: "Когда главная часть стоит впереди (Te escribo), запятая перед si не нужна, а si пишется без ударения."
  }
];
