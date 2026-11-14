# 🌙 Neurodiverse Outpost (Outpost Neurodiverso)

*Versión en español: [LEEME.md](LEEME.md)*

**A bilingual (English / Spanish) browser game for kids aged 7–12. Run a Moon base by sharing out the Sun’s power, protect your crew from real solar events recorded by NASA, and collect their cards.**

Built for the **NASA Space Apps Challenge 2026**. It runs in the browser on computers, tablets and phones, with no downloads, no accounts and no dependencies.

---

## 1. The challenge

Design a game for kids aged 7–12 to manage a lunar or Martian outpost while balancing life support (oxygen), radiation shielding, power, food production and communication delays. No decision may be free, and the simulation must be based on real NASA open data.

## 2. How to play (in 30 seconds)

1. Each day the Sun gives you **4 ☀️ power**.
2. **Tap the base modules** to give them power: 🛡️ Shield, 💨 Air, 🌱 Greenhouse and 🔬 Lab. Every tap changes something you can see right away.
3. Watch the **Sun forecast**: every 3 days a **real event** (2024–2026, from NASA DONKI) arrives. A particle storm needs shield level 3 or 4.
4. Press **🌙 End the day**. The crew breathes, eats, rests or gets tired, and if there was an event you earn its **real card** for your album.
5. Earn up to **3 stars**: last all the days, collect 3 science samples and block every storm.

## 3. Why it is engaging

| What usually bores kids | What this game does |
|---|---|
| Picking from a menu and reading numbers | Tap modules and see the change right away: the shield grows, the tank fills, the plant sprouts |
| The reward only comes at the end | A reward every night: harvests, samples, a new card |
| Abstract goals | 3 visible stars from the first second |
| Nothing to collect | An album of real solar-event cards (20 historical plus live recent ones) |
| Lots of text | Icons, crew faces and a short tip from Ana that you can apply with one tap |

## 4. Human-centered, neurodivergent approach

**Mental load is part of the rules.** The crew’s mental energy (the opposite of cognitive load) shows on their faces. If you use 0–2 ☀️ in a day, the crew rests (+1). With 3 nothing changes, and with 4 they get tired (−1). At 0, the next day they can only work with 2 ☀️. Resting is a strategy too.

**Superpowers instead of "modes".** At the start, the player chooses how they like to process information. None of them is the "normal" one: each one helps and each one costs something.

| Superpower | Helps you | Costs |
|---|---|---|
| 👁️ Quick eye | Everything with icons and a visual legend | Ana gives no tips |
| 👣 Planner | See how everything will look before ending the day, and undo | 1 less ☀️ every 2 days |
| 📖 Narrator | Explanations and fun NASA facts every day | The mission lasts 12 days instead of 10 |
| 🔭 Forecaster | Know which event is coming and how much shield you need | The antenna uses 1 ☀️ the day before each event |

**Communication delays** show up with the Forecaster: a solar flare cuts the radio, so the next day’s warning does not arrive.

**No "normal" mode.** Winning does not depend on reacting fast, reading fast, guessing hidden rules or coping with surprises:
- There is no time limit, and you play at your own pace.
- Every rule and cost is always visible.
- The night resolves everything without randomness, so results are predictable.
- The crew never blames anyone and the game never says "you lost".
- The game never names diagnoses or asks players to identify themselves.

The design follows the three principles of Universal Design for Learning (CAST, UDL 3.0): multiple means of engagement, representation, and action and expression.

**Accessibility:**
- Text of at least 18 px and big buttons.
- Colors are always paired with icons or words.
- No flashing.
- Short animations that turn off when the system asks for reduced motion.
- Optional sound, off by default, with soft tones.
- Works with keyboard, mouse or touch.
- The language can be switched at any time with 🌐.

## 5. Real data used

