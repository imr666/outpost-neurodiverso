/* ==================================================================
   OUTPOST NEURODIVERSO / NEURODIVERSE OUTPOST — game.js
   Juego de navegador bilingüe (español / inglés). JavaScript puro:
   sin librerías, sin frameworks, sin npm.
   Autor: Irving Mellin Rubio — NASA Space Apps Challenge 2026

   CÓMO SE JUEGA
   Cada día recibes ☀️ energía y la repartes tocando los módulos de la
   base (Escudo, Aire, Invernadero, Laboratorio). Cada 3 días llega un
   evento REAL del Sol (NASA DONKI). Si usas toda la energía, el equipo
   trabaja duro y se cansa; si guardas algo, descansa.

   Orden del archivo:
     1. Datos de respaldo (eventos reales de DONKI)
     2. Parámetros del juego
     3. Superpoderes (formas de procesar, cada una con un costo)
     4. Textos en español e inglés
     5. Estado, álbum y preferencias
     6. Datos: JSON local + clima solar en vivo
     7. Reglas del juego
     8. Consejo de Ana
     9. Interfaz
    10. Sonido opcional
    11. Inicio
   ================================================================== */
'use strict';

/* ------------------------------------------------------------------
   1. DATOS DE RESPALDO
   Copia exacta de los eventos de data/donki-eventos.json: eventos
   REALES de NASA DONKI (enero de 2024 a noviembre de 2026), cada uno
   con su identificador oficial. Se usa si el navegador no deja leer
   el JSON (por ejemplo, al abrir index.html con doble clic).
   ------------------------------------------------------------------ */
const EVENTOS_RESPALDO = [
  {
    "fecha": "2024-02-09",
    "tipo": "SEP",
    "clase": null,
    "region_activa": "13575",
    "intensidad": "media",
    "descripcion": "Tormenta de partículas que siguió a la fulguración X3.3 de la región 13575.",
    "descripcion_en": "Particle storm that followed the X3.3 flare from region 13575.",
    "id_donki": "2024-02-09T15:09:00-SEP-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/SEP/29076/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/SEP?startDate=2024-02-08&endDate=2024-02-10"
  },
  {
    "fecha": "2024-02-22",
    "tipo": "FLR",
    "clase": "X6.3",
    "region_activa": "13590",
    "intensidad": "alta",
    "descripcion": "Fulguración clase X6.3 de la región activa 13590.",
    "descripcion_en": "Class X6.3 flare from active region 13590.",
    "id_donki": "2024-02-22T22:08:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/29349/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2024-02-21&endDate=2024-02-23&class=X"
  },
  {
    "fecha": "2024-03-23",
    "tipo": "FLR",
    "clase": "X1.1",
    "region_activa": "13614",
    "intensidad": "media",
    "descripcion": "Fulguración clase X1.1. Pocas horas después llegó una tormenta de partículas.",
    "descripcion_en": "Class X1.1 flare. A few hours later a particle storm arrived.",
    "id_donki": "2024-03-23T00:58:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/29708/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2024-03-22&endDate=2024-03-24&class=X"
  },
  {
    "fecha": "2024-03-23",
    "tipo": "SEP",
    "clase": null,
    "region_activa": "13614",
    "intensidad": "media",
    "descripcion": "Tormenta de partículas que siguió a la fulguración X1.1 de la región 13614.",
    "descripcion_en": "Particle storm that followed the X1.1 flare from region 13614.",
    "id_donki": "2024-03-23T05:57:00-SEP-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/SEP/29721/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/SEP?startDate=2024-03-22&endDate=2024-03-24"
  },
  {
    "fecha": "2024-05-11",
    "tipo": "FLR",
    "clase": "X5.8",
    "region_activa": "13664",
    "intensidad": "alta",
    "descripcion": "Parte de las tormentas solares de mayo de 2024, que causaron auroras vistas en muchos países.",
    "descripcion_en": "Part of the May 2024 solar storms that caused auroras seen in many countries.",
    "id_donki": "2024-05-11T01:10:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/30711/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2024-05-10&endDate=2024-05-12&class=X"
  },
  {
    "fecha": "2024-05-11",
    "tipo": "SEP",
    "clase": null,
    "region_activa": "13664",
    "intensidad": "alta",
    "descripcion": "Tormenta de partículas que siguió a la fulguración X5.8 de la región 13664. Algunas partículas fueron muy energéticas (más de 100 MeV).",
    "descripcion_en": "Particle storm that followed the X5.8 flare from region 13664. Some particles were very energetic (over 100 MeV).",
    "id_donki": "2024-05-11T02:10:00-SEP-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/SEP/30714/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/SEP?startDate=2024-05-10&endDate=2024-05-12"
  },
  {
    "fecha": "2024-05-14",
    "tipo": "FLR",
    "clase": "X8.7",
    "region_activa": "13664",
    "intensidad": "alta",
    "descripcion": "La segunda fulguración más fuerte registrada en DONKI entre 2024 y 2026.",
    "descripcion_en": "The second strongest flare recorded in DONKI in 2024-2026.",
    "id_donki": "2024-05-14T16:46:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/30849/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2024-05-13&endDate=2024-05-15&class=X"
  },
  {
    "fecha": "2024-09-14",
    "tipo": "FLR",
    "clase": "X4.5",
    "region_activa": "13825",
    "intensidad": "media",
    "descripcion": "Fulguración clase X4.5 de la región activa 13825.",
    "descripcion_en": "Class X4.5 flare from active region 13825.",
    "id_donki": "2024-09-14T15:13:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/33428/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2024-09-13&endDate=2024-09-15&class=X"
  },
  {
    "fecha": "2024-10-01",
    "tipo": "FLR",
    "clase": "X7.1",
    "region_activa": "13842",
    "intensidad": "alta",
    "descripcion": "Fulguración clase X7.1 de la región activa 13842.",
    "descripcion_en": "Class X7.1 flare from active region 13842.",
    "id_donki": "2024-10-01T21:58:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/33656/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2024-09-30&endDate=2024-10-02&class=X"
  },
  {
    "fecha": "2024-10-03",
    "tipo": "FLR",
    "clase": "X9.0",
    "region_activa": "13842",
    "intensidad": "alta",
    "descripcion": "La fulguración más fuerte registrada en DONKI entre 2024 y 2026.",
    "descripcion_en": "The strongest flare recorded in DONKI in 2024-2026.",
    "id_donki": "2024-10-03T12:08:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/33693/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2024-10-02&endDate=2024-10-04&class=X"
  },
  {
    "fecha": "2024-10-09",
    "tipo": "FLR",
    "clase": "X1.8",
    "region_activa": "13848",
    "intensidad": "media",
    "descripcion": "Fulguración clase X1.8. Esa misma mañana llegó una tormenta de partículas.",
    "descripcion_en": "Class X1.8 flare. That same morning a particle storm arrived.",
    "id_donki": "2024-10-09T01:25:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/33863/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2024-10-08&endDate=2024-10-10&class=X"
  },
  {
    "fecha": "2024-10-09",
    "tipo": "SEP",
    "clase": null,
    "region_activa": "13848",
    "intensidad": "alta",
    "descripcion": "Tormenta de partículas que siguió a la fulguración X1.8 de la región 13848. Algunas partículas fueron muy energéticas (más de 100 MeV).",
    "descripcion_en": "Particle storm that followed the X1.8 flare from region 13848. Some particles were very energetic (over 100 MeV).",
    "id_donki": "2024-10-09T03:50:00-SEP-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/SEP/33868/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/SEP?startDate=2024-10-08&endDate=2024-10-10"
  },
  {
    "fecha": "2025-11-11",
    "tipo": "FLR",
    "clase": "X5.1",
    "region_activa": "14274",
    "intensidad": "alta",
    "descripcion": "La fulguración más fuerte de 2025 registrada en DONKI.",
    "descripcion_en": "The strongest flare of 2025 recorded in DONKI.",
    "id_donki": "2025-11-11T09:49:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/42610/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2025-11-10&endDate=2025-11-12&class=X"
  },
  {
    "fecha": "2025-11-11",
    "tipo": "SEP",
    "clase": null,
    "region_activa": "14274",
    "intensidad": "alta",
    "descripcion": "Tormenta de partículas que siguió a la fulguración X5.1 de la región 14274. Algunas partículas fueron muy energéticas (más de 100 MeV).",
    "descripcion_en": "Particle storm that followed the X5.1 flare from region 14274. Some particles were very energetic (over 100 MeV).",
    "id_donki": "2025-11-11T09:45:00-SEP-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/SEP/42608/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/SEP?startDate=2025-11-10&endDate=2025-11-12"
  },
  {
    "fecha": "2025-11-14",
    "tipo": "FLR",
    "clase": "X4.0",
    "region_activa": "14274",
    "intensidad": "media",
    "descripcion": "Fulguración clase X4.0 de la misma región que la X5.1 de tres días antes.",
    "descripcion_en": "Class X4.0 flare from the same region as the X5.1 flare three days earlier.",
    "id_donki": "2025-11-14T07:44:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/42702/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2025-11-13&endDate=2025-11-15&class=X"
  },
  {
    "fecha": "2026-02-01",
    "tipo": "FLR",
    "clase": "X8.1",
    "region_activa": "14366",
    "intensidad": "alta",
    "descripcion": "La fulguración más fuerte de 2026 registrada en DONKI hasta el 14 de noviembre.",
    "descripcion_en": "The strongest flare of 2026 recorded in DONKI up to November 14.",
    "id_donki": "2026-02-01T23:44:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/44361/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2026-01-31&endDate=2026-02-02&class=X"
  },
  {
    "fecha": "2026-02-04",
    "tipo": "FLR",
    "clase": "X4.2",
    "region_activa": "14366",
    "intensidad": "media",
    "descripcion": "Fulguración clase X4.2 de la misma región que la X8.1 de tres días antes.",
    "descripcion_en": "Class X4.2 flare from the same region as the X8.1 flare three days earlier.",
    "id_donki": "2026-02-04T12:02:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/44437/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2026-02-03&endDate=2026-02-05&class=X"
  },
  {
    "fecha": "2026-04-24",
    "tipo": "FLR",
    "clase": "X2.5",
    "region_activa": "14419",
    "intensidad": "media",
    "descripcion": "Fulguración clase X2.5 de la región activa 14419, la segunda X de ese mismo día.",
    "descripcion_en": "Class X2.5 flare from active region 14419, the second X flare that day.",
    "id_donki": "2026-04-24T08:01:00-FLR-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/45836/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2026-04-23&endDate=2026-04-25&class=X"
  },
  {
    "fecha": "2026-07-30",
    "tipo": "SEP",
    "clase": null,
    "region_activa": "14492",
    "intensidad": "alta",
    "descripcion": "Tormenta de partículas que siguió a la fulguración M1.9 de la región 14492. Algunas partículas fueron muy energéticas (más de 100 MeV).",
    "descripcion_en": "Particle storm that followed the M1.9 flare from region 14492. Some particles were very energetic (over 100 MeV).",
    "id_donki": "2026-07-30T18:20:00-SEP-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/SEP/47868/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/SEP?startDate=2026-07-29&endDate=2026-07-31"
  },
  {
    "fecha": "2026-09-05",
    "tipo": "SEP",
    "clase": null,
    "region_activa": "14520",
    "intensidad": "alta",
    "descripcion": "Tormenta de partículas que siguió a la fulguración M1.0 de la región 14520. Algunas partículas fueron muy energéticas (más de 100 MeV).",
    "descripcion_en": "Particle storm that followed the M1.0 flare from region 14520. Some particles were very energetic (over 100 MeV).",
    "id_donki": "2026-09-05T15:45:00-SEP-001",
    "pagina_donki": "https://ccmc.gsfc.nasa.gov/DONKI/view/SEP/48551/-1",
    "verificar": "https://ccmc.gsfc.nasa.gov/DONKI-API/get/SEP?startDate=2026-09-04&endDate=2026-09-06"
  }
];

