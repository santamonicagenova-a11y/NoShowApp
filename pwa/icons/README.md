# Icone NoShowApp

3 varianti SVG 1024×1024, già pronte per l'export PNG.

## File

- `icon-solid.svg` — **CONSIGLIATA** · Carmine pieno con scudo + N bianca
- `icon-ink.svg` — Sfondo ink scuro con scudo carmine
- `icon-word.svg` — Wordmark N editoriale
- `icon-maskable.svg` — Versione con safe-zone per Android adaptive (40% padding)

## Generare i PNG

1. Vai su [realfavicongenerator.net](https://realfavicongenerator.net)
2. Carica `icon-solid.svg` come "Master picture"
3. Per la sezione iOS, NON aggiungere bordo (lo scudo è già centrato)
4. Per la sezione Android, carica `icon-maskable.svg` come maskable icon
5. Scarica il pacchetto e copia i PNG qui in `pwa/icons/`

## Output atteso

```
icons/
├── apple-touch-icon.png   (180×180) ← iOS home
├── icon-152.png           (152×152) ← iPad
├── icon-167.png           (167×167) ← iPad Pro
├── icon-192.png           (192×192) ← Android standard
├── icon-512.png           (512×512) ← Android alta risoluzione
├── icon-maskable-512.png  (512×512) ← Android adaptive
├── favicon-32.png         (32×32)   ← browser tab
├── favicon-16.png         (16×16)   ← browser tab
└── splash-1170x2532.png   ← splash screen iPhone Pro
```

I path PNG corrispondono a quelli già configurati in `manifest.json` e `head-tags.html`.

## Splash screen

Per gli splash screen iOS, esporta dalla preview in `Icona e Splash.html` o usa
[appsco.pe/developer/splash-screens](https://appsco.pe/developer/splash-screens) caricando lo stesso SVG.

Dimensioni minime da generare:
- 1170×2532 — iPhone 13/14/15 Pro
- 1284×2778 — iPhone 14/15 Plus
- 1170×2532 — iPhone 12/13/14
