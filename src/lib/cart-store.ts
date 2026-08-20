/* ---------------------------------------------------------------------------
   Cosul de cumparaturi — stare de client, fara backend.

   Este un store extern citit cu `useSyncExternalStore`, ca `ThemeToggle`, nu
   `useState` intr-un `useEffect` (pe care configul de lint il respinge).

   Se retine DOAR slug + cantitate, niciodata pretul: pretul traieste in
   `shop.ts`, ca sa nu existe doua surse de adevar. Cand se leaga Stripe, suma
   se va calcula oricum pe server — un pret venit din browser poate fi rescris
   de oricine.
   --------------------------------------------------------------------------- */

export type CartLine = { slug: string; quantity: number };

/** Cheia poarta versiune: daca forma datelor se schimba, cosurile vechi se ignora. */
const STORAGE_KEY = "almek:cart:v1";
const MAX_QUANTITY = 99;

/** Aceeasi referinta pentru cosul gol — `useSyncExternalStore` compara cu `Object.is`. */
const EMPTY: CartLine[] = [];

let lines: CartLine[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function parse(raw: string | null): CartLine[] {
  if (!raw) return EMPTY;
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return EMPTY;
    const clean = data.flatMap((entry): CartLine[] => {
      if (typeof entry !== "object" || entry === null) return [];
      const { slug, quantity } = entry as Record<string, unknown>;
      if (typeof slug !== "string" || typeof quantity !== "number") return [];
      const q = Math.floor(quantity);
      if (!Number.isFinite(q) || q < 1) return [];
      return [{ slug, quantity: Math.min(q, MAX_QUANTITY) }];
    });
    return clean.length ? clean : EMPTY;
  } catch {
    // Continut stricat sau modificat manual — pornim de la cos gol.
    return EMPTY;
  }
}

function readStorage(): CartLine[] {
  try {
    return parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    // In fereastra privata accesul poate arunca; cosul ramane doar in memorie.
    return EMPTY;
  }
}

function persist() {
  try {
    if (lines.length === 0) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Scrierea poate fi refuzata; cosul functioneaza pana la reincarcare.
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function commit(next: CartLine[]) {
  lines = next.length ? next : EMPTY;
  persist();
  emit();
}

export function subscribe(onChange: () => void) {
  /* Prima abonare aduce continutul din localStorage. Citirea NU se face la
     incarcarea modulului: pe server nu exista `localStorage`, iar pe client ar
     produce un snapshot diferit de cel randat de server. */
  if (!hydrated) {
    hydrated = true;
    const stored = readStorage();
    if (stored !== EMPTY) lines = stored;
  }

  listeners.add(onChange);

  /* Cosul se sincronizeaza intre taburi: `storage` se declanseaza in celelalte
     file ale aceluiasi origin. */
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    lines = parse(e.newValue);
    emit();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot(): CartLine[] {
  return lines;
}

/** Pe server cosul este mereu gol — altfel hidratarea nu ar corespunde. */
export function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

export function addItem(slug: string, quantity = 1) {
  const existing = lines.find((l) => l.slug === slug);
  if (existing) {
    setQuantity(slug, existing.quantity + quantity);
    return;
  }
  commit([...lines, { slug, quantity: Math.min(quantity, MAX_QUANTITY) }]);
}

export function setQuantity(slug: string, quantity: number) {
  if (quantity < 1) {
    removeItem(slug);
    return;
  }
  const capped = Math.min(Math.floor(quantity), MAX_QUANTITY);
  commit(lines.map((l) => (l.slug === slug ? { ...l, quantity: capped } : l)));
}

export function removeItem(slug: string) {
  commit(lines.filter((l) => l.slug !== slug));
}

export function clear() {
  commit(EMPTY);
}