/* ------------------------------------------------------------------
   2. PARÁMETROS DEL JUEGO (ajustados con miles de partidas simuladas)
   ------------------------------------------------------------------ */
const CONFIG = {
  orbesPorDia: 4,                                          // energía solar de cada día
  aire:    { inicio: 10, max: 10, consumo: 2, porOrbe: 2 },  // el equipo respira 2 por noche
  comida:  { inicio: 7, max: 9, consumo: 1, cosecha: 4, orbesPorCosecha: 3 },
  escudo:  { inicio: 3, max: 5, desgasteCadaDias: 1, reqMedia: 3, reqAlta: 4 },
  ciencia: { orbesPorMuestra: 2, meta: 3 },
  // Energía mental del equipo (la carga cognitiva, al revés): 0 a 4.
  // "cambio" dice cuánto sube o baja según la energía usada en el día (0, 1, 2, 3, 4).
  mente:   { inicio: 3, max: 4, diasEnCeroParaFin: 3, orbesSiAgotada: 2, cambio: [1, 1, 1, 0, -1] },
  danoTormenta: { aire: 3, mente: 1 },                     // tormenta SEP sin escudo suficiente
  hambreMente: 2,                                          // si no hay comida
  diasEntreEventos: 3                                      // un evento real cada 3 días
};

const MODULOS = ['escudo', 'aire', 'invernadero', 'lab'];
const ICONO_MODULO = { escudo: '🛡️', aire: '💨', invernadero: '🌱', lab: '🔬' };
const CARAS = ['😫', '😟', '😐', '🙂', '😄'];             // energía mental 0 a 4
const PLANTA = ['🌰', '🌱', '🌿', '🥬'];                    // crecimiento 0 a 3
const DONKI_API = 'https://ccmc.gsfc.nasa.gov/DONKI-API/get/';

/* ------------------------------------------------------------------
   3. SUPERPODERES
   Son las formas de procesar la información. Ninguno es el "normal":
   todos ayudan en algo y todos cuestan algo.
   ------------------------------------------------------------------ */
const PODERES = {
  visual:       { icono: '👁️', dias: 10, consejos: false, vistaPrevia: false, pronostico: false, narrador: false, costoPar: false, costoAntena: false },
  pasoapaso:    { icono: '👣', dias: 10, consejos: true,  vistaPrevia: true,  pronostico: false, narrador: false, costoPar: true,  costoAntena: false },
  narrado:      { icono: '📖', dias: 12, consejos: true,  vistaPrevia: false, pronostico: false, narrador: true,  costoPar: false, costoAntena: false },
  sinsorpresas: { icono: '🔭', dias: 10, consejos: true,  vistaPrevia: false, pronostico: true,  narrador: false, costoPar: false, costoAntena: true }
};

/* ------------------------------------------------------------------
   4. TEXTOS (español e inglés). Para corregir un texto, búscalo aquí.
   ------------------------------------------------------------------ */
