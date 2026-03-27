# Prima del Verbo — Documento Master

## Progetto
Sito web per il progetto editoriale "Prima del Verbo" di Yan Pastushenko.
URL: primadelverbo.it
Stack: Next.js 14 App Router, TypeScript, Tailwind CSS, Markdown per blog, deploy su Netlify.

## Brand
- Nome: Prima del Verbo
- Tagline: filosofia del risveglio
- Autore: Yan Pastushenko
- Frase hero: "Non stai cercando risposte. Stai ricordando."
- Logo: /public/logo.png (600x600, sfondo trasparente)

## Palette colori (CSS variables in globals.css)
--bg: #0c0c0a
--bg2: #131209
--surface: #191814
--border: #28261f
--gold: #c7ba8c
--gold2: #e0d499
--gold-muted: #94885c
--white: #f0e9d2
--text2: #a09881
--text3: #605a48

## Font
Cormorant Garamond da Google Fonts (Regular, Italic, Medium, Light)

## Struttura pagine
- / — Home: navbar + hero + intro + 3 card blog + sezione tesi download + newsletter + footer
- /blog — Lista articoli markdown
- /blog/[slug] — Articolo singolo
- /opere — Tesi e future opere

## Struttura blog
- I post sono file .md in /content/blog/
- Frontmatter: title, date, excerpt, chapter, readTime
- Slug = nome del file

## Sezioni Home
1. Navbar: logo + "PRIMA DEL VERBO" + link HOME BLOG OPERE NEWSLETTER
2. Hero: logo grande centrato + headline + 2 CTA
3. Intro: frase di riconoscimento del pubblico
4. Blog: 3 card articoli recenti
5. Tesi: download gratuito in cambio di email
6. Newsletter: iscrizione
7. Footer: brand + copyright + link social

## Note di stile
- Tutto serif, elegante, minimalista
- Nessun elemento superfluo
- Tono: filosofico, non spiritual-new-age
- Bottoni: bordo radius 2px, letterspacing 2px uppercase
