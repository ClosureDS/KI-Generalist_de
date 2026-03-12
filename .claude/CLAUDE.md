# KI-Generalist.de — Landing Page

## Projekt

Statische One-Page Waitlist/Pre-Launch Website für **KI-Generalist.de** (Autonome KI-Lösungen).
Zielgruppe: Unternehmen, die KI-Agenten, Workflow-Automatisierung und prozessnahe Software suchen.

## Stack

- **HTML** — Einzel-Datei (`index.html`), kein Framework
- **Tailwind CSS** — via CDN (`cdn.tailwindcss.com`), Custom-Config inline im `<head>`
- **Google Fonts** — Inter (Body/UI) + Playfair Display (Serif-Akzente in Headlines)
- **Vanilla JavaScript** — `js/main.js`
- **Custom CSS** — `css/styles.css` (Design-Tokens, Glassmorphism, Animationen, Toast-System)
- **Kein Build-Prozess** — Dateien werden direkt ausgeliefert

## Dateistruktur

```
KI-Generalist_de/
├── index.html              # Komplettes HTML (Single Page)
├── css/styles.css          # Design-Tokens, Glassmorphism, Animationen, Toast-Styles
├── js/main.js              # Formular-Handling, Scroll-Observer, Webhook-Anbindung
├── Logo/
│   └── KI-Agenten-Services.svg  # Logo (fixed, oben links)
├── KI-Generalist_BG.png    # Hero-Hintergrundbild
└── *.jpg                   # Referenz-Screenshots der Sektionen
```

## Design-System

### Farbschema (Tailwind Config + CSS Custom Properties)

| Token | Wert | Verwendung |
|-------|------|------------|
| `background` | `#000000` | Seitenhintergrund (pure black) |
| `surface` | `#0A0A0A` | Karten, Footer, Process-Section |
| `primary` | `#FF5100` | Buttons, Akzente, Icons, Verläufe, Glows |
| `accent` | `#7B5CFF` | Sekundärer Glow (Purple, dezent) |
| `--text-secondary` | `#9CA3AF` | Body-Text (= `text-gray-400`) |
| `--text-muted` | `#6B7280` | Captions, Metadata (= `text-gray-500`) |

### Visuelle Effekte

- **Glassmorphism**: `.glass-card` (Cards), `.glass-input` (Formulare) — `backdrop-filter: blur`, semi-transparente Borders
- **Background Layer**: `body::before` (radial orange + purple Glows), `body::after` (Grain-Texture-Overlay, SVG noise)
- **Hero-Glows**: Radial-Gradient + driftende Orbs (CSS `gradientDrift` Animation, 15s)
- **Serif-Akzent**: `.serif-accent` — Playfair Display italic + orange Text-Shadow auf Schlüsselwörtern in Headlines

### Buttons

- **Primär (Anmelden)**: `bg-primary text-white rounded-full` mit orange Glow-Shadow on Hover
- **Ghost**: Transparent, `text-gray-500 hover:text-white`

## Sektionen (index.html)

| ID | Sektion | Inhalt |
|----|---------|--------|
| `#hero` | Hero mit Announcement-Pill, Headline (Serif-Akzent), Waitlist-Formular, "Mehr erfahren"-Link |
| `#vision` | "Arbeit wird neu organisiert" — 3 Punkte |
| `#software` | "Software folgt dem Prozess" — 4 Punkte |
| `#services` | 3 Service-Karten (Coming Soon) — Glassmorphism-Cards |
| `#process` | 3-Schritte-Flow (Desktop horizontal + Mobile vertikal) |
| `#waitlist` | Footer mit 2. Waitlist-Formular + Links |

## Waitlist-Formular

- 2 Formulare (Hero + Footer) mit Klasse `.waitlist-form`
- `data-source="Hero"` bzw. `data-source="Footer"` zur Unterscheidung
- Sendet `{ eMailAdress, source }` als JSON POST an n8n-Webhook
- Webhook-URL ist Base64-kodiert in `js/main.js` (Zeile 3–5)
- Toast-Benachrichtigungen für Erfolg/Fehler (XSS-sicher via `textContent`)

