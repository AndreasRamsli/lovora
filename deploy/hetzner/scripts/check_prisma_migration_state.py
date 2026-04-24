#!/usr/bin/env python3
"""Fail deploy preflight when the persisted Prisma SQLite state is unsafe."""

from __future__ import annotations

import argparse
import sqlite3
import sys
from pathlib import Path


CRITICAL_WORKSPACE_USERS_INDEX = "workspace_users_user_id_workspace_id_key"


def table_exists(connection: sqlite3.Connection, table_name: str) -> bool:
    row = connection.execute(
        "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ? LIMIT 1",
        (table_name,),
    ).fetchone()
    return row is not None


def failed_migrations(connection: sqlite3.Connection) -> list[tuple[str, str | None]]:
    if not table_exists(connection, "_prisma_migrations"):
        return []

    return connection.execute(
        """
        SELECT migration_name, logs
        FROM _prisma_migrations
        WHERE finished_at IS NULL
          AND rolled_back_at IS NULL
        ORDER BY started_at
        """
    ).fetchall()


def has_workspace_users_unique_index(connection: sqlite3.Connection) -> bool:
    if not table_exists(connection, "workspace_users"):
        return True

    indexes = connection.execute('PRAGMA index_list("workspace_users")').fetchall()
    return any(row[1] == CRITICAL_WORKSPACE_USERS_INDEX for row in indexes)


def check_database(db_path: Path) -> list[str]:
    if not db_path.exists():
        return []

    errors: list[str] = []
    connection = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True)
    try:
        for migration_name, logs in failed_migrations(connection):
            detail = f": {logs.strip()}" if logs else ""
            errors.append(f"failed Prisma migration {migration_name}{detail}")

        if not has_workspace_users_unique_index(connection):
            errors.append(
                "missing unique index "
                f"{CRITICAL_WORKSPACE_USERS_INDEX} on workspace_users(user_id, workspace_id)"
            )
    finally:
        connection.close()

    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("db_path", type=Path)
    args = parser.parse_args()

    errors = check_database(args.db_path)
    if errors:
        print(f"Unsafe Prisma state in {args.db_path}:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
