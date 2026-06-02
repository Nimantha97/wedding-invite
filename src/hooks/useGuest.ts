import { useEffect, useState } from "react";
import { fetchGuests } from "../lib/api";
import type { Guest } from "../types/guest";

export function useGuest(): string {
  const [name, setName] = useState("Dear Friend");

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("g");
    if (!slug) return;

    fetchGuests()
      .then((guests: Guest[]) => {
        const match = guests.find((g) => g.slug === slug.toLowerCase());
        if (match) setName(match.name);
      })
      .catch(() => {
        // Fallback to static guests.json
        fetch("/guests.json")
          .then((r) => r.json())
          .then((guests: Guest[]) => {
            const match = guests.find((g) => g.slug === slug.toLowerCase());
            if (match) setName(match.name);
          })
          .catch(() => {});
      });
  }, []);

  return name;
}
