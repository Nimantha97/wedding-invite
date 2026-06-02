"""
generate_links.py
─────────────────
Reads guests.csv (columns: name, slug) and prints personalised
wedding invitation URLs ready to copy-paste into WhatsApp / email.

Usage:
    python scripts/generate_links.py
    python scripts/generate_links.py --base https://mywedding.pages.dev
    python scripts/generate_links.py --out links.txt
"""

import csv
import argparse
from pathlib import Path

DEFAULT_BASE = "https://mywedding.pages.dev"
CSV_PATH     = Path(__file__).parent.parent / "guests.csv"


def load_guests(path: Path) -> list[dict]:
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def generate(base: str, guests: list[dict]) -> list[str]:
    lines = []
    for g in guests:
        name = g["name"].strip()
        slug = g["slug"].strip().lower()
        url  = f"{base.rstrip('/')}/?g={slug}"
        lines.append(f"{name:<30} → {url}")
    return lines


def main():
    parser = argparse.ArgumentParser(description="Generate personalised wedding invite links")
    parser.add_argument("--base", default=DEFAULT_BASE, help="Base URL of your deployed site")
    parser.add_argument("--out",  default=None,         help="Optional output file path")
    args = parser.parse_args()

    if not CSV_PATH.exists():
        print(f"❌  guests.csv not found at {CSV_PATH}")
        print("    Create it with columns: name, slug")
        print("    Example row: Priya Sharma, priya")
        return

    guests = load_guests(CSV_PATH)
    lines  = generate(args.base, guests)

    output = "\n".join(lines)
    print(f"\n{'─'*60}")
    print(f"  Wedding Invite Links ({len(guests)} guests)")
    print(f"{'─'*60}")
    print(output)
    print(f"{'─'*60}\n")

    if args.out:
        Path(args.out).write_text(output, encoding="utf-8")
        print(f"✅  Saved to {args.out}")


if __name__ == "__main__":
    main()
