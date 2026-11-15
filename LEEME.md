# 🌙 Outpost Neurodiverso

*English version: [README.md](README.md)*

**Un juego de navegador, en español e inglés, para niños de 7 a 12 años. Cuidas una base en la Luna repartiendo la energía del Sol, proteges a tu equipo de eventos solares reales registrados por la NASA y coleccionas sus cartas.**

Lo hice para el **NASA Space Apps Challenge 2026**. Funciona en el navegador, en computador, tableta o celular. No hay que descargar nada, no hay que crear cuentas y no necesita instalar programas.

---

## 1. El reto

Diseñar un juego para niños de 7 a 12 años que gestione un puesto avanzado en la Luna o en Marte. El jugador debe equilibrar el soporte vital (oxígeno), el blindaje contra la radiación, la energía, la producción de alimentos y los retrasos en las comunicaciones. Ninguna decisión puede ser gratuita y la simulación debe basarse en datos abiertos reales de la NASA.

## 2. Cómo se juega (en 30 segundos)

1. Cada día el Sol te da **4 ☀️ de energía**.
2. **Toca los módulos** de la base para darles energía: 🛡️ Escudo, 💨 Aire, 🌱 Invernadero, 🔬 Laboratorio. Cada toque cambia algo que ves al instante.
3. Mira el **pronóstico del Sol**: cada 3 días llega un **evento real** (de 2024 a 2026, tomado de NASA DONKI). Una tormenta de partículas exige escudo 3 o 4.
4. Pulsa **🌙 Terminar el día**: el equipo respira, come, descansa o se cansa, y si hubo evento ganas su **carta real** para el álbum.
5. Gana hasta **3 estrellas**: aguantar todos los días, juntar 3 muestras de ciencia y bloquear todas las tormentas.

## 3. Por qué engancha

| Lo que suele aburrir | Lo que hace este juego |
|---|---|
| Elegir de un menú y leer números | Tocar módulos y ver el cambio al instante: el escudo crece, el tanque se llena, la planta brota |
| La recompensa llega al final | Recompensa cada noche: cosechas, muestras, una carta nueva |
| Metas abstractas | 3 estrellas visibles desde el primer segundo |
| Nada que coleccionar | Un álbum de cartas de eventos solares reales (20 históricos + los recientes en vivo) |
| Mucho texto | Íconos, caras del equipo y un consejo corto de Ana que se aplica con un toque |

## 4. Mi enfoque: pensado para cerebros diversos

Soy ingeniero con TDAH y hice este juego pensando en los niños que suelen quedar fuera: niños autistas, con TDAH y otras formas de procesar el mundo. Por eso la **carga mental es parte de las reglas**. La energía mental del equipo se ve en sus caras. Si en un día usas 0 a 2 ☀️, el equipo descansa (+1). Con 3 se queda igual y con 4 se cansa (−1). Si llega a 0, al día siguiente solo pueden trabajar con 2 ☀️. Descansar también es estrategia.

**Superpoderes en lugar de "modos".** Al empezar, el jugador elige cómo prefiere procesar la información. Ninguno es el "normal": todos ayudan y todos cuestan.

| Superpoder | Te ayuda | Cuesta |
|---|---|---|
| 👁️ Vista rápida | Todo con íconos y una leyenda visual | Ana no da consejos |
| 👣 Planificador | Ves cómo quedará todo antes de terminar el día, y puedes deshacer | 1 ☀️ menos cada 2 días |
| 📖 Narrador | Explicaciones y datos curiosos de la NASA cada día | La misión dura 12 días en vez de 10 |
| 🔭 Pronóstico | Sabes qué evento viene y cuánto escudo necesitas | La antena gasta 1 ☀️ el día antes de cada evento |

El **retraso de las comunicaciones** aparece con el Pronóstico: un destello solar corta la radio y al día siguiente no llega el aviso.

**No hay un modo "normal".** Ganar no depende de reaccionar rápido, leer rápido, adivinar reglas ocultas ni tolerar sorpresas:
- No hay límite de tiempo y se juega a tu ritmo.
- Las reglas y los costos están siempre a la vista.
- La noche resuelve todo sin azar, así que los resultados son predecibles.
- La tripulación nunca culpa y el final nunca dice "perdiste".
- El juego no nombra diagnósticos ni pide que el jugador se identifique.

El diseño sigue los tres principios del Diseño Universal para el Aprendizaje (CAST, UDL 3.0): varias formas de motivarse, de recibir la información y de actuar.

**Accesibilidad:**
- Letra de 18 px como mínimo y botones grandes.
- Colores siempre acompañados de íconos o palabras.
- Sin parpadeos.
- Animaciones cortas que se apagan si el sistema pide reducir el movimiento.
- Sonido opcional, apagado al inicio, con tonos suaves.
- Se puede jugar con teclado, mouse o pantalla táctil.
- El idioma se cambia en cualquier momento con 🌐.

## 5. Datos reales que uso

