import type { AudienceId, GoalId, NeedId } from "@/lib/lead/options";

// All copy below is limited to what the supplied materials support:
// subjects, classes 1–3 support, individual lessons, groups of 2–3, exam preparation.

export type Audience = {
  id: AudienceId;
  label: string;
  title: string;
  text: string;
  directions: string[];
  more: { href: string; label: string };
};

export const audiences: Audience[] = [
  {
    id: "klasy-1-3",
    label: "Klasy 1–3",
    title: "Dobry start w szkole",
    text: "Wsparcie w nauce pisania, liczenia i we wszystkim, co na początku szkoły sprawia trudność.",
    directions: ["Nauka pisania", "Ortografia", "Ćwiczenia grafomotoryczne", "Nauka liczenia", "Zadania z tekstem", "Trudne tematy ze szkoły"],
    more: { href: "#klasy-1-3", label: "Więcej o zajęciach dla klas 1–3" },
  },
  {
    id: "klasy-4-8",
    label: "Klasy 4–8",
    title: "Więcej materiału, więcej pytań",
    text: "Pomoc z bieżącym materiałem, nadrabianie zaległości i przygotowanie do egzaminu ósmoklasisty.",
    directions: ["Matematyka", "Polski", "Angielski", "Niemiecki", "Rosyjski", "Egzamin ósmoklasisty"],
    more: { href: "#starsi-uczniowie", label: "Więcej o zajęciach dla starszych uczniów" },
  },
  {
    id: "szkola-srednia",
    label: "Szkoła średnia",
    title: "Spokojnie do matury",
    text: "Zrozumienie materiału, regularne wsparcie w ciągu roku i przygotowanie do matury.",
    directions: ["Matematyka", "Polski", "Angielski", "Niemiecki", "Rosyjski", "Matura"],
    more: { href: "#egzaminy", label: "Więcej o przygotowaniu do matury" },
  },
  {
    id: "dorosly",
    label: "Dorośli",
    title: "Język dla siebie",
    text: "Nauka języka obcego dla dorosłych, indywidualnie albo w małej grupie.",
    directions: ["Angielski", "Niemiecki", "Rosyjski"],
    more: { href: "#oferta", label: "Zobacz języki w ofercie" },
  },
];

export type Subject = {
  id: Extract<NeedId, "angielski" | "niemiecki" | "rosyjski" | "polski" | "matematyka">;
  name: string;
  /** Accusative form for "Zapytaj o …". */
  askAs: string;
  kind: string;
  note: string;
  noteLang: string;
  text: string;
  forWhom: string;
};

export const subjects: Subject[] = [
  {
    id: "angielski",
    name: "Angielski",
    askAs: "angielski",
    kind: "Język obcy",
    note: "Hello!",
    noteLang: "en",
    text: "Pomoc z materiałem ze szkoły albo nauka języka dla siebie. Zajęcia indywidualne lub w małej grupie.",
    forWhom: "Uczniowie i dorośli",
  },
  {
    id: "niemiecki",
    name: "Niemiecki",
    askAs: "niemiecki",
    kind: "Język obcy",
    note: "Hallo!",
    noteLang: "de",
    text: "Dla uczniów, którzy chcą lepiej radzić sobie na lekcjach, i dla dorosłych, którzy chcą zacząć albo wrócić do nauki.",
    forWhom: "Uczniowie i dorośli",
  },
  {
    id: "rosyjski",
    name: "Rosyjski",
    askAs: "rosyjski",
    kind: "Język obcy",
    note: "Привет!",
    noteLang: "ru",
    text: "Nauka języka rosyjskiego dla uczniów i dorosłych. Zajęcia indywidualne lub w małej grupie.",
    forWhom: "Uczniowie i dorośli",
  },
  {
    id: "polski",
    name: "Polski",
    askAs: "polski",
    kind: "Przedmiot szkolny",
    note: "rz czy ż?",
    noteLang: "pl",
    text: "Od nauki pisania i ortografii w klasach 1–3 po bieżący materiał w starszych klasach.",
    forWhom: "Uczniowie",
  },
  {
    id: "matematyka",
    name: "Matematyka",
    askAs: "matematykę",
    kind: "Przedmiot szkolny",
    note: "7 × 8 = 56",
    noteLang: "pl",
    text: "Od nauki liczenia i zadań z tekstem w klasach 1–3 po trudne tematy w szkole podstawowej i średniej.",
    forWhom: "Uczniowie",
  },
];

export const earlyGrades = [
  { icon: "pencil", label: "Nauka pisania" },
  { icon: "abc", label: "Ortografia" },
  { icon: "hand", label: "Ćwiczenia grafomotoryczne" },
  { icon: "numbers", label: "Nauka liczenia" },
  { icon: "book", label: "Rozwiązywanie zadań z tekstem" },
  { icon: "star", label: "Pomoc z bieżącymi trudnościami szkolnymi" },
] as const;