**NASA DONKI (space weather).**
- `data/donki-eventos.json`: 20 real events from January 2024 to November 2026 (13 X-class flares and 7 SEP events), verified on November 14, 2026. Each one has `id_donki` (its official ID), `verificar` (the query to check it) and descriptions in Spanish and English.
- **Live:** when the game opens, it queries `https://ccmc.gsfc.nasa.gov/DONKI-API/get/` (FLR, SEP, CME). The service needs no key. The start screen shows "The Sun this week", and strong events from the last month join the mission as 🆕 cards. The date comes from the device the game runs on. Offline, the game uses the saved events.
- **Intensity (game rule):** an SEP event with particles above 100 MeV needs shield level 4; the others need level 3.

**NASA OSDR (greenhouse):** OSD-268 (lettuce grown in Veggie on the Space Station) and OSD-772 (chile peppers grown for 137 days in the Advanced Plant Habitat, 26 fruits).

**CSA:** the *Food production on the Moon and in remote areas* toolkit provided the educational framing for food production.

**Not used:** RadLab returned HTTP 500 during development, so radiation damage is a game rule. Mental energy, air and food values are design parameters, not measurements.

## 6. Exact rules

| Module | Each ☀️ gives | Every night |
|---|---|---|
| 🛡️ Shield (0–5) | +1 level | −1 (wear) |
| 💨 Air (0–10) | +2 | −2 (breathing). If it reaches 0, the mission ends |
| 🌱 Greenhouse | 3 ☀️ = a harvest of 4 days of food | −1 food. With no food, mental energy −2 |
| 🔬 Lab | 2 ☀️ = 1 sample (goal: 3) | — |

**Start:** air 10, food 7, shield 3, mental energy 3.
**Events (days 3, 6, 9, 12):**
- Storm (SEP) with too little shield: air −3 and mental energy −1.
- Flare (FLR): no harm, and it cuts the radio for one day.

**End:** the mission ends early if air reaches 0, or if mental energy stays at 0 for 3 days in a row.

## 7. Balance (4,000 simulated games per strategy and superpower)

| Strategy (Quick eye) | Survives | ★★★ |
|---|---|---|
| Always put all power into one module | 0% | 0% |
| Always share power evenly, ignoring the forecast | ~94% | ~33% |
| Random | ~44% | ~16% |
| Kid who follows Ana 2 days out of 3 and plays at random the rest | ~79% | ~72% |
| Always follow Ana | 100% | 100% |

Following Ana earns 3 stars with all four superpowers. Earning them without help means watching the forecast and making sure the crew rests.

## 8. How to test it (judges, 3 minutes)

1. Open the link. Check the **The Sun this week** card (live data) and switch language with 🌐.
2. Choose **🔭 Forecaster** and follow the 4-step tutorial.
3. Tap modules and watch them change right away. Use **💡 Use suggestion** once.
4. End day 3: a **real card** appears, with its date, its class and a link to verify it in DONKI.
5. Finish the mission, check your stars and open the **🎴 album**.

## 9. Run and publish

Double-click `index.html`, or publish it with GitHub Pages (*Settings → Pages → Deploy from a branch → main / root*). If the browser blocks the JSON, the game uses its built-in copy, which has the same data.

## 10. Future work

- Integrate RadLab once its server is available.
- A Mars mode with communication delays of several minutes.
- Optional read-aloud.
- Testing with neurodivergent kids, their families and teachers.

## 11. Use of artificial intelligence

Code, texts in both languages, data retrieval and verification, and balance simulations were developed with assistance from generative AI (Claude, by Anthropic). The author defined the concept, the human-centered neurodivergent approach and the design decisions, and reviewed, tested and approved the result. *(Adjust this paragraph to your actual process.)*

## 12. Credits

**Irving Mellin Rubio**, electronic engineer, solo participant. NASA Space Apps Challenge 2026.
Data: NASA DONKI (CCMC, NASA Goddard) and NASA OSDR. Educational resource: Canadian Space Agency (CSA).
