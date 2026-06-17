# Charte Graphique - Vite et Gourmand

## Direction visuelle

Le système visuel repose sur deux univers complémentaires issus du code réel du frontend.

- Le monde public est chaleureux, culinaire et immersif : shell au fond brun sombre
  (`#2a1f16` dans `AppLayout`) réchauffé par des dégradés superposés dont un halo bordeaux
  (`rgba(140,50,55,0.22)`), accent bordeaux (`--primary`), images pleine largeur, overlays
  sombres, cartes translucides, boutons contrastés.
- Le monde privé et administrateur est plus dense et analytique : fonds slate/ink,
  bordures discrètes, surfaces structurées, tableaux lisibles, accents fonctionnels.

Cette dualité correspond à deux usages distincts du produit : séduire et guider côté
public, piloter et éditer côté administration.

## Palette et tokens réellement utilisés

| Token / couleur                    | Valeur dans le code                 | Usage principal                                                                        |
| ---------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------- |
| `--primary`                        | `hsl(345 55% 32%)` (≈ `#7e253b`)    | Accent bordeaux : CTA, focus ring, liens d'action                                      |
| `--foreground`                     | `oklch(0.13 0.028 261.692)`         | Texte fort, surfaces techniques, contraste principal                                   |
| `--background` (`:root`)           | `oklch(1 0 0)`                      | Token clair par défaut                                                                 |
| `.wine-bordeaux --background`      | `oklch(0.98 0.02 30)` (crème)       | Token public ; teinte les contrôles `bg-background/*` (le `body` ne peint pas de fond) |
| `AppLayout` (fond public réel)     | `#2a1f16` + dégradés, halo bordeaux | Shell public : brun sombre réchauffé, texture, vignette                                |
| `AdminLayout` / `EmployeeLayout`   | `bg-[#070c14]`                      | Shell administrateur ink / bleu profond                                                |
| `--secondary`, `--muted`           | `oklch(0.967 0.003 264.542)`        | Texte secondaire, fonds neutres et respirations                                        |
| `--border`, `--input`              | `oklch(0.928 0.006 264.531)`        | Bordures et champs                                                                     |
| `amber-400`                        | classe Tailwind                     | Accent opératoire des formulaires admin                                                |
| `green-400`, `red-400`, `blue-400` | classes Tailwind                    | États, actions, feedbacks dans l'admin                                                 |

## Surfaces et profondeur

Les surfaces ne sont pas plates.

- `AppLayout.tsx` construit un fond complexe avec `repeating-linear-gradient`,
  `radial-gradient`, vignette et micro-noise SVG.
- `SectionSurface.tsx` ajoute une micro-texture diagonale, une ombre interne légère et une
  ombre portée profonde.
- Les cartes publiques utilisent souvent `bg-white/5`, `bg-white/10`, `bg-black/25`,
  `backdrop-blur-xl`, `border-white/10`.
- Les surfaces admin utilisent surtout `bg-slate-950`, `bg-slate-900`, `bg-white/[0.03]`,
  `border-white/10`, `shadow-xl`.

Le langage commun est donc : verre sombre, bordures fines, profondeur douce, contraste
lisible.

## Layouts structurants

Les layouts portent une partie essentielle de la charte.

- `AppLayout.tsx` : canevas public pleine hauteur, navbar sticky translucide, fond fixe
  texturé, paddings généreux.
- `UserLayout.tsx` : grille `260px + contenu`, sidebar sticky, séparation latérale
  discrète, logique de tableau de bord personnel.
- `AdminLayout.tsx` : shell plein écran, sidebar persistante, zone de travail scrollable,
  fond radial sombre orienté pilotage.

Les blocs principaux utilisent de manière récurrente `rounded-2xl`, les contrôles
`rounded-xl`, avec des espacements `p-6` ou `p-8` sur les surfaces importantes.

## Typographie et hiérarchie

Le système typographique repose sur trois familles variables, déclarées dans `index.css`
et chargées localement via `@fontsource-variable` (voir `frontend/package.json`). Chacune
est exposée à Tailwind sous forme de token et complétée par une pile de repli système.

- `Inter` (`--font-sans`, `@fontsource-variable/inter`, variable 100–900) : corps de texte
  et interface, appliqué sur `html` avec les fonctionnalités optiques d'Inter
  (`font-feature-settings: "cv02","cv03","cv04","cv11"`, `font-optical-sizing: auto`) et
  le tracking `-0.011em`. Choisi pour la lisibilité à l'écran et un ton d'interface
  neutre.
- `Cormorant Garamond` (`--font-display`, `@fontsource-variable/cormorant-garamond`,
  variable 300–700) : titres `h1`–`h4` en graisse 500, `leading-tight`, `tracking-tight`.
  Serif éditoriale qui soutient l'univers premium et gastronomique de la partie publique.
- `JetBrains Mono` (`--font-mono`, `@fontsource-variable/jetbrains-mono`, variable
  100–800) : code et éléments techniques (`code`, `kbd`, `samp`, `pre`), notamment
  l'aperçu du payload JSON d'ingestion.

L'échelle suit une Tierce Majeure (ratio 1.25) à partir de 16px, avec des interlignes
calées sur WCAG 1.4.12 (corps à 1.6). L'hébergement local des polices garde la maîtrise
des ressources, maintient le texte visible via `font-display: swap` et évite l'appel à un
service de polices externe.

La hiérarchie d'usage s'appuie sur ces familles :

- Titres publics : `font-display`, `leading-tight`, contrastes blancs sur fond sombre.
- Labels et intertitres : `uppercase`, `tracking-widest` ou `tracking-wide`.
- Textes secondaires : `text-white/60`, `text-white/80`, `text-muted-foreground`,
  `text-slate-400`.
- Tableaux et interfaces admin : petits corps lisibles, `text-xs uppercase tracking-wide`
  pour les en-têtes.

La personnalité visuelle naît de l'association serif-display (Cormorant Garamond) et sans
neutre (Inter), portée par le système de contraste, de rythme et de tracking.

## Mouvement et interaction

Le mouvement reste sobre et utile.

- `carousel-scroll` sur 60 secondes avec pause au survol.
- Désactivation prévue en `prefers-reduced-motion`.
- Hover discrets sur cartes et boutons : `hover:scale-[1.02]`, `hover:bg-white/10`,
  `hover:bg-blue-500/10`.
- Feedback focus via `focus:ring-primary/50`.

L'objectif n'est pas l'effet spectaculaire, mais une sensation de système premium,
contrôlé et lisible.

## Composants emblématiques

- `Home.tsx` : hero immersif, overlays noirs translucides, CTA primaire bordeaux, cartes
  vitrage clair.
- `AdminDataTable.tsx` : tables dark-slate, états lisibles, badges booléens colorés,
  densité maîtrisée.
- `ResourceFormDialog.tsx` : formulaires admin structurés, inputs dark avec accent amber
  au focus.
- `OrderPricingCard.tsx`, `OrderSidebar.tsx`, `SectionSurface.tsx` : vocabulaire commun
  des surfaces utilisateur.

## Lecture synthétique

La charte graphique de Vite et Gourmand ne repose pas sur un simple duo de couleurs. C'est
un système visuel à deux polarités.

- Public : chaleur, atmosphère, promesse premium, profondeur translucide.
- Admin : contraste, pilotage, surfaces sombres, lisibilité opérationnelle.

Cette charte est directement dérivée de `index.css`, `tailwind.config.js`, des layouts et
des composants principaux.
