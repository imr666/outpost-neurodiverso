# Outpost Neurodiverso

English version: [README.md](README.md)

Juego de navegador, en español e inglés, para niños de 7 a 12 años. El jugador está a cargo de una base en la Luna durante diez días. Cada día reparte la energía del Sol entre cuatro módulos y protege a su tripulación de eventos solares que la NASA registró de verdad. Cada evento que sobrevive le deja una carta para su álbum.

Lo desarrollé para el NASA Space Apps Challenge 2026. Funciona en cualquier navegador moderno, en computadora, tableta o celular, sin instalar nada y sin crear cuentas.

## El reto

El desafío pedía un juego para niños de 7 a 12 años sobre la gestión de un puesto avanzado en la Luna o en Marte. El jugador tenía que equilibrar oxígeno, blindaje contra la radiación, energía, alimentos y el retraso de las comunicaciones. Ninguna decisión podía ser gratuita y los datos tenían que salir de fuentes abiertas de la NASA.

Le agregué una condición propia. Muchos juegos educativos premian al que lee rápido, reacciona rápido y tolera bien las sorpresas. Quería que ninguna de esas cosas decidiera quién gana. Por eso el cansancio de la tripulación y el descanso forman parte de las reglas.

## Cómo se juega

1. Cada mañana el Sol entrega 4 unidades de energía.
2. El jugador toca los módulos para dárselas: Escudo, Aire, Invernadero y Laboratorio. Cada toque se nota en el momento. El escudo crece, el tanque de aire se llena y la planta brota.
3. El pronóstico avisa lo que viene. Cada tres días llega un evento real ocurrido entre 2024 y 2026, tomado del registro DONKI de la NASA. Una tormenta de partículas exige escudo 3 o 4.
4. Con el botón «Terminar el día» la tripulación respira, come y descansa, o se cansa. Si hubo evento, el jugador recibe su carta.
5. Hay tres estrellas posibles: terminar la misión, reunir 3 muestras científicas y bloquear todas las tormentas.

Ana, la comandante, sugiere un reparto que se aplica con un solo toque. Seguir sus sugerencias asegura la misión. Las tres estrellas sin ayuda exigen mirar el pronóstico y cuidar el descanso.

## Cansancio, descanso y superpoderes

La tripulación tiene una energía mental que se ve en sus caras. Si en un día se usan entre 0 y 2 unidades, el equipo descansa y recupera un punto. Con 3 se mantiene, y con 4 se cansa y pierde uno. Si la energía llega a cero, al día siguiente solo pueden trabajar con 2 unidades. A veces descansar es la mejor jugada.

Al empezar, el jugador elige un superpoder según cómo le gusta recibir la información. Ninguno es el modo «normal», y cada uno tiene su costo:

| Superpoder | Qué aporta | Qué cuesta |
|---|---|---|
| Vista rápida | Todo se presenta con íconos y una leyenda visual | Ana no da sugerencias |
| Planificador | Muestra cómo quedará la base antes de terminar el día y permite deshacer | Una unidad de energía menos cada dos días |
| Narrador | Explicaciones y datos curiosos de la NASA cada día | La misión dura 12 días en lugar de 10 |
| Pronóstico | Anuncia el próximo evento y el escudo que hará falta | La antena gasta una unidad el día anterior a cada evento |

El retraso de las comunicaciones se juega con el Pronóstico: un destello solar corta la radio y el aviso del día siguiente no llega.

Algunas decisiones de diseño:

- No hay límite de tiempo.
- Las reglas y los costos están siempre a la vista.
- La noche se resuelve sin azar, así que el mismo reparto da siempre el mismo resultado.
- Nadie culpa al jugador y la pantalla final no dice «perdiste».
- El juego no menciona diagnósticos ni pide al jugador que diga si es neurodivergente.

Seguí los tres principios del Diseño Universal para el Aprendizaje (CAST, UDL 3.0): dar más de una forma de motivarse, de recibir la información y de actuar.

## Accesibilidad

- Letra de 18 px como mínimo y botones grandes.
- Ningún dato depende solo del color: siempre va acompañado de un ícono o una palabra.
- No hay parpadeos. Las animaciones son cortas y se desactivan si el sistema operativo pide reducir el movimiento.
- El sonido es opcional, viene apagado y usa tonos suaves.
- Se juega con teclado, mouse o pantalla táctil.
- El idioma se cambia en cualquier momento.

## Datos de la NASA

**DONKI, base de datos de clima espacial (CCMC, NASA Goddard).** El archivo `data/donki-eventos.json` guarda 20 eventos ocurridos entre enero de 2024 y noviembre de 2026: 13 fulguraciones de clase X y 7 tormentas de partículas (SEP). Los verifiqué uno por uno el 14 de noviembre de 2026. Cada registro incluye:

- su identificador oficial (`id_donki`);
- el enlace a su ficha en la web de la NASA (`pagina_donki`);
- la consulta técnica que lo devuelve (`verificar`);
- una descripción en español y otra en inglés.

Cada carta del juego tiene el enlace «Ver este evento en la web de la NASA».

Al abrir el juego también se consulta la API pública de DONKI (`https://ccmc.gsfc.nasa.gov/DONKI-API/get/`), que no pide clave. Con esa consulta la pantalla de inicio muestra cómo estuvo el Sol en la última semana. Los eventos fuertes del último mes entran a la misión como cartas nuevas. La fecha de referencia es la del equipo donde se abre el juego. Sin conexión, el juego usa los eventos guardados.

Para el juego definí una regla de intensidad. Una tormenta con partículas de más de 100 MeV exige escudo 4, y las demás, escudo 3.

**OSDR, repositorio de biología espacial.** El invernadero se basa en dos estudios:

- OSD-268: lechuga cultivada en el sistema Veggie de la Estación Espacial.
- OSD-772: chiles cultivados durante 137 días en el Advanced Plant Habitat, con una cosecha de 26 frutos.

**Agencia Espacial Canadiense.** El kit educativo *Food production on the Moon and in remote areas* me sirvió de marco para la parte de alimentos.

Lo que no salió de mediciones: durante el desarrollo RadLab respondía con error 500, así que el daño por radiación es una regla del juego. Los valores de aire, comida y energía mental también son parámetros de diseño.

## Reglas

| Módulo | Cada unidad de energía | Cada noche |
|---|---|---|
| Escudo (0 a 5) | sube un nivel | baja un nivel por desgaste |
| Aire (0 a 10) | suma 2 | se consumen 2; si llega a 0, la misión termina |
| Invernadero | cada 3 unidades, una cosecha de 4 días de comida | se consume 1 de comida; sin comida, la energía mental baja 2 |
| Laboratorio | cada 2 unidades, una muestra (la meta es 3) | sin cambio |

La misión empieza con aire 10, comida 7, escudo 3 y energía mental 3. Los eventos caen los días 3, 6, 9 y 12. Si llega una tormenta y el escudo no alcanza, se pierden 3 de aire y 1 de energía mental. Un destello no hace daño, pero deja sin radio un día. La misión termina antes de tiempo si el aire llega a cero o si la energía mental pasa tres días seguidos en cero.

## Balance

Simulé 4000 partidas por cada estrategia y cada superpoder. Estos son los resultados con Vista rápida:

| Estrategia | Termina la misión | Tres estrellas |
|---|---|---|
| Toda la energía en un solo módulo | 0 % | 0 % |
| Repartir siempre igual, sin mirar el pronóstico | 94 % | 33 % |
| Al azar | 44 % | 16 % |
| Seguir a Ana dos de cada tres días y el resto al azar | 79 % | 72 % |
| Seguir siempre a Ana | 100 % | 100 % |

Con los otros tres superpoderes, seguir siempre a Ana también da 100 % en ambas columnas.

## Para probarlo en tres minutos

1. Abre el juego y mira el recuadro «El Sol esta semana», que trae datos en vivo. Cambia de idioma.
2. Elige el superpoder Pronóstico y sigue el tutorial de cuatro pasos.
3. Reparte la energía tocando los módulos. Prueba una vez «Usar sugerencia».
4. Al terminar el día 3 aparece la carta del evento, con su fecha, su clase y el enlace a la ficha de la NASA.
5. Termina la misión, revisa las estrellas y abre el álbum.

## Cómo ejecutarlo

Basta con abrir `index.html` en el navegador. Para publicarlo uso GitHub Pages (Settings, Pages, Deploy from a branch, rama `main`, carpeta raíz). Si el navegador bloquea la lectura del JSON local, el juego usa una copia interna con los mismos datos.

El proyecto está hecho con HTML, CSS y JavaScript, sin frameworks ni dependencias externas.

## Pendiente

- Conectar RadLab cuando su servicio vuelva a responder.
- Un modo Marte, con varios minutos de retraso en las comunicaciones.
- Lectura en voz alta opcional.
- Probarlo con niños neurodivergentes, sus familias y sus docentes. Todavía no lo he hecho.

## Uso de inteligencia artificial

Programé y redacté el juego con ayuda de Claude, el asistente de IA de Anthropic. También lo usé para las traducciones, para descargar y contrastar los datos de DONKI y para las simulaciones de balance. La idea, el enfoque neurodivergente y las decisiones de diseño son míos. Probé el juego y revisé el resultado antes de publicarlo.

## Créditos

Irving Mellin Rubio, ingeniero electrónico. Participante individual del NASA Space Apps Challenge 2026.

Datos: NASA DONKI (CCMC, NASA Goddard Space Flight Center) y NASA OSDR. Material educativo: Agencia Espacial Canadiense.
