# Handoff — Audit glass-ui (reprise dans un nouveau chat)

Branche : `audit/rest-props-subexports-tests`. Tout est commité, working tree propre.
Source de vérité du backlog : **`AUDIT.md`** à la racine.

## Méthode de travail (à reproduire)
Chaque chantier suit le même schéma :
1. **Explorer** le code pour cadrer un **contrat partagé précis** (sinon les agents divergent).
2. **Écrire un script de validation** dans `scripts/` AVANT de lancer les agents (c'est le livrable côté orchestrateur ; il attrape le risque spécifique du travail parallèle).
3. **Lancer N agents Sonnet en parallèle** (outil `Agent`, `model: sonnet`, `subagent_type: general-purpose`), **un périmètre borné disjoint par agent** (1 fichier/dossier chacun, jamais de fichier partagé en écriture). Leur dire : éditer SEULEMENT leur périmètre, NE PAS lancer build/typecheck/lint (validation séparée).
4. **Lancer le script de validation**, corriger les éventuels faux positifs/reliquats.
5. **Mettre à jour AUDIT.md** (2 occurrences par section : la détaillée en haut + le rappel en bas).
6. **Commiter**.

## Conventions impératives
- **JAMAIS de trailer `Co-Authored-By`** dans les commits (préférence user, cf. mémoire `no-coauthor-commits`).
- Commandes : `bun run typecheck` / `lint` / `build` / `test` / `demo:build`.
- `bun test` tourne avec `--conditions=browser` (déjà câblé).
- Si le lint échoue sur du format : `bunx biome check --write <fichiers>` puis relint.
- ⚠️ Le hook lint-staged au commit **ne couvre pas le CSS** ; toujours inclure `bun run lint` dans les scripts de validation qui touchent au CSS (le `validate-oklch.sh` l'avait omis → un reliquat de format a été rattrapé au #6).
- Biome wrappe les longues lignes ; les scripts de validation doivent lancer `lint`.

## Déjà fait dans cette session
- **#4** (constantes d'animation) — commit `5facd6d`. 41 littéraux transition→constantes, section `INTERACTIVE TRANSITIONS` dans `src/constants/animations.ts`.
- **#5** (OKLCH→vars CSS) — commit `7cb5a1e`. Palette `--glass-{light,dark,accent}-NN` (46 vars) dans `:root` de `global.css` ; 186 overlays migrés (glass 141 / buttons 24 / utilities 21) ; dédup miroir surface (`@theme` = source unique). Script : `scripts/validate-oklch.sh`. 4 agents.
- **#6** (callbacks overlay) — commit `fece7a7`. `onOpenChange` canonique ; Modal/Drawer/Window adoptent `onOpenChange?` + `onClose?` `@deprecated` (optionnel, non-breaking) ; helper `requestClose()` déclenche les deux. Dialog/Sheet inchangés. Script : `scripts/validate-overlay-callbacks.sh`. 3 agents.

## ⏭️ PROCHAIN : chantier #7 — Incohérences d'API (EN COURS, pas démarré)
Trois sous-sujets de natures différentes. **Recommandation : découper ainsi.**

### 7a. `loading` sur Select, Input, DatePicker (mécanique — pattern établi)
Pattern de référence à RÉPLIQUER (déjà investigué) :
- **Button** (`src/components/Button/Button.tsx`) : `splitProps` clé `'loading'` ; `disabled={local.disabled || local.loading}` ; `aria-busy={local.loading || undefined}` ; `<Show when={local.loading}><Spinner .../></Show>`.
- **Autocomplete** (`Autocomplete.tsx:480`) : `import { Spinner } from '../Spinner'` ; `<Spinner size="sm" />` affiché dans l'adornment de fin quand `local.loading`, masque les autres icônes (`<Show when={!local.loading && ...}>`).
- **Spinner** existe : `src/components/Spinner/`.
- Contrat : ajouter `loading?: boolean` dans chaque `types.ts` (avec JSDoc) ; afficher un `<Spinner size="sm">` dans la zone d'icône de fin du champ, masquer l'icône native (chevron/calendrier) quand `loading`. Ne PAS forcément désactiver l'input (à trancher — Button désactive ; pour un champ de saisie, plutôt garder éditable mais c'est un choix → défaut : afficher le spinner sans bloquer la saisie, comme Autocomplete).
- 1 agent par composant (Select / Input / DatePicker). Périmètres disjoints.

### 7b. `size` sur FileUpload, Collapsible, Accordion (feature/design — moins mécanique)
- `ComponentSize = 'sm' | 'md' | 'lg'` (`src/types/index.ts:42`). Défaut `'md'`.
- Pattern siblings : objet lookup `Record<ComponentSize, string>` mappant vers des classes Tailwind (padding/text/icon), `const size = () => props.size ?? 'md'`.
- **Point de design à trancher avec le user** : quelles dimensions varient pour chacun (FileUpload = padding du dropzone + tailles texte/icône ; Accordion = padding header + texte ; Collapsible = padding trigger). C'est le sous-sujet le moins « mécanique » → soit définir des échelles raisonnables en miroir d'un sibling, soit demander au user avant.
- 1 agent par composant.

### 7c. JSDoc sur les interfaces `types.ts` (mécanique, large sweep — sûr)
- Beaucoup de `types.ts` sans JSDoc sur les props (Button, Badge, etc.). Ajouter un `/** ... */` par prop publique.
- ARIA déjà exposée partout (chantier rest props #1) — ne pas y retoucher.
- Découpe possible : 1 agent par lot de N composants (ex. 4-5 agents se répartissant `src/components/*/types.ts`). Risque faible (purement additif, commentaires).
- ⚠️ JSDoc multi-lignes peut déclencher du reformatage biome → inclure `lint` dans la validation.

### Script de validation #7 à écrire (`scripts/validate-api-consistency.sh`)
Checks suggérés :
- 7a : chaque `Select/Input/DatePicker/types.ts` contient `loading?:` ; chaque composant importe `Spinner` et référence `local.loading`/`props.loading`.
- 7b : chaque `FileUpload/Collapsible/Accordion/types.ts` contient `size?:` ; composant a un lookup de tailles + défaut `'md'`.
- 7c : (optionnel) ratio de props commentées, ou juste que le build/lint passent.
- Toujours : `typecheck` + `lint` + `build` + `demo:build`.
- **Règle CLAUDE.md** : tout nouveau prop visible doit être démontré dans la page démo correspondante (`demo/src/pages/`) — vérifier/ajouter (sinon viole la convention « tout composant exporté a une page démo à jour »). Penser à faire mettre à jour les pages démo (size/loading) par les agents ou en suivi.

## Reste de l'audit après #7
- **#3** Tests composants (DOM) — gros chantier : installer `@happy-dom/global-registrator` + preload `bunfig.toml` + `@solidjs/testing-library`, puis tester `useFocusTrap`/`useDialogState`, nav clavier, formulaires.
- **#8** Régénérer `llm.txt` (outil de génération requis).
- **#9** CI : job `npm pack` + install du tarball dans une app minimale.
- **#10** `Sheet.tsx` checks défensifs drag après unmount (faible prio).

## Note
Les `scripts/validate-*.sh` sont commités dans le repo (outils de repro). Décider si on les garde à terme ou si on les déplace/supprime avant un éventuel merge vers `master`.
