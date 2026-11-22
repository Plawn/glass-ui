# Releasing

Releases are published by GitHub Actions (`.github/workflows/release.yml`)
when a `vX.Y.Z` tag is pushed. Nobody runs `npm publish` by hand.

## Release lines

| Line | Branch | Solid | npm dist-tag | Install |
|---|---|---|---|---|
| Current | `master` | 2.x | `latest` | `glass-ui-solid` |
| Maintenance | `release/0.7.x` | 1.x | `solid1` | `glass-ui-solid@solid1` |
| Prerelease | any | — | `next` | `glass-ui-solid@next` |

The dist-tag is picked by the workflow:

1. a prerelease version (`X.Y.Z-rc.1`) goes to `next`;
2. otherwise `publishConfig.tag` in `package.json` is used when set
   (`release/0.7.x` sets `solid1`);
3. otherwise `latest`.

A version older than the current `latest` with no `publishConfig.tag` is
rejected, so a maintenance release can never take over `latest`.

## One-time setup

On npmjs.com, package settings → **Trusted Publisher** → GitHub Actions:

- Organization or user: `Plawn`
- Repository: `glass-ui`
- Workflow filename: `release.yml`

The workflow authenticates with OIDC; no npm token is stored in the
repository.

## Cutting a release

From the branch of the line being released (`master`, or `release/0.7.x`
for a Solid 1 fix):

1. Make sure the branch is green: `bun run typecheck && bun run lint && bun run test && bun run build`.
2. Bump the version in `package.json` and in the `Package:` line of `llm.txt`.
3. Add a `## X.Y.Z` section at the top of `CHANGELOG.md`. Its content becomes
   the GitHub release notes. Breaking changes need migration notes.
4. Commit (`chore: release X.Y.Z`, or fold the bump into the last commit).
5. Tag and push:

   ```bash
   git tag vX.Y.Z
   git push origin <branch> vX.Y.Z
   ```

The workflow then checks that the tag, `package.json` and the changelog
heading agree, runs typecheck, lint, tests and build, publishes to npm with
provenance and creates the GitHub release.

### Backporting a fix to 0.7

```bash
git switch release/0.7.x
git cherry-pick <sha-on-master>
bun install          # dependencies differ between lines (Solid 1 vs Solid 2)
```

Then follow the steps above with a `0.7.N` version. Run `bun install` again
after switching back to `master`.

### Prereleases

Use a version such as `0.9.0-rc.1` and tag `v0.9.0-rc.1`. It is published
under `next` and marked as a prerelease on GitHub; `latest` is untouched.

## After the release

```bash
npm view glass-ui-solid dist-tags
```

Check that `latest` and `solid1` point at the expected versions, that the
GitHub release exists, and that the demo deployed (pushes to `master` trigger
`deploy-demo.yml`).

## When something goes wrong

| Symptom | Fix |
|---|---|
| "Tag … does not match package.json version" or "no `## X.Y.Z` section" | Nothing was published. Fix the files, commit, move the tag: `git tag -f vX.Y.Z && git push -f origin vX.Y.Z`. |
| A check (typecheck, lint, test, build) fails | Nothing was published. Fix, commit, move the tag as above. |
| "… is older than latest" | The maintenance branch is missing `publishConfig.tag`. Add it, commit, move the tag. |
| Publish fails with an authentication error | The trusted publisher is not configured, or the workflow file was renamed. Fix the npm setting and re-run the job. |
| npm publish succeeded but the GitHub release step failed | Re-run the job: the publish step is skipped when the version already exists on npm. |
| Wrong dist-tag on npm | `npm dist-tag add glass-ui-solid@X.Y.Z <tag>` (and `npm dist-tag rm` for a stray one). |
| A broken version was published | A version can never be republished. Ship `X.Y.Z+1` with the fix and run `npm deprecate glass-ui-solid@X.Y.Z "<reason>"`. |

Only move a tag when nothing was published for it.

## Manual fallback

If GitHub Actions is unavailable:

```bash
git switch <branch> && bun install
bun run typecheck && bun run lint && bun run test
bun run build
npm publish --tag <latest|solid1|next>
git tag vX.Y.Z && git push origin <branch> vX.Y.Z
gh release create vX.Y.Z --title vX.Y.Z --notes "<changelog section>"
```

Pushing the tag afterwards is safe: the workflow sees the version on npm,
skips the publish and only creates the GitHub release if it is missing.