const TEXTOS = {
  es: {
    titulo: '🌙 Outpost Neurodiverso',
    tituloSin: 'Outpost Neurodiverso',
    lema: 'Cuida una base en la Luna. El Sol es real.',
    pie: 'Datos reales de <a href="https://ccmc.gsfc.nasa.gov/tools/DONKI/" target="_blank" rel="noopener">NASA DONKI</a> (eventos solares históricos 2024-2026). No son predicciones oficiales. · <strong>Irving Mellin Rubio</strong> · Space Apps 2026',
    idioma: '🌐 English', ariaIdioma: 'Change language to English',
    sonidoOn: '🔊', sonidoOff: '🔇', ariaSonido: 'Activar o desactivar el sonido',
    album: (p) => '🎴 ' + p.n + '/' + p.t,
    ariaAlbum: 'Abrir el álbum de cartas',
    comoJugar: '❔ Cómo jugar',
    dia: (p) => 'Día ' + p.d + ' de ' + p.t,
    metas: 'Metas',
    metaSobrevivir: 'Aguantar todos los días',
    metaCiencia: (p) => 'Juntar ' + p.m + ' muestras de ciencia',
    metaTormentas: 'Bloquear todas las tormentas',
    metaCortaSobrevivir: 'Aguantar', metaCortaCiencia: (p) => 'Ciencia ' + p.n + '/' + p.m, metaCortaTormentas: 'Tormentas',

    // Inicio
    inicioTitulo: 'Tu equipo te necesita en la Luna',
    inicioTexto: 'Cada día el Sol te da ☀️ energía. Repártela tocando los módulos de la base. Cada 3 días llega un evento real del Sol. ¿Podrás proteger a Ana, Teo y Kiara?',
    elegirPoder: 'Elige el superpoder de tu equipo',
    notaPoderes: 'Ningún superpoder es el "normal": todos ayudan en algo y todos cuestan algo.',
    ayuda: 'Te ayuda:',
    costo: 'Cuesta:',
    empezar: (p) => '🚀 Empezar con ' + p.n,
    empezarInactivo: 'Elige un superpoder',
    planAnterior: (p) => '📝 Tu plan de la misión anterior: ' + p.t,
    poder_visual_nombre: 'Vista rápida',
    poder_visual_ayuda: 'Pocas palabras: todo con íconos.',
    poder_visual_costo: 'Ana no te da consejos.',
    poder_pasoapaso_nombre: 'Planificador',
    poder_pasoapaso_ayuda: 'Ves cómo quedará todo antes de terminar el día.',
    poder_pasoapaso_costo: '1 ☀️ menos cada 2 días.',
    poder_narrado_nombre: 'Narrador',
    poder_narrado_ayuda: 'Explicaciones y datos curiosos de la NASA.',
    poder_narrado_costo: 'La misión dura 12 días en vez de 10.',
    poder_sinsorpresas_nombre: 'Pronóstico',
    poder_sinsorpresas_ayuda: 'Sabes qué evento viene y cuánto escudo necesitas.',
    poder_sinsorpresas_costo: 'La antena gasta 1 ☀️ el día antes de cada evento.',

    // Clima en vivo
    climaCargando: '☀️ Preguntando a la NASA cómo está el Sol esta semana…',
    climaError: '☀️ No se pudo consultar NASA DONKI ahora. Juegas con los eventos guardados.',
    climaTitulo: '☀️ El Sol esta semana',
    climaTranquilo: '🙂 tranquilo', climaActivo: '😮 activo', climaMuyActivo: '🔥 muy activo',
    climaDestellos: (p) => p.n + ' destellos',
    climaCME: (p) => p.n + ' nubes solares (CME)',
    climaSEP: (p) => p.n + ' tormentas de partículas',
    climaFuente: (p) => 'Datos en vivo de NASA DONKI, del ' + p.d + ' al ' + p.h + '.' +
                        (p.r ? ' ' + p.r + (p.r === 1 ? ' evento fuerte del último mes entra' : ' eventos fuertes del último mes entran') + ' a la misión.' : ''),

    // Módulos
    mod_escudo: 'Escudo', mod_aire: 'Aire', mod_invernadero: 'Invernadero', mod_lab: 'Laboratorio',
    tip_escudo: 'Una capa de regolito (tierra de la Luna) que frena la radiación del Sol. Cada ☀️ suma 1 nivel. Se gasta 1 nivel cada noche.',
    tip_aire: 'El oxígeno que respira el equipo. Cada ☀️ da 2. Cada noche se gastan 2. ¡Si se acaba, la misión termina!',
    tip_invernadero: 'Con 3 ☀️ la lechuga crece y cosechas 4 días de comida. Cada noche el equipo come 1. La NASA ya cultivó lechuga y chiles en la Estación Espacial.',
    tip_lab: 'Cada 2 ☀️ consigues 1 muestra de ciencia. La meta es juntar 3.',
    nivel: (p) => 'Nivel ' + p.n,
    aireValor: (p) => p.n + ' de 10',
    comidaValor: (p) => '🍽️ ' + p.n + (p.n === 1 ? ' día' : ' días'),
    crecimiento: (p) => p.n + ' de 3 para cosechar',
    muestras: (p) => p.n + ' de ' + p.m + ' muestras',
    progreso: (p) => 'próxima: ' + p.n + ' de 2',
    necesitas: (p) => 'Necesitas ' + p.n + ' para el evento',
    quitar: 'Quitar uno',
    ariaModulo: (p) => p.n + ': dar 1 ☀️ de energía. Ahora tiene ' + p.k + '.',
    sugeridos: (p) => '💡 ' + p.n,

    // Tripulación
    equipo: 'Tu equipo',
    roles: { ana: 'comandante', teo: 'ingeniero', kiara: 'científica' },
    menteNombre: 'Energía mental',
    tipMente: 'Qué tan descansada está la mente del equipo (lo contrario de la carga cognitiva). Usar 0 a 2 ☀️ en un día: descansan (+1). Usar 3: se quedan igual. Usar 4: se cansan (−1). Si llega a 0, al día siguiente solo pueden trabajar con 2 ☀️.',
    menteEstado: ['agotados', 'cansados', 'ocupados', 'bien', 'con mucha energía'],

    // Pronóstico
    pronostico: '☀️ Pronóstico del Sol',
    hoy: 'Hoy', manana: 'Mañana', enDias: (p) => 'En ' + p.n + ' días',
    eventoEsta: '⚠️ Evento del Sol esta noche',
    eventoEn: (p) => p.n === 1 ? '⚠️ Evento del Sol mañana' : '⚠️ Evento del Sol en ' + p.n + ' días',
    eventoDesconocido: 'Puede ser un destello (sin daño) o una tormenta de partículas (necesitas 🛡️ 3 o 4).',
    eventoConocidoSEP: (p) => 'Tormenta de partículas: necesitas 🛡️ ' + p.n + '.',
    eventoConocidoFLR: 'Destello solar: no hace daño. ¡Tranquilo!',
    radioCortada: '📡 Un destello cortó la radio: hoy no llega el pronóstico.',
    sinEventos: 'No quedan eventos del Sol en esta misión.',

    // Consejo de Ana
    anaDice: '👩‍🚀 Ana sugiere',
    usarSugerencia: '💡 Usar sugerencia',
    sugEscudo: (p) => p.d === 0 ? 'El evento llega esta noche: refuerza el escudo.' : 'Un evento llega ' + (p.d === 1 ? 'mañana' : 'en ' + p.d + ' días') + ': empieza a reforzar el escudo.',
    sugAire: (p) => 'El aire está en ' + p.a + '. Dale energía al módulo de aire.',
    sugComida: (p) => 'Quedan ' + p.c + ' días de comida. Cultiva en el invernadero.',
    sugCiencia: 'Todo está tranquilo: buen momento para hacer ciencia.',
    sugDescanso: 'El equipo está cansado. Usa poca energía hoy para que descanse.',
    sugEquilibrio: 'Reparte la energía y deja descansar al equipo cuando puedas.',
    sugGuardar: 'Deja 1 ☀️ sin usar hoy: así el equipo no se cansa.',
    sinConsejos: 'Con Vista rápida, tú decides solo. Mira el pronóstico y las caras del equipo.',
    leyenda: ['🛡️ 3 o 4 → 🌪️ sin daño', '🛡️ −1 cada noche', '💨 −2 cada noche · ☀️ = +2', '🍽️ −1 cada noche · 3 ☀️ = +4', '🔬 2 ☀️ = 1 🧪'],

    // Vista previa (Planificador)
    vistaPrevia: '👣 Si terminas el día así…',
    deshacer: '↩️ Deshacer todo',
    vpAire: (p) => '💨 Aire: ' + p.a + ' → ' + p.b,
    vpEscudo: (p) => '🛡️ Escudo: ' + p.a + ' → ' + p.b,
    vpComida: (p) => '🍽️ Comida: ' + p.a + ' → ' + p.b,
    vpMente: (p) => '🧠 Energía mental: ' + CARAS[p.a] + ' → ' + CARAS[p.b],
    vpEvento: (p) => p.ok ? '☀️ El evento de esta noche: ¡protegidos!' : '☀️ El evento de esta noche: puede alcanzarlos.',

    // Bandeja de energía
    energiaHoy: '☀️ Energía de hoy',
    quedan: (p) => p.n === 1 ? 'Te queda 1 ☀️' : 'Te quedan ' + p.n + ' ☀️',
    usadaTodo: 'Usaste toda la energía de hoy.',
    reglaDescanso: 'Usar 0-2 ☀️: el equipo descansa · 3: igual · 4: se cansa',
    motivo_costoPlanificador: 'Planificador: −1 ☀️ hoy',
    motivo_costoAntena: 'Antena del pronóstico: −1 ☀️ hoy',
    motivo_agotados: 'Equipo agotado: hoy solo 2 ☀️',
    terminarDia: '🌙 Terminar el día',

    // Noche
    noche: (p) => '🌙 Noche del día ' + p.d,
    nocheDescanso: '😴 El equipo descansó: energía mental +1.',
    nocheNormal: '🙂 Fue un día normal de trabajo.',
    nocheDuro: '😓 Trabajaron muchísimo: energía mental −1.',
    nocheCosecha: '🥬 ¡Cosecha! +4 días de comida.',
    nocheMuestra: (p) => '🔬 ¡' + (p.n === 1 ? 'Nueva muestra' : p.n + ' nuevas muestras') + ' de ciencia!',
    nocheComen: '🍽️ Cenaron: comida −1.',
    nocheHambre: '😟 No había comida: energía mental −2.',
    nocheRespiran: '💨 Respiraron toda la noche: aire −2.',
    nocheDesgaste: '🛡️ El polvo y el Sol gastaron el escudo: −1.',
    nuevaCarta: '🎴 ¡Nueva carta para tu álbum!',
    cartaRepetida: '🎴 Ya tenías esta carta en tu álbum.',
    bloqueada: (p) => '✅ ¡Escudo ' + p.e + '! La tormenta no les hizo daño.',
    alcanzo: (p) => '⚠️ El escudo estaba en ' + p.e + ' y se necesitaba ' + p.r + '. Aire −3 y energía mental −1.',
    destelloRes: '✅ Un destello no hace daño en la base. Cortó la radio hasta mañana.',
    siguienteDia: (p) => '☀️ Empezar el día ' + p.d,
    verFinal: '🏁 Ver cómo terminó la misión',

    // Cartas
    cartaFLR: 'Destello solar',
    cartaSEP: 'Tormenta de partículas',
    cartaClase: (p) => 'Clase ' + p.c,
    cartaRegion: (p) => 'Región ' + p.r,
    cartaReal: 'Evento real · NASA DONKI',
    cartaReciente: '🆕 Reciente',
    cartaVerificar: '🔎 Ver este evento en la web de la NASA',
    explicaFLR: 'Un destello enorme de luz y rayos X. Llega en unos 8 minutos y puede cortar la radio, pero no hace daño dentro de la base. La X marca los más fuertes.',
    explicaSEP: 'Partículas diminutas y muy rápidas que lanza el Sol. Pueden dañar el cuerpo; por eso la base necesita escudo. En la Luna no hay aire ni campo magnético que proteja.',
    albumTitulo: '🎴 Tu álbum de eventos reales del Sol',
    albumTexto: 'Cada evento que vives en una misión se guarda aquí. Todos ocurrieron de verdad y los registró la NASA.',
    albumBloqueada: '¿?',
    cerrar: 'Cerrar',

    // Cómo jugar
    comoTitulo: '❔ Cómo se juega',
    paso1: 'Toca un módulo para darle ☀️ energía. Tocar «−» la quita.',
    paso2: 'Mira el pronóstico: antes de una tormenta, sube el escudo.',
    paso3: 'Termina el día. Si usas 0-2 ☀️, el equipo descansa; con 4, se cansa.',
    paso4: 'Gana estrellas: aguanta, haz ciencia y bloquea tormentas. ¡Junta cartas reales!',
    entendido: '¡Entendido!',

    // Final
    finVictoria: '🌕 ¡Misión cumplida!',
    finAire: '🌗 Se acabó el aire',
    finMente: '🌗 El equipo necesitó volver a descansar',
    finSubVictoria: (p) => 'Tu equipo aguantó los ' + p.d + ' días en la Luna.',
    finSubAire: (p) => 'El equipo volvió a la Tierra a salvo en el día ' + p.d + '.',
    finSubMente: (p) => 'Estuvieron agotados 3 días seguidos y volvieron a la Tierra en el día ' + p.d + '.',
    despedidaBien: '👩‍🚀 Ana: «¡Gracias por cuidarnos! Fue un gusto trabajar contigo.»',
    despedidaOtra: '👩‍🚀 Ana: «Volvimos a salvo. Las misiones reales también se repiten. ¿Lo intentamos otra vez?»',
    estrellas: 'Tus estrellas',
    resumenMision: (p) => '🔬 ' + p.m + (p.m === 1 ? ' muestra' : ' muestras') + ' · 🥬 ' + p.c + (p.c === 1 ? ' cosecha' : ' cosechas') +
                          ' · 🛡️ ' + p.b + ' de ' + p.t + ' tormentas bloqueadas · 🎴 ' + p.n + (p.n === 1 ? ' carta nueva' : ' cartas nuevas'),
    pistaAire: 'Pista: dale energía al aire antes de que baje de 4.',
    pistaMente: 'Pista: usa 2 ☀️ algunos días para que el equipo descanse.',
    pistaTormentas: 'Pista: mira el pronóstico y sube el escudo el día antes de un evento.',
    pistaCiencia: 'Pista: el laboratorio necesita 2 ☀️ por muestra. Usa los días tranquilos.',
    pistaTodo: '¡Lo lograste todo! Prueba otro superpoder o completa tu álbum.',
    queProbaras: '¿Qué probarás la próxima vez?',
    plan1: 'Subir el escudo antes de cada evento', plan2: 'Dejar descansar al equipo',
    plan3: 'Hacer más ciencia', plan4: 'Probar otro superpoder',
    placeholderPlan: 'O escríbelo con tus palabras…',
    otraVez: '🚀 Jugar otra vez',
    verAlbum: '🎴 Ver mi álbum',
    meses: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    frases: {
      escudo: ['Teo: «¡Más regolito arriba!»', 'Teo: «El escudo está más fuerte.»'],
      aire: ['Ana: «Ahora respiramos tranquilos.»', 'Ana: «Tanque de aire recargado.»'],
      invernadero: ['Kiara: «¡Las lechugas crecen!»', 'Kiara: «Cuidar plantas me pone feliz.»'],
      lab: ['Kiara: «¡Encontré minerales brillantes!»', 'Kiara: «Datos nuevos para la Tierra.»']
    },
    narracion: [
      'El Sol está muy activo estos años: está cerca del máximo de su ciclo de unos 11 años.',
      'Las tormentas de partículas no se ven: solo los instrumentos las detectan.',
      'Una señal de radio tarda poco más de 1 segundo de la Luna a la Tierra; desde Marte, a veces más de 20 minutos.',
      'Una capa gruesa de regolito (tierra lunar) puede frenar mucha radiación.',
      'En la Estación Espacial, la NASA cultivó chiles durante 137 días y cosechó 26 frutos.',
      'Las lechugas cultivadas en la cámara Veggie de la Estación Espacial fueron seguras para comer.',
      'Una mente cansada se equivoca más. Le pasa a cualquier persona, también a los astronautas.',
      'Los destellos se clasifican A, B, C, M y X. Cada letra es 10 veces más fuerte que la anterior.',
      'En mayo de 2024, las tormentas solares causaron auroras vistas en muchos países.',
      'La fulguración más fuerte del juego es la X9.0 del 3 de octubre de 2024.',
      'El Sol está a unos 150 millones de kilómetros: su luz tarda unos 8 minutos en llegar.',
      'DONKI es la base de datos de la NASA que registra todo lo que hace el Sol.'
    ]
  },

  en: {
    titulo: '🌙 Neurodiverse Outpost',
    tituloSin: 'Neurodiverse Outpost',
    lema: 'Take care of a Moon base. The Sun is real.',
    pie: 'Real data from <a href="https://ccmc.gsfc.nasa.gov/tools/DONKI/" target="_blank" rel="noopener">NASA DONKI</a> (historical solar events 2024-2026). Not official forecasts. · <strong>Irving Mellin Rubio</strong> · Space Apps 2026',
    idioma: '🌐 Español', ariaIdioma: 'Cambiar el idioma a español',
    sonidoOn: '🔊', sonidoOff: '🔇', ariaSonido: 'Turn sound on or off',
    album: (p) => '🎴 ' + p.n + '/' + p.t,
    ariaAlbum: 'Open the card album',
    comoJugar: '❔ How to play',
    dia: (p) => 'Day ' + p.d + ' of ' + p.t,
    metas: 'Goals',
    metaSobrevivir: 'Last all the days',
    metaCiencia: (p) => 'Collect ' + p.m + ' science samples',
    metaTormentas: 'Block every storm',
    metaCortaSobrevivir: 'Survive', metaCortaCiencia: (p) => 'Science ' + p.n + '/' + p.m, metaCortaTormentas: 'Storms',

    inicioTitulo: 'Your crew needs you on the Moon',
    inicioTexto: 'Each day the Sun gives you ☀️ power. Share it by tapping the base modules. Every 3 days a real Sun event arrives. Can you protect Ana, Teo and Kiara?',
    elegirPoder: 'Choose your crew’s superpower',
    notaPoderes: 'No superpower is the "normal" one: each helps with something and each costs something.',
    ayuda: 'Helps you:',
    costo: 'Costs:',
    empezar: (p) => '🚀 Start with ' + p.n,
    empezarInactivo: 'Choose a superpower',
    planAnterior: (p) => '📝 Your plan from last mission: ' + p.t,
    poder_visual_nombre: 'Quick eye',
    poder_visual_ayuda: 'Few words: everything with icons.',
    poder_visual_costo: 'Ana gives you no tips.',
    poder_pasoapaso_nombre: 'Planner',
    poder_pasoapaso_ayuda: 'See how everything will look before you end the day.',
    poder_pasoapaso_costo: '1 less ☀️ every 2 days.',
    poder_narrado_nombre: 'Narrator',
    poder_narrado_ayuda: 'Explanations and fun NASA facts.',
    poder_narrado_costo: 'The mission lasts 12 days instead of 10.',
    poder_sinsorpresas_nombre: 'Forecaster',
    poder_sinsorpresas_ayuda: 'You know which event is coming and how much shield you need.',
    poder_sinsorpresas_costo: 'The antenna uses 1 ☀️ the day before each event.',

    climaCargando: '☀️ Asking NASA how the Sun is doing this week…',
    climaError: '☀️ Could not reach NASA DONKI right now. You play with the saved events.',
    climaTitulo: '☀️ The Sun this week',
    climaTranquilo: '🙂 calm', climaActivo: '😮 active', climaMuyActivo: '🔥 very active',
    climaDestellos: (p) => p.n + ' flares',
    climaCME: (p) => p.n + ' solar clouds (CME)',
    climaSEP: (p) => p.n + ' particle storms',
    climaFuente: (p) => 'Live data from NASA DONKI, ' + p.d + ' to ' + p.h + '.' +
                        (p.r ? ' ' + p.r + (p.r === 1 ? ' strong event from the last month joins' : ' strong events from the last month join') + ' the mission.' : ''),

    mod_escudo: 'Shield', mod_aire: 'Air', mod_invernadero: 'Greenhouse', mod_lab: 'Lab',
    tip_escudo: 'A layer of regolith (Moon dirt) that blocks the Sun’s radiation. Each ☀️ adds 1 level. It wears down 1 level every night.',
    tip_aire: 'The oxygen the crew breathes. Each ☀️ gives 2. Every night 2 are used. If it runs out, the mission ends!',
    tip_invernadero: 'With 3 ☀️ the lettuce grows and you harvest 4 days of food. Every night the crew eats 1. NASA has grown lettuce and chile peppers on the Space Station.',
    tip_lab: 'Every 2 ☀️ give you 1 science sample. The goal is 3.',
    nivel: (p) => 'Level ' + p.n,
    aireValor: (p) => p.n + ' of 10',
    comidaValor: (p) => '🍽️ ' + p.n + (p.n === 1 ? ' day' : ' days'),
    crecimiento: (p) => p.n + ' of 3 to harvest',
    muestras: (p) => p.n + ' of ' + p.m + ' samples',
    progreso: (p) => 'next: ' + p.n + ' of 2',
    necesitas: (p) => 'You need ' + p.n + ' for the event',
    quitar: 'Remove one',
    ariaModulo: (p) => p.n + ': give 1 ☀️ of power. It has ' + p.k + ' now.',
    sugeridos: (p) => '💡 ' + p.n,

    equipo: 'Your crew',
    roles: { ana: 'commander', teo: 'engineer', kiara: 'scientist' },
    menteNombre: 'Mental energy',
    tipMente: 'How rested the crew’s minds are (the opposite of cognitive load). Using 0 to 2 ☀️ in a day: they rest (+1). Using 3: no change. Using 4: they get tired (−1). At 0, the next day they can only work with 2 ☀️.',
    menteEstado: ['exhausted', 'tired', 'busy', 'fine', 'full of energy'],

    pronostico: '☀️ Sun forecast',
    hoy: 'Today', manana: 'Tomorrow', enDias: (p) => 'In ' + p.n + ' days',
    eventoEsta: '⚠️ Sun event tonight',
    eventoEn: (p) => p.n === 1 ? '⚠️ Sun event tomorrow' : '⚠️ Sun event in ' + p.n + ' days',
    eventoDesconocido: 'It may be a flare (no harm) or a particle storm (you need 🛡️ 3 or 4).',
    eventoConocidoSEP: (p) => 'Particle storm: you need 🛡️ ' + p.n + '.',
    eventoConocidoFLR: 'Solar flare: no harm. Relax!',
    radioCortada: '📡 A flare cut the radio: no forecast today.',
    sinEventos: 'No more Sun events in this mission.',

    anaDice: '👩‍🚀 Ana suggests',
    usarSugerencia: '💡 Use suggestion',
    sugEscudo: (p) => p.d === 0 ? 'The event arrives tonight: build up the shield.' : 'An event arrives ' + (p.d === 1 ? 'tomorrow' : 'in ' + p.d + ' days') + ': start building the shield.',
    sugAire: (p) => 'Air is at ' + p.a + '. Give power to the air module.',
    sugComida: (p) => p.c + ' days of food left. Grow food in the greenhouse.',
    sugCiencia: 'Everything is calm: a good time to do science.',
    sugDescanso: 'The crew is tired. Use little power today so they can rest.',
    sugEquilibrio: 'Share the power and let the crew rest when you can.',
    sugGuardar: 'Leave 1 ☀️ unused today so the crew does not get tired.',
    sinConsejos: 'With Quick eye you decide on your own. Watch the forecast and the crew’s faces.',
    leyenda: ['🛡️ 3 or 4 → 🌪️ no harm', '🛡️ −1 every night', '💨 −2 every night · ☀️ = +2', '🍽️ −1 every night · 3 ☀️ = +4', '🔬 2 ☀️ = 1 🧪'],

    vistaPrevia: '👣 If you end the day like this…',
    deshacer: '↩️ Undo all',
    vpAire: (p) => '💨 Air: ' + p.a + ' → ' + p.b,
    vpEscudo: (p) => '🛡️ Shield: ' + p.a + ' → ' + p.b,
    vpComida: (p) => '🍽️ Food: ' + p.a + ' → ' + p.b,
    vpMente: (p) => '🧠 Mental energy: ' + CARAS[p.a] + ' → ' + CARAS[p.b],
    vpEvento: (p) => p.ok ? '☀️ Tonight’s event: protected!' : '☀️ Tonight’s event: it may reach them.',

    energiaHoy: '☀️ Today’s power',
    quedan: (p) => p.n === 1 ? '1 ☀️ left' : p.n + ' ☀️ left',
    usadaTodo: 'You used all of today’s power.',
    reglaDescanso: 'Use 0-2 ☀️: the crew rests · 3: same · 4: they get tired',
    motivo_costoPlanificador: 'Planner: −1 ☀️ today',
    motivo_costoAntena: 'Forecast antenna: −1 ☀️ today',
    motivo_agotados: 'Crew exhausted: only 2 ☀️ today',
    terminarDia: '🌙 End the day',

    noche: (p) => '🌙 Night of day ' + p.d,
    nocheDescanso: '😴 The crew rested: mental energy +1.',
    nocheNormal: '🙂 It was a normal work day.',
    nocheDuro: '😓 They worked really hard: mental energy −1.',
    nocheCosecha: '🥬 Harvest! +4 days of food.',
    nocheMuestra: (p) => '🔬 ' + (p.n === 1 ? 'New science sample!' : p.n + ' new science samples!'),
    nocheComen: '🍽️ They had dinner: food −1.',
    nocheHambre: '😟 There was no food: mental energy −2.',
    nocheRespiran: '💨 They breathed all night: air −2.',
    nocheDesgaste: '🛡️ Dust and sunlight wore the shield down: −1.',
    nuevaCarta: '🎴 New card for your album!',
    cartaRepetida: '🎴 You already had this card in your album.',
    bloqueada: (p) => '✅ Shield ' + p.e + '! The storm did no harm.',
    alcanzo: (p) => '⚠️ The shield was at ' + p.e + ' and ' + p.r + ' was needed. Air −3 and mental energy −1.',
    destelloRes: '✅ A flare does no harm inside the base. It cut the radio until tomorrow.',
    siguienteDia: (p) => '☀️ Start day ' + p.d,
    verFinal: '🏁 See how the mission ended',

    cartaFLR: 'Solar flare',
    cartaSEP: 'Particle storm',
    cartaClase: (p) => 'Class ' + p.c,
    cartaRegion: (p) => 'Region ' + p.r,
    cartaReal: 'Real event · NASA DONKI',
    cartaReciente: '🆕 Recent',
    cartaVerificar: '🔎 See this event on NASA’s website',
    explicaFLR: 'A huge flash of light and X-rays. It arrives in about 8 minutes and can cut the radio, but it does no harm inside the base. The X marks the strongest ones.',
    explicaSEP: 'Tiny, very fast particles thrown out by the Sun. They can harm the body, so the base needs a shield. The Moon has no air or magnetic field to protect you.',
    albumTitulo: '🎴 Your album of real Sun events',
    albumTexto: 'Every event you live through in a mission is saved here. They all really happened and NASA recorded them.',
    albumBloqueada: '?',
    cerrar: 'Close',

    comoTitulo: '❔ How to play',
    paso1: 'Tap a module to give it ☀️ power. Tap «−» to take it back.',
    paso2: 'Watch the forecast: before a storm, build up the shield.',
    paso3: 'End the day. Using 0-2 ☀️ lets the crew rest; using 4 tires them.',
    paso4: 'Earn stars: last, do science and block storms. Collect real cards!',
    entendido: 'Got it!',

    finVictoria: '🌕 Mission accomplished!',
    finAire: '🌗 The air ran out',
    finMente: '🌗 The crew needed to go home and rest',
    finSubVictoria: (p) => 'Your crew lasted all ' + p.d + ' days on the Moon.',
    finSubAire: (p) => 'The crew got back to Earth safely on day ' + p.d + '.',
    finSubMente: (p) => 'They were exhausted 3 days in a row and went back to Earth on day ' + p.d + '.',
    despedidaBien: '👩‍🚀 Ana: “Thank you for taking care of us! It was great working with you.”',
    despedidaOtra: '👩‍🚀 Ana: “We got back safely. Real missions get repeated too. Shall we try again?”',
    estrellas: 'Your stars',
    resumenMision: (p) => '🔬 ' + p.m + (p.m === 1 ? ' sample' : ' samples') + ' · 🥬 ' + p.c + (p.c === 1 ? ' harvest' : ' harvests') +
                          ' · 🛡️ ' + p.b + ' of ' + p.t + ' storms blocked · 🎴 ' + p.n + (p.n === 1 ? ' new card' : ' new cards'),
    pistaAire: 'Tip: give power to the air before it drops below 4.',
    pistaMente: 'Tip: use 2 ☀️ on some days so the crew can rest.',
    pistaTormentas: 'Tip: watch the forecast and build the shield the day before an event.',
    pistaCiencia: 'Tip: the lab needs 2 ☀️ per sample. Use the calm days.',
    pistaTodo: 'You did it all! Try another superpower or complete your album.',
    queProbaras: 'What will you try next time?',
    plan1: 'Build the shield before each event', plan2: 'Let the crew rest',
    plan3: 'Do more science', plan4: 'Try another superpower',
    placeholderPlan: 'Or write it in your own words…',
    otraVez: '🚀 Play again',
    verAlbum: '🎴 See my album',
    meses: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    frases: {
      escudo: ['Teo: “More regolith on top!”', 'Teo: “The shield is stronger.”'],
      aire: ['Ana: “Now we can breathe easy.”', 'Ana: “Air tank refilled.”'],
      invernadero: ['Kiara: “The lettuce is growing!”', 'Kiara: “Plants make me happy.”'],
      lab: ['Kiara: “I found shiny minerals!”', 'Kiara: “New data for Earth.”']
    },
    narracion: [
      'The Sun is very active these years: it is near the peak of its roughly 11-year cycle.',
      'Particle storms are invisible: only instruments can detect them.',
      'A radio signal takes a little over 1 second from the Moon to Earth; from Mars, sometimes more than 20 minutes.',
      'A thick layer of regolith (Moon dirt) can block a lot of radiation.',
      'On the Space Station, NASA grew chile peppers for 137 days and harvested 26 fruits.',
      'Lettuce grown in the Veggie chamber on the Space Station was safe to eat.',
      'A tired mind makes more mistakes. That happens to everyone, astronauts too.',
      'Flares are classed A, B, C, M and X. Each letter is 10 times stronger than the one before.',
      'In May 2024, solar storms caused auroras seen in many countries.',
      'The strongest flare in the game is the X9.0 from October 3, 2024.',
      'The Sun is about 150 million kilometers away: its light takes about 8 minutes to get here.',
      'DONKI is the NASA database that records everything the Sun does.'
    ]
  }
};

