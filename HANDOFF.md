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
- **#7** (incohérences d'API) — voir commit ci-dessous. **8 agents Sonnet parallèles** (périmètres disjoints, aucun fichier partagé). 7a `loading` sur Input/Select/DatePicker (Spinner `size="sm"` en zone d'icône de fin, champ éditable, `aria-busy`) ; 7b `size` sur FileUpload + Accordion+AccordionPanel (lookups `Record<ComponentSize,...>`, **md = rendu actuel au pixel près**) ; **Collapsible skippé volontairement** (trigger 100 % consommateur, aucune chrome lib à scaler) ; 7c sweep JSDoc des types.ts sous-documentés (Toast, Chat, JsonViewer/JsonSchemaForm, virtual, ContextMenu, GlassBackground). Pages démo à jour. Script : `scripts/validate-api-consistency.sh`. ⚠️ JSDoc/lignes longues ont déclenché du reformatage biome → rattrapé par `bunx biome check --write` (risque connu, le lint est dans le script).

## ⏭️ PROCHAIN : chantier #3 — Tests composants (DOM)
Gros chantier de mise en place :
- Installer `@happy-dom/global-registrator` (devDep) + preload `bunfig.toml` (`[test] preload`) + `@solidjs/testing-library`.
- `bun test` tourne déjà avec `--conditions=browser` (câblé). Cibles : `useFocusTrap`, `useDialogState` (manipulent `document`/focus/scroll-lock), nav clavier d'Autocomplete/Menu/RadioGroup/Tabs, rendu+interactions des composants de formulaire (soumission native, ARIA).
- Pas de parallélisation évidente au début (mise en place commune) — faire le socle d'abord, puis éventuellement fan-out les fichiers de test par composant.

## Reste de l'audit après #3
- **#3 (rappel)** Tests composants (DOM) — voir ci-dessus.
- **#8** Régénérer `llm.txt` (outil de génération requis).
- **#9** CI : job `npm pack` + install du tarball dans une app minimale.
- **#10** `Sheet.tsx` checks défensifs drag après unmount (faible prio).

## Note
Les `scripts/validate-*.sh` sont commités dans le repo (outils de repro). Décider si on les garde à terme ou si on les déplace/supprime avant un éventuel merge vers `master`.