export const olderFocus = [
  { title: "Zrozumienie materiału", text: "Wracamy do tematów, które na lekcji poszły za szybko." },
  { title: "Nadrobienie zaległości", text: "Uzupełniamy braki, które utrudniają dalszą naukę." },
  { title: "Regularne wsparcie", text: "Stałe zajęcia w ciągu roku szkolnego, nie tylko przed sprawdzianem." },
  { title: "Ważne egzaminy", text: "Przygotowanie do egzaminu ósmoklasisty i do matury." },
];

export const exams: { id: NeedId; goal: GoalId; name: string; who: string }[] = [
  { id: "egzamin-8", goal: "egzamin", name: "Egzamin ósmoklasisty", who: "Dla uczniów, którzy kończą szkołę podstawową." },
  { id: "matura", goal: "egzamin", name: "Matura", who: "Dla uczniów szkół średnich przed egzaminem dojrzałości." },
];

export const processSteps = [
  { title: "Mówisz nam, czego potrzebujesz.", text: "Przez telefon albo w krótkim formularzu na tej stronie." },
  { title: "Dobieramy zajęcia.", text: "Przedmiot i formę: indywidualnie albo w grupie 2–3 osób." },
  { title: "Zaczynasz pracę nad konkretnym celem.", text: "Krok po kroku, z jasno ustalonym celem." },
];

export type Review = { author: string; text: string; rating: 5 };

/**
 * Real Google reviews supplied by the business (all 5/5). Dates are left out on purpose
 * so the section never looks stale. Never add invented reviews.
 */
export const reviews: Review[] = [
  { author: "Julia Binczyk", rating: 5, text: "Najlepsze nauczycielki! Tylko tutaj można się tak szybko nauczyć języków obcych. Polecam 💗🥰" },
  { author: "Wiktoria Burdelak", rating: 5, text: "Zawsze miałam problem z językiem angielskim jednak dzięki nauce tutaj zdałam świetnie maturę i teraz angielski nie sprawia mi trudności. Serdecznie polecam" },
  { author: "Jakub Kmieć", rating: 5, text: "Polecam z czystym sumieniem :) nie mogę się doczekać kolejnej edycji kursu!" },
  { author: "Tomasz Chądzyński", rating: 5, text: "Najlepsza szkoła języka angielskiego, polecam serdecznie" },
  { author: "Julciakkk 96", rating: 5, text: "Bardzo miła atmosfera, polecam z całego serduszka to miejsce" },
  { author: "Agnieszka Jeżewicz", rating: 5, text: "Fantastyczne miejsce do nauki angielskiego dla dzieci. Polecam" },
  { author: "Weronika Piechulska", rating: 5, text: "Gorąco polecam! Świetne podejście do dzieci jak i dorosłych" },
  { author: "Karol Reczulski", rating: 5, text: "Najlepsza szkoła języka Angielskiego! Polecam" },
  { author: "Anna Walczak", rating: 5, text: "Profesjonalnie, skutecznie i w bardzo miłej atmosferze :)" },
  { author: "Patrycja", rating: 5, text: "Świetnie przekazywana wiedza w przemiłej atmosferze, polecam." },
  { author: "mrM3th 77", rating: 5, text: "Polecam!" },
];

export const faq = [
  {
    q: "Dla kogo są zajęcia?",
    a: "Dla dzieci z klas 1–3, uczniów klas 4–8, młodzieży ze szkół średnich i dorosłych.",
  },
  {
    q: "Jakie przedmioty są dostępne?",
    a: "Angielski, niemiecki, rosyjski, polski i matematyka. Dzieciom z klas 1–3 pomagamy też w nauce pisania, ortografii, liczenia i zadań z tekstem.",
  },
  {
    q: "Czy można wybrać zajęcia indywidualne?",
    a: "Tak. Możesz wybrać zajęcia indywidualne albo zajęcia w małej grupie.",
  },
  {
    q: "Czy są małe grupy?",
    a: "Tak. Grupy liczą 2–3 osoby.",
  },
  {
    q: "Czy przygotowujecie do egzaminu ósmoklasisty?",
    a: "Tak. Prowadzimy zajęcia przygotowujące do egzaminu ósmoklasisty. Zadzwoń albo wypełnij formularz, a powiemy, jak mogą wyglądać.",
  },
  {
    q: "Czy przygotowujecie do matury?",
    a: "Tak. Prowadzimy zajęcia przygotowujące do matury. Zadzwoń albo wypełnij formularz, a powiemy, jak mogą wyglądać.",
  },
  {
    q: "Gdzie odbywają się zajęcia?",
    a: "W Językowni przy ul. Sadowej 12B w Konstantynowie Łódzkim (95-050).",
  },
  {
    q: "Jak zapisać się na zajęcia?",
    a: "Zadzwoń pod numer 574 930 108 albo wypełnij krótki formularz „Dobierz zajęcia”. Na tej podstawie pomożemy wybrać odpowiednie zajęcia.",
  },
];
