# Read this before you touch anything

Short on purpose. If you skip it you will eventually ship the wrong file.

## The one rule that matters

**This repo is a mirror. It is not the truth.**

| Path | What it is |
|---|---|
| `~/Desktop/2 | Ayvede/ayvede-v2.jsx` | **The truth.** The working source. This is what gets edited. |
| `src/ayvede-v2.jsx` (here) | **A mirror of it.** Archive and reproducibility proof. |

The path to the working source contains a space and a pipe character. Always quote it.

**Before any build you intend to publish, confirm the two are byte-identical:**

```bash
shasum -a 256 "/Users/anthony/Desktop/2 | Ayvede/ayvede-v2.jsx" src/ayvede-v2.jsx
```

Two identical hashes, or stop. **Never build from a repo copy that has not been synced.**
If they differ, decide which one is correct, sync in that direction deliberately, and
only then build. A stale mirror is how a wrong-file build happens, and it is the exact
failure this repo exists to prevent: the repo sat on v4 while v5 and v6 were live.

To sync mirror from truth:

```bash
cp "/Users/anthony/Desktop/2 | Ayvede/ayvede-v2.jsx" src/ayvede-v2.jsx
cp "/Users/anthony/Desktop/2 | Ayvede/site-build/insights-data.js" build/insights-data.js
```

`insights-data.js` drifts too whenever new briefings are pulled. Check it as well.

## The deploy sequence

Full detail is in [DEPLOY.md](DEPLOY.md). The shape, every time, no exceptions:

1. **Capture the rollback URL first.** Read the current live bundle src before changing
   anything, and hand it to the owner.
2. Sync the mirror, edit the source, `npm run build`.
3. Serve `dist/` locally and verify. **Then stop.**
4. **The owner reviews the local preview and explicitly approves.** This gate is
   mandatory. Nothing goes live without it.
5. The owner uploads the new `dist/ayvede-app-vN.txt` to the Wix Media Manager on the
   live site **Ayvede** (`1c0b108a-cd0e-49f0-b492-4a18b882430a`), not **Ayvede Copy**,
   and returns the URL. That upload is a native file dialog no agent can drive.
6. Verify the uploaded bytes hash-match the local build, then swap **only** the third
   script src in the BODY_END embed. The two React script tags and the entire HEAD
   embed stay byte-identical.
7. Publish, then hard-fetch both `ayvede.com` and `www.ayvede.com` with a cache-buster
   and verify.
8. **Update the CHANGELOG and push to GitHub.** The repo must never fall behind live
   again.

## Rollback

One paste. Repoint that same third script src to the previous bundle URL, apply, and
hard-fetch to confirm.

**Current live: v6.** Rollback target is v5:

```
https://ffe7597e-b66e-40a7-aad2-50f680f4c11a.usrfiles.com/ugd/ffe759_0dfab2b190c44cc5aaff3eab005604e5.txt
```

Every version's URL and hash is in [CHANGELOG.md](CHANGELOG.md). Keep it that way, so
any version is one paste away.

## Credentials

The GitHub credential lives in the macOS keychain. **Never write a token into a file, a
script, `.git/config`, or the remote URL.** The remote stays credential-free:
`https://github.com/anthonydellapia1117/ayvede-site.git`.

## Verifying you did not break reproducibility

```bash
./scripts/verify-build.sh
```

Builds from the tracked inputs and checks the result against the CHANGELOG entry marked
LIVE. CI runs the same script on every push. See [DEPLOY.md](DEPLOY.md) for what a
failure means.