let idioma = 'es';
function tr(clave, p) {
  const v = TEXTOS[idioma][clave] !== undefined ? TEXTOS[idioma][clave] : TEXTOS.es[clave];
  if (typeof v === 'function') return v(p || {});
  return v !== undefined ? v : clave;
}
const nombrePoder = (id) => tr('poder_' + id + '_nombre');

/* ------------------------------------------------------------------
   5. ESTADO, ÁLBUM Y PREFERENCIAS
   ------------------------------------------------------------------ */
let estado = null;
let eventosHistoricos = EVENTOS_RESPALDO;
let eventosRecientes = [];
let fuenteDatos = 'interna';
let climaSemana = { estado: 'cargando' };
let poderElegido = null;
let planAnterior = '';
let sonidoActivo = false;
let album = new Set();   // ids de DONKI de las cartas conseguidas

// Guardado ligero en el navegador (si no se puede, el juego sigue igual).
function leerPreferencia(clave, defecto) {
  try { const v = localStorage.getItem('outpost-' + clave); return v === null ? defecto : JSON.parse(v); } catch (e) { return defecto; }
}
function guardarPreferencia(clave, valor) {
  try { localStorage.setItem('outpost-' + clave, JSON.stringify(valor)); } catch (e) { /* sin almacenamiento */ }
}

const todosLosEventos = () => eventosHistoricos.concat(eventosRecientes);

/* ------------------------------------------------------------------
   6. DATOS: JSON local + clima solar en vivo de DONKI
   ------------------------------------------------------------------ */
function eventoValido(e) {
  return e && /^\d{4}-\d{2}-\d{2}$/.test(e.fecha || '') && (e.tipo === 'SEP' || e.tipo === 'FLR') && typeof e.descripcion === 'string';
}

