#!/usr/bin/env bash
# Schreibt den Issue-Text und die vertrauenswürdigen Kommentare nach .claude-kontext/.
# Vertrauenswürdig sind nur der Projektinhaber, claude[bot] und github-actions[bot]
# (CLAUDE.md, Regel 11). Fremde Kommentare gelangen so nie in den Lauf.
set -euo pipefail

: "${GH_TOKEN:?}" "${REPO:?}" "${NUM:?}" "${OWNER:?}"

mkdir -p .claude-kontext

gh api "repos/${REPO}/issues/${NUM}" >.claude-kontext/issue-roh.json
AUTOR=$(jq -r '.user.login' .claude-kontext/issue-roh.json)
if [ "${AUTOR}" != "${OWNER}" ] && [ "${AUTOR}" != "claude[bot]" ] && [ "${AUTOR}" != "github-actions[bot]" ]; then
  echo "Issue #${NUM} stammt von ${AUTOR}, nicht vom Projektinhaber. Abbruch."
  exit 1
fi

jq '{nummer: .number, titel: .title, autor: .user.login, labels: [.labels[].name], text: .body}' \
  .claude-kontext/issue-roh.json >.claude-kontext/issue.json
rm .claude-kontext/issue-roh.json

FILTER=".[] | select(.user.login == \"${OWNER}\" or .user.login == \"claude[bot]\" or .user.login == \"github-actions[bot]\") | {id, autor: .user.login, erstellt: .created_at, text: .body}"
gh api --paginate "repos/${REPO}/issues/${NUM}/comments" --jq "${FILTER}" >.claude-kontext/kommentare.jsonl

echo "Kontext geschrieben: $(wc -l <.claude-kontext/kommentare.jsonl) vertrauenswürdige Kommentare."