## n8n-Workflow (Backend)

### Aktiver Workflow: `KI-Generalist Automation v2 (gehärtet)`
- **Workflow-ID:** `GzOcJUfu3RcIV8R6`
- **Webhook-Pfad:** `be045531-d03c-4ec8-bc6d-28055eefa009`
- **Webhook-URL:** `https://n8n.ki-agents-solutions.de/webhook/be045531-d03c-4ec8-bc6d-28055eefa009`
- **Error-Workflow:** `3bC1cK3SPBTWaCre` (Telegram Alert, aktiv)

### Alter Workflow (deaktiviert)
- **Name:** `KI-Generalist Automation`
- **Workflow-ID:** `S26AuGaCTpaRzOIE`
- **Status:** Deaktiviert seit 2026-03-09, ersetzt durch v2

### Workflow-Architektur (v2)

```
Webhook → Input Validation → [gültig?]
  ├─ Nein → Respond 400
  └─ Ja → Respond 200 → Email-Validierung → Duplikat-Prüfung
       → Edit Fields → Insert Row → Domain-Klassifizierung → [Business?]
            ├─ Nein → Freemail/Disposable Skip
            └─ Ja → Approval anfragen (Gmail sendAndWait) → [Freigabe?]
                  ├─ Nein → Abgelehnt Stop
                  └─ Ja → AI Research Agent (GPT-4o + SerpAPI)
                       → Output Validation → [gültig?]
                            ├─ Nein → Output-Fehler Alert
                            └─ Ja → Report senden
```

### Wichtige Merkmale (v2)
- **CORS:** Nur `https://ki-generalist.de` (v1 hatte `*`)
- **Response-Mode:** `responseNode` — sofortige Antwort ans Frontend (200/400)
- **Input-Validation:** Schema-Prüfung, Email-Normalisierung (lowercase, trim)
- **Domain-Klassifizierung:** ~60 Freemail + Disposable-Domains (Code-Node)
- **Human Approval Gate:** Gmail sendAndWait vor AI-Agent-Kosten
- **AI Agent:** GPT-4o via OpenRouter, SerpAPI (DE, max 5 Ergebnisse, max 10 Iterationen)
- **Output-Validation:** Pflichtabschnitte, Mindestlänge, verbotene HTML-Tags
- **Error-Handling:** Error-Workflow (Telegram), Insert Row mit `onError: continueRegularOutput`
- **DataTable:** `KI-Generalist-Anmeldungen` (ID: `DjYUC5oiFBp1Waxo`)
- **Credentials:** Gmail OAuth2, OpenRouter API, SerpAPI (in n8n gespeichert)

## Animationen

- **Hero**: CSS-Keyframe `fadeUp` mit gestaffelten Delays (`.hero-fade-1/2/3`)
- **Hero-Glows**: `gradientDrift` Keyframe (15s Zyklus, subtile Orb-Bewegung)
- **Scroll**: `IntersectionObserver` fügt `.visible` hinzu (`.scroll-fade-up`, `.scroll-fade-left`)
- **Stagger**: `.stagger-1` bis `.stagger-4` für verzögerte Einblendung
- **Service-Cards**: Hover mit orange Border-Glow + `translateY(-4px)`
- **Grain-Overlay**: Festes SVG-Noise auf `body::after`, opacity 0.03

## Wichtige Hinweise

- **Tailwind CDN** ist nur für Entwicklung — vor Produktion auf Build-Prozess umstellen
- **Webhook-URL liegt im Frontend** (Base64-kodiert) — v2-Workflow hat CORS + Input-Validation als Schutz
- **Impressum/Datenschutz** sind Platzhalter (`href="#"`) — müssen mit echten Seiten verknüpft werden
- **Logo** oben links fixiert (`Logo/KI-Agenten-Services.svg`), verlinkt auf `#hero`
- Keine Navigation/Header — reine Scroll-Seite mit Logo + Footer-Ankerlinks
- Sprache: Deutsch (`lang="de"`)
- **Gmail-Credentials** müssen im n8n-Editor manuell an die 3 Gmail-Nodes zugewiesen werden
