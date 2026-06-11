# Audit glass-ui-solid — état au 2026-06-11

Audit complet du projet (structure, bugs, packaging, API des composants).
Ce fichier liste ce qui a été corrigé et **ce qu'il reste à faire**, avec assez de
détail pour reprendre chaque chantier sans re-auditer.

## ✅ Corrigé (sessions de juin 2026)

- **Timers sans cleanup** : `Toast.tsx`, `Autocomplete.tsx` (blur), `SnackbarContainer.tsx`
  — timers stockés + `onCleanup(() => clearTimeout(...))`.
- **`console.log` de debug + try/catch avaleur d'erreurs** retirés de `DateRangePicker.tsx`.
- **package.json** : `sideEffects` corrigé, export `"./package.json"` ajouté.
- **Poids du package** : sourcemaps + declaration maps désactivés (`vite.config.ts`,
  `tsconfig.json`) — dist passé de ~4,4 Mo à ~2 Mo.
- **CI** : `.github/workflows/ci.yml` (typecheck + lint + test + build sur push/PR).
- **Tests** : `createNotificationStore.test.ts` (9 tests), `useControlled.test.ts` (4 tests).
  ⚠️ `bun test` doit tourner avec `--conditions=browser` (sinon solid-js charge le build
  serveur non réactif) — déjà câblé dans le script `test`.
- **Factorisation `FormFieldProps`** : NumberInput, Autocomplete, DatePicker,
  DateRangePicker, Slider, FileUpload étendent `FormFieldProps` ; `required` câblé
  partout (astérisque + ARIA), inputs cachés pour DatePicker/DateRangePicker (`name`
  était un prop mort), FileUpload synchronise `input.files` via `DataTransfer`
  (soumission de formulaire native fonctionnelle, y compris drag & drop).
- **Mode non contrôlé (`defaultValue`/`defaultChecked`)** sur les 12 composants de
  formulaire via `useControlled` : Input, Textarea, Select, Checkbox, Switch, Slider,
  NumberInput, RadioGroup, SegmentedControl, DatePicker, DateRangePicker, Autocomplete.
  Zéro breaking change (`value`/`onChange` passés de requis à optionnels).
