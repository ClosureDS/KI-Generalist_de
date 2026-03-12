# KI-Generalist.de

Statische One-Page Waitlist-Website fuer **KI-Generalist.de** — Autonome KI-Loesungen fuer Unternehmen.

## Uebersicht

Landing Page fuer KI-Agenten, Workflow-Automatisierung und prozessnahe Software. Die Seite dient als Pre-Launch-Waitlist, ueber die sich Interessenten per E-Mail anmelden koennen.

## Stack

| Technologie | Details |
|-------------|---------|
| HTML | Single-Page (`index.html`), kein Framework |
| Tailwind CSS | via CDN, Custom-Config inline |
| Google Fonts | Inter (UI) + Playfair Display (Serif-Akzente) |
| Vanilla JS | Formular-Handling, Scroll-Animationen, Toast-System |
| CSS | Design-Tokens, Glassmorphism, Keyframe-Animationen |

Kein Build-Prozess — Dateien werden direkt ausgeliefert.

## Dateistruktur

```
KI-Generalist_de/
├── index.html           # Komplettes HTML (Single Page)
├── css/styles.css       # Design-Tokens, Glassmorphism, Animationen, Toasts
├── js/main.js           # Formular-Handling, Scroll-Observer, Webhook
├── Logo/
│   └── KI-Agenten-Services.svg  # Logo (fixed, oben links)
├── KI-Generalist_BG.png # Hero-Hintergrundbild
├── .claude/CLAUDE.md    # Projekt-Kontext fuer Claude Code
└── README.md
```

## Design-System

- **Background**: Pure Black (`#000000`) mit Grain-Texture-Overlay
- **Primary**: `#FF5100` (Orange) — Buttons, Akzente, Icons, Glows
- **Accent**: `#7B5CFF` (Purple) — Sekundaerer Glow
- **Glassmorphism**: Semi-transparente Karten und Inputs mit `backdrop-filter: blur`
- **Typografie**: Inter (Sans-Serif) + Playfair Display (Serif-Akzente in Headlines)
- **Animationen**: Scroll-Reveal via IntersectionObserver, Hero-Glow-Drift, Card-Hover-Effekte

## Sektionen

| Sektion | Inhalt |
|---------|--------|
| Hero | Headline mit Serif-Akzent, Announcement-Pill, Waitlist-Formular |
| Vision | "Arbeit wird neu organisiert" — 3 Kernaussagen |
| Software | "Software folgt dem Prozess" — 4 Punkte |
| Services | 3 Service-Karten (Coming Soon) |
| Prozess | 3-Schritte-Flow (Desktop horizontal / Mobile vertikal) |
| Footer | Zweites Waitlist-Formular, Navigation, rechtliche Links |

## Waitlist-Formular

Zwei Formulare (Hero + Footer) senden `{ email, source }` als JSON POST an einen n8n-Webhook. Die Webhook-URL ist Base64-kodiert in `js/main.js` hinterlegt.

## Lokale Entwicklung

Einfach `index.html` im Browser oeffnen — kein Server oder Build-Schritt erforderlich.

Fuer Live-Reload z.B.:
```bash
npx serve .
```

## Hinweise

- **Tailwind CDN** ist nur fuer Entwicklung — vor Produktion auf Build-Prozess umstellen
- **Webhook-URL liegt im Frontend** — fuer Spam-Schutz serverseitigen Proxy einrichten
- **Impressum/Datenschutz** sind Platzhalter (`href="#"`) — muessen verlinkt werden
- **Logo** oben links fixiert (`Logo/KI-Agenten-Services.svg`), verlinkt auf Hero
- Keine Navigation — reine Scroll-Seite mit Logo + Footer-Ankerlinks
- Sprache: Deutsch (`lang="de"`)

## Lizenz

Alle Rechte vorbehalten.
