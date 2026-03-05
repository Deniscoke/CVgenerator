# CV Generator (HTML/CSS/JS)

Jednoduchý AI CV generátor postavený iba na:
- `index.html`
- `styles.css`
- `script.js`

## Spustenie lokálne

```bash
python3 -m http.server 8080
```

Potom otvor `http://localhost:8080`.

## OpenAI API nastavenie

Aplikácia berie API kľúč z formulára a ukladá ho do `localStorage` v prehliadači.

### Dôležité upozornenie

Toto je **frontend-only** riešenie, takže API key je dostupný v browseri. Na produkciu je bezpečnejšie použiť backend proxy.

## Kde pridať API key v GitHube

Ak chceš mať automatické nasadenie cez GitHub Actions a backend proxy neskôr, API key nastavíš ako secret:

1. Choď do repozitára na GitHub.
2. `Settings` → `Secrets and variables` → `Actions`.
3. Klikni `New repository secret`.
4. Názov: `OPENAI_API_KEY`
5. Hodnota: tvoj OpenAI key (`sk-...`).

> Pri čisto statickom GitHub Pages webe sa tento secret nedá bezpečne čítať priamo v browseri. Secret sa používa len v build/deploy/backend časti.

## Odporúčaný model

Predvolený model v appke je `gpt-4.1-mini`, ktorý je rýchly a vhodný na textové generovanie CV. Môžeš ho zmeniť priamo vo formulári.