async function cargarEventos() {
  try {
    const r = await fetch('data/donki-eventos.json', { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const datos = await r.json();
    const lista = (datos.eventos || []).filter(eventoValido);
    if (!lista.some(e => e.tipo === 'SEP') || !lista.some(e => e.tipo === 'FLR')) throw new Error('faltan eventos');
    eventosHistoricos = lista;
    fuenteDatos = 'json';
  } catch (e) {
    eventosHistoricos = EVENTOS_RESPALDO;
    fuenteDatos = 'interna';
  }
}

const fechaISO = (d) => d.toISOString().slice(0, 10);

async function pedirDONKI(tipo, desde, hasta, msMax = 8000) {
  const control = new AbortController();
  const t = setTimeout(() => control.abort(), msMax);
  try {
    const r = await fetch(DONKI_API + tipo + '?startDate=' + desde + '&endDate=' + hasta, { signal: control.signal });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const texto = await r.text();
    return texto.trim() ? JSON.parse(texto) : [];
  } finally { clearTimeout(t); }
}

function fuerzaClase(c) {
  if (!c) return 0;
  const n = parseFloat(c.slice(1)) || 1;
  return c[0] === 'X' ? n * 10 : c[0] === 'M' ? n : n / 10;
}

// Sol de la última semana (resumen) y eventos fuertes del último mes (entran a la misión).
// La fecha de "hoy" es la del equipo donde se abre el juego.
async function cargarClimaReciente() {
  const hoy = new Date();
  const hace7 = new Date(hoy.getTime() - 7 * 86400000);
  const hace30 = new Date(hoy.getTime() - 30 * 86400000);
  try {
    const [flr, sep, cme] = await Promise.all([
      pedirDONKI('FLR', fechaISO(hace30), fechaISO(hoy)),
      pedirDONKI('SEP', fechaISO(hace30), fechaISO(hoy)),
      pedirDONKI('CME', fechaISO(hace7), fechaISO(hoy))
    ]);
    const enSemana = (t) => t && t.slice(0, 10) >= fechaISO(hace7);
    const flrSemana = flr.filter(f => enSemana(f.peakTime || f.beginTime));
    const sepSemana = sep.filter(s => enSemana(s.eventTime));
    const x = flrSemana.filter(f => (f.classType || '')[0] === 'X').length;
    const m = flrSemana.filter(f => (f.classType || '')[0] === 'M').length;
    let nivel = 'climaTranquilo';
    if (x > 0 || sepSemana.length > 0) nivel = 'climaMuyActivo';
    else if (m >= 3) nivel = 'climaActivo';

    const nuevos = [];
    for (const f of flr) {
      if (fuerzaClase(f.classType) < 5) continue;
      nuevos.push({
        fecha: (f.peakTime || f.beginTime).slice(0, 10), tipo: 'FLR', clase: f.classType,
        region_activa: String(f.activeRegionNum || ''), intensidad: fuerzaClase(f.classType) >= 50 ? 'alta' : 'media',
        descripcion: 'Fulguración clase ' + f.classType + ' registrada en DONKI hace pocos días.',
        descripcion_en: 'Class ' + f.classType + ' flare recorded in DONKI a few days ago.',
        id_donki: f.flrID, pagina_donki: f.link, reciente: true
      });
    }
    const dias = new Set();
    for (const s of sep) {
      const fecha = s.eventTime.slice(0, 10);
      if (dias.has(fecha)) continue;   // DONKI guarda un registro por instrumento
      dias.add(fecha);
      nuevos.push({
        fecha, tipo: 'SEP', clase: null, region_activa: null, intensidad: 'media',
        descripcion: 'Tormenta de partículas registrada en DONKI hace pocos días.',
        descripcion_en: 'Particle storm recorded in DONKI a few days ago.',
        id_donki: s.sepID, pagina_donki: s.link, reciente: true
      });
    }
    eventosRecientes = nuevos;
    climaSemana = { estado: 'ok', nivel, desde: fechaISO(hace7), hasta: fechaISO(hoy), flr: flrSemana.length, x, m, cme: cme.length, sep: sepSemana.length, recientes: nuevos.length };
  } catch (e) {
    eventosRecientes = [];
    climaSemana = { estado: 'error' };
  }
}

/* ------------------------------------------------------------------
   7. REGLAS DEL JUEGO
   ------------------------------------------------------------------ */
const limitar = (v, a, b) => Math.max(a, Math.min(b, v));

function mezclar(lista, azar) {
  const c = [...lista];
  for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(azar() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; }
  return c;
}

// Eventos de una misión: al menos una tormenta y un destello, en orden de fecha.
function seleccionarEventos(lista, cantidad, azar) {
  const m = mezclar(lista, azar), el = [];
  const s = m.find(e => e.tipo === 'SEP'), f = m.find(e => e.tipo === 'FLR');
  if (s) el.push(s);
  if (f && cantidad > 1) el.push(f);
  for (const e of m) { if (el.length >= cantidad) break; if (!el.includes(e)) el.push(e); }
  return el.sort((a, b) => a.fecha.localeCompare(b.fecha));
}

function crearEstado(poder, azar = Math.random) {
  const p = PODERES[poder];
  const C = CONFIG;
  return {
    poder, dia: 1, dias: p.dias,
    escudo: C.escudo.inicio, aire: C.aire.inicio, comida: C.comida.inicio,
    crecimiento: 0, cienciaProg: 0, cosechas: 0,
    mente: C.mente.inicio, menteCero: 0,
    asignacion: { escudo: 0, aire: 0, invernadero: 0, lab: 0 },
    eventos: seleccionarEventos(todosLosEventos(), Math.floor(p.dias / C.diasEntreEventos), azar),
    indiceEvento: 0, vividos: [], cartasNuevas: 0,
    radioCortada: false, todasBloqueadas: true,
    terminado: false, resultado: null
  };
}

const muestras = (s = estado) => Math.floor(s.cienciaProg / CONFIG.ciencia.orbesPorMuestra);
const requisito = (ev) => ev.intensidad === 'alta' ? CONFIG.escudo.reqAlta : CONFIG.escudo.reqMedia;

function proximoEvento(s = estado) {
  if (s.indiceEvento >= s.eventos.length) return null;
  const dia = (s.indiceEvento + 1) * CONFIG.diasEntreEventos;
  if (dia > s.dias) return null;
  return { evento: s.eventos[s.indiceEvento], dia };
}

// ¿Puede el jugador saber qué evento viene? (superpoder Pronóstico y radio encendida)
const conoceEvento = (s = estado) => PODERES[s.poder].pronostico && !s.radioCortada;

// Energía disponible hoy y por qué es menos (costos y cansancio).
function orbesDelDia(s = estado) {
  const p = PODERES[s.poder];
  let n = CONFIG.orbesPorDia;
  const motivos = [];
  if (p.costoPar && s.dia % 2 === 0) { n -= 1; motivos.push('costoPlanificador'); }
  const prox = proximoEvento(s);
  if (p.costoAntena && prox && prox.dia - s.dia === 1) { n -= 1; motivos.push('costoAntena'); }
  if (s.mente === 0) { n = Math.min(n, CONFIG.mente.orbesSiAgotada); motivos.push('agotados'); }
  return { n, motivos };
}

const usados = (s = estado) => MODULOS.reduce((t, m) => t + s.asignacion[m], 0);

function asignar(mod, delta) {
  if (!estado || estado.terminado) return false;
  const a = estado.asignacion;
  if (delta > 0 && usados() >= orbesDelDia().n) return false;
  if (delta < 0 && a[mod] <= 0) return false;
  a[mod] += delta;
  return true;
}

// Resuelve la noche sobre una copia del estado. No usa azar: siempre
// da el mismo resultado (por eso el Planificador puede mostrarlo antes).
function simularNoche(base) {
  const s = JSON.parse(JSON.stringify(base));
  const C = CONFIG, a = s.asignacion, pasos = [];
  const u = MODULOS.reduce((t, m) => t + a[m], 0);

  s.escudo = limitar(s.escudo + a.escudo, 0, C.escudo.max);
  s.aire = limitar(s.aire + a.aire * C.aire.porOrbe, 0, C.aire.max);
  s.crecimiento += a.invernadero;
  while (s.crecimiento >= C.comida.orbesPorCosecha) {
    s.crecimiento -= C.comida.orbesPorCosecha;
    s.comida = limitar(s.comida + C.comida.cosecha, 0, C.comida.max);
    s.cosechas++;
    pasos.push({ k: 'nocheCosecha', tipo: 'bien' });
  }
  const antes = muestras(s);
  s.cienciaProg += a.lab;
  if (muestras(s) > antes) pasos.push({ k: 'nocheMuestra', p: { n: muestras(s) - antes }, tipo: 'bien' });

  // Trabajo y descanso: la carga mental depende de cuánta energía se usó
  const dMente = C.mente.cambio[Math.min(u, C.mente.cambio.length - 1)];
  s.mente = limitar(s.mente + dMente, 0, C.mente.max);
  pasos.push({ k: dMente > 0 ? 'nocheDescanso' : dMente < 0 ? 'nocheDuro' : 'nocheNormal', tipo: dMente < 0 ? 'aviso' : 'info' });

  // Evento real del Sol (cada 3 días)
  const prox = proximoEvento(s);
  s.radioCortada = false;
  if (prox && prox.dia === s.dia) {
    s.indiceEvento++;
    const reg = { ev: prox.evento, dia: s.dia, escudo: s.escudo, bloqueada: true, req: 0 };
    if (prox.evento.tipo === 'SEP') {
      reg.req = requisito(prox.evento);
      if (s.escudo < reg.req) {
        reg.bloqueada = false;
        s.todasBloqueadas = false;
        s.aire = limitar(s.aire - C.danoTormenta.aire, 0, C.aire.max);
        s.mente = limitar(s.mente - C.danoTormenta.mente, 0, C.mente.max);
      }
    } else {
      s.radioCortada = true;   // un destello corta la radio hasta mañana
    }
    s.vividos.push(reg);
    s.eventoNoche = reg;
  } else {
    s.eventoNoche = null;
  }

  // Necesidades de cada noche
  if (s.comida >= C.comida.consumo) { s.comida -= C.comida.consumo; pasos.push({ k: 'nocheComen', tipo: 'info' }); }
  else { s.mente = limitar(s.mente - C.hambreMente, 0, C.mente.max); pasos.push({ k: 'nocheHambre', tipo: 'aviso' }); }
  s.aire = limitar(s.aire - C.aire.consumo, 0, C.aire.max);
  pasos.push({ k: 'nocheRespiran', tipo: 'info' });
  if (s.dia % C.escudo.desgasteCadaDias === 0 && s.escudo > 0) {
    s.escudo = limitar(s.escudo - 1, 0, C.escudo.max);
    pasos.push({ k: 'nocheDesgaste', tipo: 'info' });
  }

  // ¿Terminó la misión?
  s.menteCero = s.mente === 0 ? s.menteCero + 1 : 0;
  s.diaNoche = s.dia;
  if (s.aire <= 0) { s.terminado = true; s.resultado = 'aire'; }
  else if (s.menteCero >= C.mente.diasEnCeroParaFin) { s.terminado = true; s.resultado = 'mente'; }
  else { s.dia++; if (s.dia > s.dias) { s.terminado = true; s.resultado = 'victoria'; } }
  s.asignacion = { escudo: 0, aire: 0, invernadero: 0, lab: 0 };
  return { s, pasos };
}

function terminarDia() {
  const r = simularNoche(estado);
  estado = r.s;
  return r.pasos;
}

function estrellas(s = estado) {
  return {
    sobrevivir: s.resultado === 'victoria',
    ciencia: muestras(s) >= CONFIG.ciencia.meta,
    tormentas: s.todasBloqueadas && s.vividos.some(v => v.ev.tipo === 'SEP')
  };
}

/* ------------------------------------------------------------------
   8. CONSEJO DE ANA
   Propone un reparto completo de la energía de hoy, usando solo lo que
   el jugador ve. Seguirlo siempre logra las 3 estrellas en las pruebas.
   ------------------------------------------------------------------ */
function sugerencia(s = estado) {
  const C = CONFIG;
  const n = orbesDelDia(s).n;
  const plan = { escudo: 0, aire: 0, invernadero: 0, lab: 0 };
  // Usar lo máximo que no canse al equipo (más si está muy descansado, menos si está cansado)
  let meta = C.mente.cambio.reduce((ult, v, i) => v >= 0 ? i : ult, 0);
  if (s.mente <= 1) meta = C.mente.cambio.reduce((ult, v, i) => v > 0 ? i : ult, 0);
  else if (s.mente >= C.mente.max) meta = C.mente.cambio.length - 1;
  let libres = Math.min(n, meta);
  let motivo = null;
  const poner = (m, k) => { const x = Math.max(0, Math.min(k, libres)); plan[m] += x; libres -= x; return x; };

  // 1. Prepararse para el próximo evento del Sol
  const prox = proximoEvento(s);
  if (prox) {
    const faltan = prox.dia - s.dia;
    const conocido = conoceEvento(s);
    const esFLR = conocido && prox.evento.tipo === 'FLR';
    const req = conocido ? (prox.evento.tipo === 'SEP' ? requisito(prox.evento) : 0) : C.escudo.reqAlta;
    let desgastes = 0;
    for (let d = s.dia; d < prox.dia; d++) if (d % C.escudo.desgasteCadaDias === 0) desgastes++;
    const falta = Math.max(0, req - (s.escudo - desgastes));
    if (!esFLR && falta > 0 && faltan <= 2) {
      if (poner('escudo', Math.ceil(falta / (faltan + 1)))) motivo = { k: 'sugEscudo', p: { d: faltan } };
    }
  }
  // 2. Aire para mañana
  const aireFalta = Math.ceil(Math.max(0, 4 + C.aire.consumo - s.aire) / C.aire.porOrbe);
  if (aireFalta && poner('aire', aireFalta) && !motivo) motivo = { k: 'sugAire', p: { a: s.aire } };
  // 3. Comida antes de que se acabe
  if (s.comida <= 3 && poner('invernadero', C.comida.orbesPorCosecha - s.crecimiento) && !motivo) {
    motivo = { k: 'sugComida', p: { c: s.comida } };
  }
  // 4. Ciencia con lo que quede
  if (muestras(s) < C.ciencia.meta && poner('lab', libres) && !motivo) motivo = { k: 'sugCiencia' };
  // 5. Si aún sobra, adelantar comida o aire
  if (libres > 0) poner('invernadero', Math.min(libres, C.comida.orbesPorCosecha - s.crecimiento));
  if (libres > 0 && s.aire < 8) poner('aire', libres);
  if (!motivo) motivo = { k: meta < n ? (s.mente <= 1 ? 'sugDescanso' : 'sugGuardar') : 'sugEquilibrio' };
  if (s.mente <= 1 && motivo.k !== 'sugEscudo' && motivo.k !== 'sugAire') motivo = { k: 'sugDescanso' };
  return { plan, motivo };
}

/* ------------------------------------------------------------------
   9. INTERFAZ
   ------------------------------------------------------------------ */
const $ = (id) => document.getElementById(id);
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const reducirMovimiento = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function formatearFecha(fecha) {
  const [a, m, d] = fecha.split('-').map(Number);
  const meses = tr('meses');
  return idioma === 'en' ? meses[m - 1] + ' ' + d + ', ' + a : d + ' de ' + meses[m - 1] + ' de ' + a;
}

function mostrarPantalla(nombre) {
  ['inicio', 'juego', 'fin'].forEach(p => { $('pantalla-' + p).hidden = p !== nombre; });
  $('barra-mision').hidden = nombre !== 'juego';
}
const pantallaActual = () => ['inicio', 'juego', 'fin'].find(p => !$('pantalla-' + p).hidden);

// Pequeño "latido" visual al cambiar algo (se omite si se pide reducir movimiento).
function latido(el) {
  if (!el || reducirMovimiento()) return;
  el.classList.remove('latido');
  void el.offsetWidth;
  el.classList.add('latido');
}

/* ---------- Barra superior ---------- */
function actualizarBarra() {
  $('boton-album').textContent = tr('album', { n: album.size, t: totalCartas() });
  if (!estado) return;
  $('texto-dia').textContent = tr('dia', { d: Math.min(estado.dia, estado.dias), t: estado.dias });
  const puntos = [];
  for (let d = 1; d <= estado.dias; d++) {
    const evento = d % CONFIG.diasEntreEventos === 0 && d / CONFIG.diasEntreEventos <= estado.eventos.length;
    const clase = d < estado.dia ? 'pasado' : d === estado.dia ? 'actual' : 'futuro';
    puntos.push('<span class="punto-dia ' + clase + (evento ? ' con-evento' : '') + '" aria-hidden="true">' + (evento ? '☀️' : '') + '</span>');
  }
  $('linea-dias').innerHTML = puntos.join('');
  const st = estrellasEnCurso();
  $('metas').innerHTML =
    meta('⭐', tr('metaCortaSobrevivir'), st.sobrevivir, tr('metaSobrevivir')) +
    meta('⭐', tr('metaCortaCiencia', { n: Math.min(muestras(), CONFIG.ciencia.meta), m: CONFIG.ciencia.meta }), st.ciencia, tr('metaCiencia', { m: CONFIG.ciencia.meta })) +
    meta('⭐', tr('metaCortaTormentas'), st.tormentas, tr('metaTormentas'));
}
// Una meta con su estrella: ⭐ lograda, ☆ ya no se puede, ✩ en curso
function meta(icono, texto, ok, completo) {
  return '<li class="meta ' + (ok === true ? 'meta-ok' : ok === false ? 'meta-perdida' : '') + '"' +
         (completo ? ' title="' + esc(completo) + '"' : '') + '><span aria-hidden="true">' +
         (ok === true ? '⭐' : ok === false ? '☆' : '✩') + '</span> ' + esc(texto) +
         (completo ? '<span class="solo-lectores"> — ' + esc(completo) + '</span>' : '') + '</li>';
}
// Estado de las metas durante la partida: true lograda, false ya imposible, null en curso
function estrellasEnCurso() {
  return {
    sobrevivir: null,
    ciencia: muestras() >= CONFIG.ciencia.meta ? true : null,
    tormentas: estado.todasBloqueadas ? null : false
  };
}

/* ---------- Módulos de la base ---------- */
function construirModulos() {
  $('modulos').innerHTML = MODULOS.map(m =>
    '<div class="modulo modulo-' + m + '" id="modulo-' + m + '">' +
      '<button type="button" class="modulo-boton" id="boton-' + m + '">' +
        '<span class="modulo-cabecera"><span class="modulo-icono" aria-hidden="true">' + ICONO_MODULO[m] + '</span>' +
        '<span class="modulo-nombre" id="nombre-' + m + '"></span>' +
        '<span class="modulo-orbes" id="orbes-' + m + '"></span></span>' +
        '<span class="modulo-visual" id="visual-' + m + '"></span>' +
        '<span class="modulo-dato" id="dato-' + m + '"></span>' +
      '</button>' +
      '<span class="sugerido" id="sug-' + m + '" hidden></span>' +
      '<span class="tooltip"><button type="button" class="tooltip-boton" aria-describedby="tip-' + m + '">?</button>' +
        '<span class="tooltip-texto" role="tooltip" id="tip-' + m + '"></span></span>' +
      '<button type="button" class="modulo-quitar" id="quitar-' + m + '" aria-label="">−</button>' +
    '</div>'
  ).join('');
  MODULOS.forEach(m => {
    $('boton-' + m).addEventListener('click', () => tocarModulo(m, 1));
    $('quitar-' + m).addEventListener('click', () => tocarModulo(m, -1));
  });
}

function tocarModulo(m, delta) {
  if (!asignar(m, delta)) { latido($('bandeja')); return; }
  sonar(delta > 0 ? 'poner' : 'quitar');
  if (delta > 0) {
    const f = TEXTOS[idioma].frases[m];
    $('mensaje-equipo').textContent = f[(estado.dia + estado.asignacion[m]) % f.length];
  }
  actualizarJuego();
  latido($('modulo-' + m));
}

function pips(n, max, clase) {
  let h = '';
  for (let i = 0; i < max; i++) h += '<span class="pip ' + (i < n ? clase : '') + '"></span>';
  return h;
}

function actualizarModulos() {
  const s = estado, a = s.asignacion;
  const prox = proximoEvento();
  const sug = PODERES[s.poder].consejos ? sugerencia() : null;
  // Vista "en vivo": cómo quedan los valores con la energía puesta hoy (antes de la noche)
  const escudoHoy = limitar(s.escudo + a.escudo, 0, CONFIG.escudo.max);
  const aireHoy = limitar(s.aire + a.aire * CONFIG.aire.porOrbe, 0, CONFIG.aire.max);
  const crecHoy = s.crecimiento + a.invernadero;
  const progHoy = s.cienciaProg + a.lab;

  for (const m of MODULOS) {
    $('nombre-' + m).textContent = tr('mod_' + m);
    $('tip-' + m).textContent = tr('tip_' + m);
    $('quitar-' + m).setAttribute('aria-label', tr('quitar') + ': ' + tr('mod_' + m));
    $('quitar-' + m).disabled = a[m] === 0;
    $('orbes-' + m).innerHTML = '☀️'.repeat(a[m]) ? '<span class="orbe-puesto">' + '☀️'.repeat(a[m]) + '</span>' : '';
    const sugEl = $('sug-' + m);
    if (sug && sug.plan[m] > 0) { sugEl.hidden = false; sugEl.textContent = tr('sugeridos', { n: sug.plan[m] }); }
    else sugEl.hidden = true;
    $('modulo-' + m).classList.toggle('con-energia', a[m] > 0);
  }

  // Escudo
  let necesita = '';
  if (prox && conoceEvento() && prox.evento.tipo === 'SEP') necesita = tr('necesitas', { n: requisito(prox.evento) });
  $('visual-escudo').innerHTML = '<span class="pips">' + pips(escudoHoy, CONFIG.escudo.max, 'pip-escudo') + '</span>';
  $('dato-escudo').textContent = tr('nivel', { n: escudoHoy }) + (necesita ? ' · ' + necesita : '');
  $('modulo-escudo').classList.toggle('alerta', Boolean(prox && prox.dia - s.dia <= 1 && escudoHoy < (conoceEvento() ? (prox.evento.tipo === 'SEP' ? requisito(prox.evento) : 0) : CONFIG.escudo.reqMedia)));
  // Aire
  $('visual-aire').innerHTML = '<span class="tanque"><span class="tanque-relleno nivel-' + (aireHoy >= 6 ? 'bien' : aireHoy >= 4 ? 'atencion' : 'peligro') + '" style="width:' + (aireHoy * 10) + '%"></span></span>';
  $('dato-aire').textContent = tr('aireValor', { n: aireHoy });
  $('modulo-aire').classList.toggle('alerta', aireHoy <= 3);
  // Invernadero
  $('visual-invernadero').innerHTML = '<span class="planta" aria-hidden="true">' + PLANTA[Math.min(crecHoy, 3)] + '</span>';
  $('dato-invernadero').textContent = tr('comidaValor', { n: s.comida }) + ' · ' + tr('crecimiento', { n: Math.min(crecHoy, 3) });
  $('modulo-invernadero').classList.toggle('alerta', s.comida <= 2);
  // Laboratorio
  const mu = Math.floor(progHoy / CONFIG.ciencia.orbesPorMuestra);
  let frascos = '';
  for (let i = 0; i < CONFIG.ciencia.meta; i++) frascos += '<span class="frasco ' + (i < mu ? 'lleno' : '') + '">🧪</span>';
  $('visual-lab').innerHTML = '<span class="frascos">' + frascos + '</span>';
  $('dato-lab').textContent = tr('muestras', { n: Math.min(mu, CONFIG.ciencia.meta), m: CONFIG.ciencia.meta }) +
    (mu < CONFIG.ciencia.meta ? ' · ' + tr('progreso', { n: progHoy % CONFIG.ciencia.orbesPorMuestra }) : '');

  for (const m of MODULOS) {
    $('boton-' + m).setAttribute('aria-label', tr('ariaModulo', { n: tr('mod_' + m), k: a[m] }) + ' ' + $('dato-' + m).textContent);
  }
}

/* ---------- Tripulación ---------- */
function actualizarEquipo() {
  const s = estado;
  const cara = CARAS[s.mente];
  const roles = tr('roles');
  $('equipo').innerHTML =
    ['ana', 'teo', 'kiara'].map(id => {
      const av = { ana: '👩‍🚀', teo: '👨‍🚀', kiara: '🧑‍🚀' }[id];
      const nombre = { ana: 'Ana', teo: 'Teo', kiara: 'Kiara' }[id];
      return '<li class="tripulante"><span class="avatar" aria-hidden="true">' + av + '<span class="cara">' + cara + '</span></span>' +
             '<span class="tripulante-nombre">' + nombre + '</span><span class="tripulante-rol">' + esc(roles[id]) + '</span></li>';
    }).join('');
  $('mente-pips').innerHTML = pips(s.mente, CONFIG.mente.max, 'pip-mente');
  $('mente-texto').textContent = cara + ' ' + tr('menteEstado')[s.mente];
  $('tip-mente').textContent = tr('tipMente');
  $('mente-nombre').textContent = tr('menteNombre');
}

/* ---------- Pronóstico del Sol ---------- */
function actualizarPronostico() {
  const s = estado;
  const prox = proximoEvento();
  const caja = $('pronostico-contenido');
  const filas = [];
  for (let k = 0; k < 3; k++) {
    const d = s.dia + k;
    if (d > s.dias) break;
    const etiqueta = k === 0 ? tr('hoy') : k === 1 ? tr('manana') : tr('enDias', { n: k });
    const hay = prox && prox.dia === d;
    filas.push('<li class="pron-dia' + (hay ? ' pron-evento' : '') + '"><span class="pron-etiqueta">' + esc(etiqueta) + '</span>' +
               '<span class="pron-icono" aria-hidden="true">' + (hay ? (conoceEvento() ? (prox.evento.tipo === 'SEP' ? '🌪️' : '✨') : '❓') : '🌞') + '</span></li>');
  }
  let detalle = '';
  if (s.radioCortada && PODERES[s.poder].pronostico) detalle = '<p class="pron-nota">' + esc(tr('radioCortada')) + '</p>';
  if (prox) {
    const faltan = prox.dia - s.dia;
    let tipo = tr('eventoDesconocido');
    if (conoceEvento()) tipo = prox.evento.tipo === 'SEP' ? tr('eventoConocidoSEP', { n: requisito(prox.evento) }) : tr('eventoConocidoFLR');
    detalle += '<p class="pron-alerta ' + (faltan <= 1 ? 'cerca' : '') + '"><strong>' + esc(faltan === 0 ? tr('eventoEsta') : tr('eventoEn', { n: faltan })) + '</strong><br>' + esc(tipo) + '</p>';
  } else {
    detalle += '<p class="pron-nota">' + esc(tr('sinEventos')) + '</p>';
  }
  caja.innerHTML = '<ol class="pron-lista">' + filas.join('') + '</ol>' + detalle;
}

/* ---------- Consejo de Ana / vista previa / narrador ---------- */
function actualizarConsejo() {
  const s = estado, p = PODERES[s.poder];
  const caja = $('consejo');
  let html = '';
  if (p.consejos) {
    const sug = sugerencia();
    html += '<h3>' + esc(tr('anaDice')) + '</h3><p>' + esc(tr(sug.motivo.k, sug.motivo.p)) + '</p>' +
            '<button type="button" class="boton boton-sugerencia" id="boton-sugerencia">' + esc(tr('usarSugerencia')) + '</button>';
  } else {
    html += '<p class="sin-consejos">' + esc(tr('sinConsejos')) + '</p>' +
            '<ul class="leyenda">' + tr('leyenda').map(l => '<li>' + esc(l) + '</li>').join('') + '</ul>';
  }
  if (p.vistaPrevia) {
    const r = simularNoche(s).s;
    const filas = [
      tr('vpAire', { a: s.aire, b: r.aire }), tr('vpEscudo', { a: s.escudo, b: r.escudo }),
      tr('vpComida', { a: s.comida, b: r.comida }), tr('vpMente', { a: s.mente, b: r.mente })
    ];
    if (r.eventoNoche && r.eventoNoche.ev.tipo === 'SEP') filas.push(tr('vpEvento', { ok: r.eventoNoche.bloqueada }));
    html += '<div class="vista-previa"><h3>' + esc(tr('vistaPrevia')) + '</h3><ul>' + filas.map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>' +
            '<button type="button" class="boton boton-secundario" id="boton-deshacer">' + esc(tr('deshacer')) + '</button></div>';
  }
  if (p.narrador) {
    const n = tr('narracion');
    html += '<p class="narrador">📖 ' + esc(n[(s.dia - 1) % n.length]) + '</p>';
  }
  caja.innerHTML = html;
  if (p.consejos) $('boton-sugerencia').addEventListener('click', usarSugerencia);
  if (p.vistaPrevia) $('boton-deshacer').addEventListener('click', () => { estado.asignacion = { escudo: 0, aire: 0, invernadero: 0, lab: 0 }; actualizarJuego(); });
}

function usarSugerencia() {
  const sug = sugerencia();
  estado.asignacion = { escudo: 0, aire: 0, invernadero: 0, lab: 0 };
  for (const m of MODULOS) for (let i = 0; i < sug.plan[m]; i++) asignar(m, 1);
  sonar('poner');
  actualizarJuego();
  MODULOS.forEach(m => { if (sug.plan[m]) latido($('modulo-' + m)); });
}

/* ---------- Bandeja de energía ---------- */
function actualizarBandeja() {
  const od = orbesDelDia();
  const u = usados();
  const orbes = [];
  for (let i = 0; i < CONFIG.orbesPorDia; i++) {
    const clase = i >= od.n ? 'orbe-no' : i < u ? 'orbe-usado' : 'orbe-libre';
    orbes.push('<span class="orbe ' + clase + '" aria-hidden="true">' + (i >= od.n ? '✕' : '☀️') + '</span>');
  }
  $('orbes').innerHTML = orbes.join('');
  const quedan = od.n - u;
  $('texto-quedan').textContent = quedan > 0 ? tr('quedan', { n: quedan }) : tr('usadaTodo');
  $('motivos').textContent = od.motivos.map(m => tr('motivo_' + m)).join(' · ');
  $('regla-descanso').textContent = tr('reglaDescanso');
  $('texto-energia').textContent = tr('energiaHoy');
  $('boton-terminar').textContent = tr('terminarDia');
}

function actualizarJuego() {
  if (!estado) return;
  actualizarBarra();
  actualizarModulos();
  actualizarEquipo();
  actualizarPronostico();
  actualizarConsejo();
  actualizarBandeja();
}

/* ---------- Noche: resumen del día y carta ---------- */
function htmlCarta(ev, extra) {
  const tipo = ev.tipo === 'SEP' ? tr('cartaSEP') : tr('cartaFLR');
  const desc = (idioma === 'en' && ev.descripcion_en) ? ev.descripcion_en : ev.descripcion;
  return '<article class="carta carta-' + ev.tipo + '">' +
    '<p class="carta-real">' + esc(tr('cartaReal')) + (ev.reciente ? ' · ' + esc(tr('cartaReciente')) : '') + '</p>' +
    '<p class="carta-icono" aria-hidden="true">' + (ev.tipo === 'SEP' ? '🌪️' : '✨') + '</p>' +
    '<h3>' + esc(tipo) + '</h3>' +
    '<p class="carta-fecha">' + esc(formatearFecha(ev.fecha)) + '</p>' +
    '<p class="carta-datos">' + (ev.clase ? esc(tr('cartaClase', { c: ev.clase })) + ' · ' : '') + (ev.region_activa ? esc(tr('cartaRegion', { r: ev.region_activa })) : '') + '</p>' +
    '<p class="carta-desc">' + esc(desc) + '</p>' +
    (extra || '') +
    // Enlace a la ficha oficial del evento en DONKI (página legible, con gráfico)
    ((ev.pagina_donki || ev.verificar) ? '<a class="carta-enlace" href="' + esc(ev.pagina_donki || ev.verificar) + '" target="_blank" rel="noopener">' + esc(tr('cartaVerificar')) + '</a>' : '') +
  '</article>';
}

function mostrarNoche(pasos) {
  const s = estado;
  const items = pasos.map(p => '<li class="noche-' + p.tipo + '">' + esc(tr(p.k, p.p)) + '</li>');
  let carta = '';
  if (s.eventoNoche) {
    const reg = s.eventoNoche;
    const id = reg.ev.id_donki;
    const nueva = id && !album.has(id);
    if (id) { album.add(id); guardarPreferencia('album', [...album]); }
    if (nueva) s.cartasNuevas = (s.cartasNuevas || 0) + 1;
    let res;
    if (reg.ev.tipo === 'SEP') res = reg.bloqueada ? tr('bloqueada', { e: reg.escudo }) : tr('alcanzo', { e: reg.escudo, r: reg.req });
    else res = tr('destelloRes');
    const explica = '<p class="carta-explica">' + esc(tr(reg.ev.tipo === 'SEP' ? 'explicaSEP' : 'explicaFLR')) + '</p>';
    carta = '<div class="noche-carta"><p class="noche-carta-titulo">' + esc(nueva ? tr('nuevaCarta') : tr('cartaRepetida')) + '</p>' +
            htmlCarta(reg.ev, '<p class="carta-resultado ' + (reg.bloqueada ? 'ok' : 'dano') + '">' + esc(res) + '</p>' + (PODERES[s.poder].narrador ? explica : '')) + '</div>';
    sonar(reg.bloqueada ? 'carta' : 'golpe');
  }
  $('noche-titulo').textContent = tr('noche', { d: s.diaNoche });
  $('noche-lista').innerHTML = items.join('');
  $('noche-carta').innerHTML = carta;
  $('boton-siguiente').textContent = s.terminado ? tr('verFinal') : tr('siguienteDia', { d: s.dia });
  abrirCapa('capa-noche', 'boton-siguiente');
}

function continuarTrasNoche() {
  cerrarCapa('capa-noche');
  if (estado.terminado) mostrarFinal();
  else {
    $('mensaje-equipo').textContent = '';
    actualizarJuego();
    $('boton-' + (PODERES[estado.poder].consejos ? 'sugerencia' : 'escudo')).focus();
  }
}

/* ---------- Capas (ventanas) ---------- */
let focoAnterior = null;
function abrirCapa(id, foco) {
  focoAnterior = document.activeElement;
  $(id).hidden = false;
  if (foco) $(foco).focus();
}
function cerrarCapa(id) {
  $(id).hidden = true;
  if (focoAnterior && focoAnterior.focus && !focoAnterior.closest('[hidden]')) focoAnterior.focus();
}

/* ---------- Álbum ---------- */
function totalCartas() { return todosLosEventos().length; }
function mostrarAlbum() {
  const lista = todosLosEventos().slice().sort((a, b) => a.fecha.localeCompare(b.fecha));
  $('album-titulo').textContent = tr('albumTitulo');
  $('album-texto').textContent = tr('albumTexto') + ' (' + album.size + '/' + lista.length + ')';
  $('album-cartas').innerHTML = lista.map(ev => album.has(ev.id_donki)
    ? htmlCarta(ev)
    : '<article class="carta carta-oculta" aria-label="?"><p class="carta-icono" aria-hidden="true">' + esc(tr('albumBloqueada')) + '</p><p class="carta-fecha">' + esc(String(ev.fecha).slice(0, 4)) + '</p></article>'
  ).join('');
  $('boton-cerrar-album').textContent = tr('cerrar');
  abrirCapa('capa-album', 'boton-cerrar-album');
}

/* ---------- Cómo jugar ---------- */
function mostrarComoJugar() {
  $('como-titulo').textContent = tr('comoTitulo');
  $('como-pasos').innerHTML = ['paso1', 'paso2', 'paso3', 'paso4'].map((k, i) =>
    '<li><span class="como-numero">' + (i + 1) + '</span><span class="como-icono" aria-hidden="true">' + ['👆', '🔭', '🌙', '⭐'][i] + '</span><span>' + esc(tr(k)) + '</span></li>').join('');
  $('boton-entendido').textContent = tr('entendido');
  abrirCapa('capa-como', 'boton-entendido');
}

/* ---------- Pantalla de inicio ---------- */
function construirPoderes() {
  $('lista-poderes').innerHTML = Object.keys(PODERES).map(id =>
    '<button type="button" class="poder" data-poder="' + id + '" aria-pressed="' + String(poderElegido === id) + '">' +
      '<span class="poder-icono" aria-hidden="true">' + PODERES[id].icono + '</span>' +
      '<span class="poder-nombre">' + esc(nombrePoder(id)) + '</span>' +
      '<span class="poder-linea"><strong>' + esc(tr('ayuda')) + '</strong> ' + esc(tr('poder_' + id + '_ayuda')) + '</span>' +
      '<span class="poder-linea poder-costo"><strong>' + esc(tr('costo')) + '</strong> ' + esc(tr('poder_' + id + '_costo')) + '</span>' +
    '</button>').join('');
  document.querySelectorAll('.poder').forEach(b => b.addEventListener('click', () => {
    poderElegido = b.dataset.poder;
    document.querySelectorAll('.poder').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    actualizarBotonEmpezar();
    sonar('poner');
  }));
}
function actualizarBotonEmpezar() {
  $('boton-empezar').disabled = !poderElegido;
  $('boton-empezar').textContent = poderElegido ? tr('empezar', { n: nombrePoder(poderElegido) }) : tr('empezarInactivo');
}
function mostrarClima() {
  const c = climaSemana, caja = $('clima');
  if (c.estado === 'cargando') { caja.innerHTML = '<p>' + esc(tr('climaCargando')) + '</p>'; return; }
  if (c.estado === 'error') { caja.innerHTML = '<p>' + esc(tr('climaError')) + '</p>'; return; }
  caja.innerHTML = '<p class="clima-titulo"><strong>' + esc(tr('climaTitulo')) + ':</strong> ' + esc(tr(c.nivel)) + '</p>' +
    '<ul class="clima-lista"><li>✨ ' + esc(tr('climaDestellos', { n: c.flr })) + '</li><li>☁️ ' + esc(tr('climaCME', { n: c.cme })) +
    '</li><li>🌪️ ' + esc(tr('climaSEP', { n: c.sep })) + '</li></ul>' +
    '<p class="clima-fuente">' + esc(tr('climaFuente', { d: formatearFecha(c.desde), h: formatearFecha(c.hasta), r: c.recientes })) + '</p>';
}
function mostrarInicio() {
  construirPoderes();
  actualizarBotonEmpezar();
  $('plan-anterior').hidden = !planAnterior;
  if (planAnterior) $('plan-anterior').textContent = tr('planAnterior', { t: planAnterior });
  mostrarClima();
  actualizarBarra();
  mostrarPantalla('inicio');
}

function empezarMision() {
  if (!poderElegido) return;
  estado = crearEstado(poderElegido);
  document.body.dataset.poder = poderElegido;
  mostrarPantalla('juego');
  $('mensaje-equipo').textContent = '';
  actualizarJuego();
  if (!leerPreferencia('vioTutorial', false)) { guardarPreferencia('vioTutorial', true); mostrarComoJugar(); }
  else $('boton-escudo').focus();
}

function terminarDiaClick() {
  if (!estado || estado.terminado) return;
  const pasos = terminarDia();
  sonar('noche');
  mostrarNoche(pasos);
}

/* ---------- Final ---------- */
function mostrarFinal() {
  const s = estado, st = estrellas();
  const total = [st.sobrevivir, st.ciencia, st.tormentas].filter(Boolean).length;
  $('fin-titulo').textContent = s.resultado === 'victoria' ? tr('finVictoria') : s.resultado === 'aire' ? tr('finAire') : tr('finMente');
  $('fin-sub').textContent = s.resultado === 'victoria' ? tr('finSubVictoria', { d: s.dias }) :
                             s.resultado === 'aire' ? tr('finSubAire', { d: s.diaNoche }) : tr('finSubMente', { d: s.diaNoche });
  $('fin-despedida').textContent = s.resultado === 'victoria' ? tr('despedidaBien') : tr('despedidaOtra');
  $('fin-estrellas-titulo').textContent = tr('estrellas');
  $('fin-estrellas').innerHTML =
    meta('⭐', tr('metaSobrevivir'), st.sobrevivir) +
    meta('⭐', tr('metaCiencia', { m: CONFIG.ciencia.meta }), st.ciencia) +
    meta('⭐', tr('metaTormentas'), st.tormentas);
  $('fin-grandes').textContent = '⭐'.repeat(total) + '☆'.repeat(3 - total);
  const seps = s.vividos.filter(v => v.ev.tipo === 'SEP');
  $('fin-resumen').textContent = tr('resumenMision', { m: muestras(), c: s.cosechas, b: seps.filter(v => v.bloqueada).length, t: seps.length, n: s.cartasNuevas || 0 });
  let pista = 'pistaTodo';
  if (s.resultado === 'aire') pista = 'pistaAire';
  else if (s.resultado === 'mente') pista = 'pistaMente';
  else if (!st.tormentas) pista = 'pistaTormentas';
  else if (!st.ciencia) pista = 'pistaCiencia';
  $('fin-pista').textContent = tr(pista);
  $('fin-cartas').innerHTML = s.vividos.map(v => htmlCarta(v.ev)).join('');
  $('fin-pregunta').textContent = tr('queProbaras');
  document.querySelectorAll('.opcion-plan').forEach((b, i) => { b.textContent = tr('plan' + (i + 1)); b.setAttribute('aria-pressed', 'false'); });
  $('respuesta-plan').placeholder = tr('placeholderPlan');
  $('respuesta-plan').value = '';
  $('boton-otra-vez').textContent = tr('otraVez');
  $('boton-ver-album').textContent = tr('verAlbum');
  mostrarPantalla('fin');
  sonar(total === 3 ? 'victoria' : 'carta');
  $('fin-titulo').focus();
}

function jugarOtraVez() {
  const t = $('respuesta-plan').value.trim();
  if (t) planAnterior = t;
  estado = null;
  poderElegido = null;
  mostrarInicio();
}

/* ---------- Idioma ---------- */
function aplicarIdioma() {
  document.documentElement.lang = idioma;
  document.title = tr('titulo').replace('🌙 ', '');
  document.querySelectorAll('[data-t]').forEach(el => { el.textContent = tr(el.dataset.t); });
  document.querySelectorAll('[data-t-html]').forEach(el => { el.innerHTML = tr(el.dataset.tHtml); });
  $('boton-idioma').textContent = tr('idioma');
  $('boton-idioma').setAttribute('aria-label', tr('ariaIdioma'));
  $('boton-sonido').textContent = sonidoActivo ? tr('sonidoOn') : tr('sonidoOff');
  $('boton-sonido').setAttribute('aria-label', tr('ariaSonido'));
  $('boton-como').textContent = '❔';
  $('boton-como').setAttribute('aria-label', tr('comoJugar'));
  $('boton-como').title = tr('comoJugar');
  $('boton-album').setAttribute('aria-label', tr('ariaAlbum'));
  $('boton-album').title = tr('ariaAlbum');
}
function cambiarIdioma() {
  idioma = idioma === 'es' ? 'en' : 'es';
  guardarPreferencia('idioma', idioma);
  aplicarIdioma();
  const p = pantallaActual();
  if (p === 'juego') actualizarJuego();
  else if (p === 'fin') mostrarFinal();
  else mostrarInicio();
  actualizarBarra();
  if (!$('capa-album').hidden) mostrarAlbum();
  if (!$('capa-como').hidden) mostrarComoJugar();
}

/* ------------------------------------------------------------------
   10. SONIDO OPCIONAL (apagado al inicio; tonos suaves, sin archivos)
   ------------------------------------------------------------------ */
let audio = null;
function tono(freq, dur, vol = 0.05, tipo = 'sine', retraso = 0) {
  if (!audio) return;
  const t0 = audio.currentTime + retraso;
  const o = audio.createOscillator(), g = audio.createGain();
  o.type = tipo; o.frequency.value = freq;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(audio.destination);
  o.start(t0); o.stop(t0 + dur + 0.05);
}
function sonar(tipo) {
  if (!sonidoActivo) return;
  try {
    if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
    if (tipo === 'poner') tono(660, 0.12);
    else if (tipo === 'quitar') tono(440, 0.12);
    else if (tipo === 'noche') { tono(392, 0.25, 0.04); tono(330, 0.3, 0.04, 'sine', 0.15); }
    else if (tipo === 'carta') { tono(523, 0.18); tono(659, 0.18, 0.05, 'sine', 0.12); tono(784, 0.25, 0.05, 'sine', 0.24); }
    else if (tipo === 'golpe') tono(220, 0.35, 0.05, 'triangle');
    else if (tipo === 'victoria') { [523, 659, 784, 1047].forEach((f, i) => tono(f, 0.25, 0.05, 'sine', i * 0.12)); }
  } catch (e) { /* sin audio: no pasa nada */ }
}

/* ------------------------------------------------------------------
   11. INICIO
   ------------------------------------------------------------------ */
function conectarEventos() {
  construirModulos();
  $('boton-idioma').addEventListener('click', cambiarIdioma);
  $('boton-sonido').addEventListener('click', () => {
    sonidoActivo = !sonidoActivo;
    guardarPreferencia('sonido', sonidoActivo);
    aplicarIdioma();
    sonar('poner');
  });
  $('boton-album').addEventListener('click', mostrarAlbum);
  $('boton-como').addEventListener('click', mostrarComoJugar);
  $('boton-empezar').addEventListener('click', empezarMision);
  $('boton-terminar').addEventListener('click', terminarDiaClick);
  $('boton-siguiente').addEventListener('click', continuarTrasNoche);
  $('boton-cerrar-album').addEventListener('click', () => cerrarCapa('capa-album'));
  $('boton-entendido').addEventListener('click', () => cerrarCapa('capa-como'));
  $('boton-otra-vez').addEventListener('click', jugarOtraVez);
  $('boton-ver-album').addEventListener('click', mostrarAlbum);
  document.querySelectorAll('.opcion-plan').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.opcion-plan').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    $('respuesta-plan').value = b.textContent;
  }));
  // Escape cierra el álbum y el "cómo jugar" (la noche se cierra con su botón)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!$('capa-album').hidden) cerrarCapa('capa-album');
    if (!$('capa-como').hidden) cerrarCapa('capa-como');
  });
}

async function iniciar() {
  const guardado = leerPreferencia('idioma', null);
  idioma = guardado || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');
  sonidoActivo = leerPreferencia('sonido', false);
  album = new Set(leerPreferencia('album', []));
  conectarEventos();
  aplicarIdioma();
  await cargarEventos();
  mostrarInicio();
  cargarClimaReciente().then(() => {
    if (pantallaActual() === 'inicio') mostrarClima();
    actualizarBarra();
  });
}

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', iniciar);

// Solo para pruebas automáticas con Node.js (el navegador ignora esto).
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG, PODERES, MODULOS, TEXTOS, EVENTOS_RESPALDO,
    crearEstado, orbesDelDia, asignar, terminarDia, simularNoche, estrellas, sugerencia, muestras,
    obtenerEstado: () => estado, fijarEstado: (e) => { estado = e; }
  };
}
