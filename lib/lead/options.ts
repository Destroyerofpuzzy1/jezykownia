// Options for the "Dobierz zajęcia" qualification flow.
// Shared by the client form and the API route, so ids stay in sync.

export const audienceOptions = [
  { id: "klasy-1-3", label: "Klasy 1–3", hint: "Pierwsze lata w szkole" },
  { id: "klasy-4-8", label: "Klasy 4–8", hint: "Starsze klasy podstawówki" },
  { id: "szkola-srednia", label: "Szkoła średnia", hint: "Liceum, technikum, branżowa" },
  { id: "dorosly", label: "Dorosły", hint: "Nauka dla siebie" },
] as const;

export const needOptions = [
  { id: "angielski", label: "Angielski" },
  { id: "niemiecki", label: "Niemiecki" },
  { id: "rosyjski", label: "Rosyjski" },
  { id: "polski", label: "Polski" },
  { id: "matematyka", label: "Matematyka" },
  { id: "egzamin-8", label: "Egzamin ósmoklasisty", onlyFor: ["klasy-4-8"] },
  { id: "matura", label: "Matura", onlyFor: ["szkola-srednia", "dorosly"] },
  { id: "nie-wiem", label: "Nie wiem jeszcze", exclusive: true },
] as const;

export const formatOptions = [
  { id: "indywidualnie", label: "Indywidualnie", hint: "Zajęcia jeden na jeden" },
  { id: "mala-grupa", label: "Mała grupa", hint: "2–3 osoby" },
  { id: "bez-znaczenia", label: "Bez znaczenia", hint: "Pomóżcie mi wybrać" },
] as const;

export const goalOptions = [
  { id: "nadrobienie", label: "Nadrobienie materiału" },
  { id: "szkola", label: "Lepsze radzenie sobie w szkole" },
  { id: "egzamin", label: "Przygotowanie do egzaminu" },
  { id: "jezyk", label: "Nauka języka" },
  { id: "inny", label: "Inny cel" },
] as const;

export type AudienceId = (typeof audienceOptions)[number]["id"];
export type NeedId = (typeof needOptions)[number]["id"];
export type FormatId = (typeof formatOptions)[number]["id"];
export type GoalId = (typeof goalOptions)[number]["id"];

type NeedOption = (typeof needOptions)[number];

export function needsForAudience(audience: AudienceId | null): NeedOption[] {
  return needOptions.filter((option) => {
    if (!("onlyFor" in option)) return true;
    if (!audience) return false;
    return (option.onlyFor as readonly string[]).includes(audience);
  });
}

export function labelOf<T extends { id: string; label: string }>(options: readonly T[], id: string | null) {
  return options.find((o) => o.id === id)?.label ?? "";
}