**NASA DONKI (clima espacial).**
- `data/donki-eventos.json` tiene 20 eventos reales de enero de 2024 a noviembre de 2026 (13 fulguraciones de clase X y 7 tormentas de partículas SEP), verificados el 14 de noviembre de 2026. Cada uno tiene `id_donki` (su identificador oficial), `pagina_donki` (su ficha oficial en la web de la NASA, legible y con gráfico), `verificar` (la consulta técnica en JSON) y descripciones en español e inglés. En el juego, cada carta tiene el enlace **🔎 Ver este evento en la web de la NASA**.
- **En vivo:** al abrir el juego se consulta `https://ccmc.gsfc.nasa.gov/DONKI-API/get/` (FLR, SEP, CME). El servicio no pide clave. La pantalla de inicio muestra "El Sol esta semana" y los eventos fuertes del último mes entran a la misión como cartas 🆕. La fecha la toma el equipo donde se abre el juego. Sin internet, se juega con los eventos guardados.
- **Intensidad (regla del juego):** una SEP que llevó partículas de más de 100 MeV exige escudo 4; las demás, escudo 3.

**NASA OSDR (invernadero):** OSD-268 (lechuga en Veggie, Estación Espacial) y OSD-772 (chiles durante 137 días en el Advanced Plant Habitat, 26 frutos).

**CSA:** el kit *Food production on the Moon and in remote areas* me sirvió de marco educativo para la producción de alimentos.

**Lo que no uso:** RadLab respondía con error 500 durante el desarrollo, así que el daño por radiación es una regla de juego. Los valores de energía mental, aire y comida son parámetros de diseño, no mediciones.

## 6. Reglas exactas

| Módulo | Cada ☀️ da | Cada noche |
|---|---|---|
| 🛡️ Escudo (0-5) | +1 nivel | −1 (desgaste) |
| 💨 Aire (0-10) | +2 | −2 (respirar). Si llega a 0, la misión termina |
| 🌱 Invernadero | 3 ☀️ = cosecha de 4 días de comida | −1 de comida. Sin comida, energía mental −2 |
| 🔬 Laboratorio | 2 ☀️ = 1 muestra (meta: 3) | — |

**Inicio:** aire 10, comida 7, escudo 3, energía mental 3.
**Eventos (días 3, 6, 9 y 12):**
- Tormenta (SEP) con escudo menor que el necesario: aire −3 y energía mental −1.
- Destello (FLR): no hace daño y corta la radio un día.

**Fin:** la misión termina antes de tiempo si el aire llega a 0 o si la energía mental se queda en 0 tres días seguidos.

## 7. Equilibrio (4.000 partidas simuladas por estrategia y superpoder)

| Estrategia (Vista rápida) | Sobrevive | ★★★ |
|---|---|---|
| Poner siempre toda la energía en un solo módulo | 0 % | 0 % |
| Repartir siempre igual, sin mirar el pronóstico | ~94 % | ~33 % |
| Al azar | ~44 % | ~16 % |
| Niño que sigue a Ana 2 de cada 3 días y el resto juega al azar | ~79 % | ~72 % |
| Seguir siempre a Ana | 100 % | 100 % |

Seguir a Ana da las 3 estrellas en los 4 superpoderes. Para conseguirlas sin ayuda hay que mirar el pronóstico y cuidar el descanso.

## 8. Cómo probarlo (jueces, 3 minutos)

1. Abre el enlace. Mira la tarjeta **El Sol esta semana** (datos en vivo) y cambia de idioma con 🌐.
2. Elige **🔭 Pronóstico** y sigue el tutorial de 4 pasos.
3. Toca módulos y observa el cambio inmediato. Usa **💡 Usar sugerencia** una vez.
4. Termina el día 3: aparece una **carta real** con su fecha, su clase y el enlace a su ficha oficial en la web de la NASA.
5. Termina la misión, revisa las estrellas y abre el **🎴 álbum**.

## 9. Ejecutar y publicar

Doble clic en `index.html`, o publícalo con GitHub Pages (*Settings → Pages → Deploy from a branch → main / root*). Si el navegador bloquea el JSON, el juego usa su copia interna, que tiene los mismos datos.

## 10. Trabajo futuro

- Integrar RadLab cuando su servidor esté disponible.
- Modo Marte, con varios minutos de retraso en las comunicaciones.
- Lectura en voz alta opcional.
- Pruebas con niños neurodivergentes, sus familias y sus docentes.

## 11. Uso de inteligencia artificial

El código, los textos en ambos idiomas, la descarga y verificación de datos y las simulaciones de equilibrio los hice con asistencia de IA generativa (Claude, de Anthropic). Yo definí el concepto, el enfoque humanista y neurodivergente y las decisiones de diseño, y revisé, probé y aprobé el resultado.

## 12. Créditos

**Irving Mellin Rubio**, ingeniero electrónico, participante individual. NASA Space Apps Challenge 2026.
Datos: NASA DONKI (CCMC, NASA Goddard) y NASA OSDR. Recurso educativo: Agencia Espacial Canadiense (CSA).