- **Spread des rest props (chantier #1, ~47 composants)** : chaque composant propage
  désormais les attributs HTML arbitraires (`data-*`, `aria-*`, `id`, `data-testid`)
  vers son élément racine (ou le contrôle interne pour les champs de formulaire) via
  `splitProps` + `{...rest}`.
  - **Pattern** : les types étendent `JSX.HTMLAttributes<HTMLXxxElement>` (qui fournit
    déjà `class`/`style` — on ne peut PAS étendre `BaseComponentProps` en plus, son
    `style` étant plus étroit), en `Omit`-ant les props redéfinies avec une forme
    différente (`onChange`, `onInput`, `onSelect`, `value`, `size`, `title`, `ref`…).
    `{...rest}` est toujours le 1er attribut (les attributs explicites gagnent), `ref`
    flue via le spread.
  - **Formulaires** : nouveau type `FormFieldSemanticProps` (`label`/`error`) combiné
    aux attributs natifs du contrôle ; `{...rest}` posé sur l'`input`/`select`/`textarea`
    (ou le wrapper `<div>` pour les widgets custom : Slider, RadioGroup, DatePicker…).
  - **Skippés volontairement (pas de root DOM stable unique)** : Sidebar (Fragment
    desktop `<aside>` | portal mobile), JsonSchemaForm (Fragment), VirtualList/VirtualTable
    (root = composant `Scroller` injectable, pas un élément DOM). Toast/Snackbar non
    traités (API impérative `toast.success()`, le consommateur ne rend pas l'élément).
  - **Menu/Dropdown** : forwardent `{...rest}` à `<Popover>` (lui-même rest-props-aware).
  - Validé : `typecheck` + `lint` + `build` + `test` (13) + `demo:build` au vert.

- **Isoler les dépendances lourdes (chantier #2)** : sous-exports dédiés ajoutés —
  `glass-ui-solid/code` (CodeBlock, n'embarque que prismjs+dompurify) et
  `glass-ui-solid/markdown` (Markdown, n'embarque que marked+dompurify). Isolation
  vérifiée sur le dist. **Approche douce retenue (zéro breaking)** : les composants
  restent aussi exportés depuis l'entrée principale — l'option « retrait du main » de
  l'audit était contre-productive car `Chat` importe `Markdown` (les deps resteraient
  dans le graphe du main tant que Chat y est).
  - `vite.config.ts` : entrées multiples (`index` + barrels CodeBlock/Markdown) pour que
    `preserveModules` émette de vrais `index.js` au lieu de les inliner.
  - Deps gardées en `dependencies` (et non `optionalDependencies` : elles sont
    réellement requises par ces composants ; le tree-shaking + sous-exports gèrent le poids).
  - **Bonus livré** : API d'enregistrement de langages Prism (`registerPrismLanguage`,
    instance `Prism` exposée) dans `src/components/CodeBlock/prism.ts`, exportée depuis
    l'entrée principale ET `glass-ui-solid/code`. La liste figée (bash/json/ts/jsx/tsx)
    n'est plus une limite dure.

---

## 🔴 Restant — priorité haute

### 3. Couverture de tests des composants
**Fait (chantier #3, sans DOM)** — 43 tests au vert (13 → 43) :
- Utilitaires purs extraits + testés : `clampValue` (`NumberInput/utils.ts`),
  `formatDate` (`DatePicker/utils.ts`, **dédupliqué** : était copié dans DatePicker
  ET DateRangePicker), `defaultFilterFn` (`Autocomplete/utils.ts`).
- Hooks réactifs (testés via `createRoot`, sans DOM) : `useDisclosure`,
  `useAnimationState` (effet + timer, flush microtask).

**Restant** (nécessite un DOM — `happy-dom` + `@solidjs/testing-library`, non encore
installés ; `bun test` tourne déjà avec `--conditions=browser`) :
- `useFocusTrap`, `useDialogState` (manipulent `document`/focus/scroll-lock).
- Navigation clavier d'`Autocomplete`/`Menu`/`RadioGroup`/`Tabs` au niveau composant.
- Rendu + interactions des composants de formulaire (soumission native, ARIA).
- Mise en place : ajouter `@happy-dom/global-registrator` en devDep + un fichier de
  preload (`bunfig.toml` → `[test] preload`), puis `render()` de `@solidjs/testing-library`.

---

## 🟡 Restant — priorité moyenne

### 4. Constantes d'animation non adoptées
**Fait (chantier #4)** — 0 occurrence hardcodée restante (`grep -rn "duration-\|ease-"
src/components --include="*.tsx"` → vide) :
- Nouvelle section « INTERACTIVE TRANSITIONS » dans `src/constants/animations.ts` :
  `TRANSITION_ALL` / `_FAST` / `_SLOW` (ease-out) / `_SLOW_INOUT`, `TRANSITION_INDICATOR`
  (slide d'indicateur, duration-300 sans easing), `TRANSITION_COLORS` / `_FAST` / `_SLOW`,
  `TRANSITION_TRANSFORM` / `_FAST`, `TRANSITION_HEIGHT_SLOW` (Sheet). Ajout aussi de
  `WINDOW_EXIT` (minimize) côté composites.
- 41 occurrences remplacées dans 23 composants ; réutilisation des composites existants
  quand la chaîne matchait à l'identique (`ACCORDION_CONTENT_ENTER`, `TAB_PANEL_ENTER`,
  `POPOVER_ENTER`). Chaînes exactes préservées (pas de changement de rendu) — c'est une
  centralisation pure, pré-requis du theming runtime.
- Validé : `typecheck` + `lint` + `build` + `test` (43) + `demo:build` au vert.

### 5. Couleurs OKLCH en dur dans les CSS
~360 occurrences de `oklch(...)` répétées dans `src/styles/glass.css`, `buttons.css`,
`utilities.css` (focus ring, bordures dark...). Empêche le theming runtime.
- Extraire en variables sémantiques dans `:root`/`@theme` : `--color-focus-ring`,
  `--color-border-glass-dark`, etc.
- Dédupliquer aussi : tokens définis à la fois dans `:root` de `global.css` (l.80-92)
  et dans le bloc `@theme` (l.19-53) — choisir une seule source de vérité.

### 6. Harmoniser les callbacks d'overlay
`Dialog` utilise `onOpenChange(boolean)`, `Modal`/`Drawer` utilisent `onClose()`.
Choisir un pattern (recommandé : supporter les deux pendant une version, déprécier).

### 7. Incohérences d'API restantes
- `size` manquant sur FileUpload, Collapsible, Accordion (présent sur leurs siblings).
- `loading` seulement sur Button/Autocomplete — utile sur Select, Input, DatePicker.
- Props ARIA (`aria-label`, `aria-describedby`) non exposées dans la plupart des types
  (réglé automatiquement par le chantier rest props #1).
- JSDoc absent sur la plupart des interfaces de `types.ts` (Button, Badge...).

---

## 🟢 Restant — mineur

### 8. Démo et docs
- ✅ Page démo `GlassBackground` créée (`demo/src/pages/styles/GlassBackground.tsx`,
  routée + ajoutée à la nav) — règle CLAUDE.md respectée.
- ✅ README : Chat, Window, Sidebar, Stepper, Collapsible ajoutés + note sur les
  sous-exports `glass-ui-solid/code` et `/markdown`.
- ⏳ `llm.txt` (32 Ko) : à régénérer pour refléter FormFieldProps, defaultValue, rest
  props, sous-exports. (Nécessite l'outil de génération — non fait.)

### 9. Packaging (finitions)
- ✅ `engines` (`node >= 18`) ajouté.
- ✅ Champ `main` supprimé (ESM-only ; `module` + `exports` suffisent).
- ✅ `cssCodeSplit: false` : un seul `dist/styles.css`. **Bug corrigé au passage** : le
  CSS scopé de GlassBackground partait dans un `styles2.css` non référencé par l'exports
  map → les consommateurs perdaient ces styles. Désormais tout est dans `styles.css`.
- ⏳ CI : job `npm pack` + install du tarball dans une app minimale (vérif exports map +
  tree-shaking réel) — non fait.

### 10. Edge cases relevés par l'audit (non bloquants, à vérifier)
- ✅ `Autocomplete` : `aria-activedescendant` borné (`focusedIndex` validé `>= 0` ET
  `< focusableOptions().length`) pour ne jamais pointer vers un id inexistant.
- ✅ `Markdown.tsx` : l'effet d'injection track désormais `html()` (réinjection à chaque
  changement de contenu, pas seulement d'actions) et la manipulation DOM est déférée en
  microtask (l'ordre de création des effets faisait que le binding `innerHTML` s'appliquait
  après — les wrappers n'existaient pas encore).
- ⏳ `Sheet.tsx` : checks défensifs sur les handlers de drag après unmount — non fait
  (fenêtre très étroite, faible priorité).

---

## 🟡 Restant — priorité moyenne (non démarré)

### ~~4. Constantes d'animation non adoptées~~ — ✅ fait (voir chantier #4 plus haut)

### 5. Couleurs OKLCH en dur dans les CSS
~360 occurrences de `oklch(...)` dans `glass.css`, `buttons.css`, `utilities.css`.
Extraire en variables sémantiques (`--color-focus-ring`...) et dédupliquer les tokens
définis à la fois dans `:root` de `global.css` et dans `@theme`.

### 6. Harmoniser les callbacks d'overlay
`Dialog` utilise `onOpenChange(boolean)`, `Modal`/`Drawer` utilisent `onClose()`.
Supporter les deux pendant une version, déprécier.

### 7. Incohérences d'API restantes (feature work, pas quick win)
- `size` manquant sur FileUpload, Collapsible, Accordion (nécessite de designer les
  variantes de taille — pas mécanique).
- `loading` sur Select, Input, DatePicker (ajout d'UI).
- ✅ Props ARIA désormais exposées partout (réglé par le chantier rest props #1).
- JSDoc absent sur la plupart des interfaces de `types.ts`.

---

## Notes de reprise

- Commandes : `bun run typecheck` / `lint` / `test` / `build`, `bun run demo:build`
  pour valider la compat consommateur.
- Le formateur Biome casse parfois les lignes longues : lancer
  `bunx biome check --write .` avant le lint en cas d'échec format.
- État commité : voir l'historique git (un commit global regroupant chantiers #1, #2, #3
  + quick wins #8/#9/#10).
