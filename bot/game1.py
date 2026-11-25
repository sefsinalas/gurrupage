#!/usr/bin/env python3
"""Prepare and publish the shared game from a verified WhatsApp session."""

import fcntl
import io
import json
import os
import secrets
import shutil
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

from dulwich import porcelain
from dulwich.repo import Repo


HOME = Path.home()
REPOS = HOME / ".zeroclaw/agents/assistant/workspace/projects/game1"
PUBLIC_REMOTE = "https://github.com/sefsinalas/gurrupage.git"
SSH_REMOTE = "git@github.com:sefsinalas/gurrupage.git"
SSH_KEY = HOME / ".ssh/gurrupage_bot_ed25519"
ALLOWED_EXTENSIONS = {".html", ".css", ".js", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".ogg", ".mp3", ".wav"}


def sender_repo():
    session = os.environ.get("ZEROCLAW_SESSION_ID", "")
    sender = session.rsplit("_", 1)[-1]
    if not session.startswith("whatsapp_personal_") or not sender.isdigit():
        raise ValueError("Esta capacidad solo acepta remitentes verificados de WhatsApp.")
    return REPOS / sender


def changed_paths(repo):
    status = porcelain.status(str(repo))
    paths = {p for group in status.staged.values() for p in group}
    paths.update(status.unstaged)
    paths.update(status.untracked)
    return {p.decode("utf-8") if isinstance(p, bytes) else p for p in paths}


def branch(repo):
    ref = Repo(str(repo)).refs.read_ref(b"HEAD")
    if isinstance(ref, bytes) and ref.startswith(b"refs/heads/"):
        return ref.removeprefix(b"refs/heads/").decode("ascii")
    return ""


def pr_state(name):
    query = urllib.parse.urlencode({"state": "all", "head": f"sefsinalas:{name}"})
    request = urllib.request.Request(
        f"https://api.github.com/repos/sefsinalas/gurrupage/pulls?{query}",
        headers={"Accept": "application/vnd.github+json", "User-Agent": "gurrupage-game1-bot"},
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        pulls = json.load(response)
    for pull in pulls:
        if pull.get("head", {}).get("ref") == name:
            return "merged" if pull.get("merged_at") else pull.get("state", "unknown")
    return "missing"


def validate(repo):
    changed = changed_paths(repo)
    if not changed or any(not p.startswith("public/juego1/") for p in changed):
        raise ValueError("Solo se pueden publicar cambios dentro de public/juego1/.")
    root = repo / "public/juego1"
    if not (root / "index.html").is_file():
        raise ValueError("El juego debe conservar index.html.")
    files = 0
    total = 0
    for path in root.rglob("*"):
        if path.is_symlink():
            raise ValueError("No se permiten enlaces simbólicos.")
        if path.is_file():
            files += 1
            total += path.stat().st_size
            if path.suffix.lower() not in ALLOWED_EXTENSIONS:
                raise ValueError(f"Tipo de archivo no permitido: {path.name}")
    if files > 100 or total > 20_000_000:
        raise ValueError("El juego supera el límite técnico de archivos o tamaño.")


def context(repo):
    if repo.exists():
        if changed_paths(repo):
            print(json.dumps({"editable_directory": str(repo / "public/juego1"), "state": "unpublished_changes"}))
            return
        previous = branch(repo)
        if previous.startswith("game1/") and pr_state(previous) != "merged":
            raise ValueError("La actualización anterior todavía está en validación.")
        shutil.rmtree(repo)
    repo.parent.mkdir(parents=True, exist_ok=True)
    porcelain.clone(PUBLIC_REMOTE, str(repo), branch="main", depth=1, errstream=io.BytesIO())
    print(json.dumps({"editable_directory": str(repo / "public/juego1"), "public_url": "https://gurruboys.com.ar/juego1"}))


def publish(repo):
    if not repo.is_dir():
        raise ValueError("Primero prepará el juego con game1__context.")
    validate(repo)
    name = f"game1/{int(time.time())}-{secrets.token_hex(3)}"
    ref = f"refs/heads/{name}".encode("ascii")
    git = Repo(str(repo))
    git.refs[ref] = git.head()
    git.refs.set_symbolic_ref(b"HEAD", ref)
    porcelain.add(str(repo), paths=["public/juego1"])
    validate(repo)
    porcelain.commit(str(repo), message=b"Update community game", author=b"Fede Bot <bot@gurruboys.local>", committer=b"Fede Bot <bot@gurruboys.local>")
    porcelain.push(
        str(repo), SSH_REMOTE, refspecs=[f"refs/heads/{name}:refs/heads/{name}"],
        ssh_command=f"ssh -i {SSH_KEY} -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes",
    )
    print(f"Cambio enviado para validación automática en la rama {name}. URL del juego: https://gurruboys.com.ar/juego1")


def main():
    if len(sys.argv) != 2 or sys.argv[1] not in {"context", "publish"}:
        raise ValueError("Uso: game1.py context|publish")
    repo = sender_repo()
    if sys.argv[1] == "context":
        context(repo)
    else:
        lock_path = HOME / ".local/state/gurrupage-game1.lock"
        lock_path.parent.mkdir(parents=True, exist_ok=True)
        with lock_path.open("w") as lock:
            fcntl.flock(lock, fcntl.LOCK_EX)
            publish(repo)


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError) as exc:
        print(str(exc), file=sys.stderr)
        raise SystemExit(2)
