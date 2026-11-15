# Neurodiverse Outpost

Versión en español: [LEEME.md](LEEME.md)

A browser game in English and Spanish for kids aged 7 to 12. The player runs a base on the Moon for ten days. Each day they share out the Sun's power among four modules and protect their crew from solar events that NASA actually recorded. Every event they get through leaves a card for their album.

I built it for the NASA Space Apps Challenge 2026. It works in any modern browser on a computer, tablet or phone. There is nothing to install and no account to create.

## The challenge

The challenge asked for a game for kids aged 7 to 12 about running an outpost on the Moon or Mars. The player had to balance oxygen, radiation shielding, power, food and communication delays. No decision could be free, and the data had to come from NASA open sources.

I added a condition of my own. Many educational games reward the kid who reads fast, reacts fast and copes well with surprises. I wanted a game where none of those things decides who wins. That is why the crew's tiredness and rest are part of the rules.

## How to play

1. Every morning the Sun delivers 4 units of power.
2. The player taps the modules to give power to them: Shield, Air, Greenhouse and Lab. Each tap shows up right away. The shield grows, the air tank fills and the plant sprouts.
3. The forecast says what is coming. Every three days a real event from 2024 to 2026 arrives, taken from NASA's DONKI database. A particle storm needs shield level 3 or 4.
4. The "End the day" button makes the crew breathe, eat and rest, or get tired. If there was an event, the player gets its card.
5. There are three stars to earn: finish the mission, collect 3 science samples and block every storm.

Ana, the commander, suggests a split that can be applied with one tap. Following her suggestions guarantees the mission. To earn all three stars without help, the player has to read the forecast and look after the crew's rest.

## Tiredness, rest and superpowers

The crew has a mental energy level that shows on their faces. If 0 to 2 units are used in a day, the crew rests and gains a point. With 3 it stays the same, and with 4 they get tired and lose one. If it reaches zero, the next day they can only work with 2 units. Sometimes resting is the best move.

At the start, the player picks a superpower based on how they like to take in information. None of them is the "normal" mode, and each one has a cost:

| Superpower | What it gives | What it costs |
|---|---|---|
| Quick eye | Everything is shown with icons and a visual legend | Ana gives no suggestions |
| Planner | Shows how the base will look before the day ends, with undo | One less unit of power every two days |
| Narrator | Explanations and NASA fun facts every day | The mission lasts 12 days instead of 10 |
| Forecaster | Announces the next event and the shield it will need | The antenna uses one unit the day before each event |

Communication delay comes into play with the Forecaster: a solar flare cuts the radio, and the next day's warning does not arrive.

Some design decisions:

- There is no time limit.
- Rules and costs are always on screen.
- The night is resolved without chance, so the same split always gives the same result.
- Nobody blames the player, and the end screen never says "you lost".
- The game does not mention diagnoses or ask the player whether they are neurodivergent.

I followed the three principles of Universal Design for Learning (CAST, UDL 3.0): more than one way to get motivated, to take in information and to act.

## Accessibility

- Text is at least 18 px and buttons are large.
- No information depends on color alone; there is always an icon or a word with it.
- Nothing flashes. Animations are short and turn off when the operating system asks for reduced motion.
- Sound is optional, starts off and uses soft tones.
- It can be played with a keyboard, a mouse or a touch screen.
- The language can be switched at any time.

## NASA data

**DONKI, the space weather database (CCMC, NASA Goddard).** The file `data/donki-eventos.json` stores 20 events from January 2024 to November 2026: 13 X-class flares and 7 solar energetic particle storms (SEP). I checked them one by one on November 14, 2026. Each record includes:

- its official identifier (`id_donki`);
- a link to its page on NASA's website (`pagina_donki`);
- the API query that returns it (`verificar`);
- a description in Spanish and another in English.

Every card in the game has a "See this event on NASA's website" link.

When the game opens, it also queries the public DONKI API (`https://ccmc.gsfc.nasa.gov/DONKI-API/get/`), which needs no key. The start screen uses it to show what the Sun did over the last week. Strong events from the last month join the mission as new cards. The reference date is the one on the device running the game. Offline, the game uses the stored events.

I set an intensity rule for the game. A storm carrying particles above 100 MeV needs shield 4, and any other storm needs shield 3.

**OSDR, the space biology repository.** The greenhouse is based on two studies:

- OSD-268: lettuce grown in the Veggie system on the Space Station.
- OSD-772: chile peppers grown for 137 days in the Advanced Plant Habitat, with a harvest of 26 fruits.

**Canadian Space Agency.** Its educational kit *Food production on the Moon and in remote areas* was my framework for the food side of the game.

What did not come from measurements: during development RadLab returned error 500, so radiation damage is a game rule. The air, food and mental energy values are design parameters as well.

## Rules

| Module | Each unit of power | Each night |
|---|---|---|
| Shield (0 to 5) | goes up one level | goes down one level from wear |
| Air (0 to 10) | adds 2 | 2 are used up; if it reaches 0, the mission ends |
| Greenhouse | every 3 units, a harvest worth 4 days of food | 1 food is eaten; with no food, mental energy drops 2 |
| Lab | every 2 units, one sample (the goal is 3) | no change |

The mission starts with air 10, food 7, shield 3 and mental energy 3. Events fall on days 3, 6, 9 and 12. If a storm arrives and the shield is too low, the crew loses 3 air and 1 mental energy. A flare does no damage but leaves the base without radio for a day. The mission ends early if air reaches zero or if mental energy stays at zero for three days in a row.

## Balance

I simulated 4,000 games for each strategy and each superpower. These are the results with Quick eye:

| Strategy | Finishes the mission | Three stars |
|---|---|---|
| All power on one module | 0% | 0% |
| Always the same even split, ignoring the forecast | 94% | 33% |
| Random | 44% | 16% |
| Follow Ana two days out of three, random otherwise | 79% | 72% |
| Always follow Ana | 100% | 100% |

With the other three superpowers, always following Ana also gives 100% in both columns.

## Trying it in three minutes

1. Open the game and look at the "The Sun this week" box, which shows live data. Switch the language.
2. Pick the Forecaster superpower and follow the four-step tutorial.
3. Share out the power by tapping the modules. Try "Use suggestion" once.
4. When day 3 ends, the event's card appears with its date, its class and the link to NASA's page.
5. Finish the mission, check the stars and open the album.

## Running it

Open `index.html` in a browser. To publish it I use GitHub Pages (Settings, Pages, Deploy from a branch, `main` branch, root folder). If the browser blocks reading the local JSON file, the game uses a built-in copy with the same data.

It is plain HTML, CSS and JavaScript, with no frameworks and no external dependencies.

## Still to do

- Connect RadLab once its service responds again.
- A Mars mode, with communication delays of several minutes.
- Optional read-aloud.
- Testing with neurodivergent kids, their families and their teachers. I have not done this yet.

## Use of artificial intelligence

I wrote the code and the text with help from Claude, Anthropic's AI assistant. I also used it for the translations, to download and cross-check the DONKI data and to run the balance simulations. The idea, the neurodivergent approach and the design decisions are mine. I tested the game and reviewed the result before publishing it.

## Credits

Irving Mellin Rubio, electronic engineer. Solo participant in the NASA Space Apps Challenge 2026.

Data: NASA DONKI (CCMC, NASA Goddard Space Flight Center) and NASA OSDR. Educational material: Canadian Space Agency.
