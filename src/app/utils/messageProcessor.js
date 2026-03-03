export const checkMessageLength = (message) => {
  return message.split(/\s+/).length > 10;
};

export const checkForForbiddenLetters = (message) => {
  return /[rR]/.test(message);
};

export const checkForKeywords = (message) => {
  const keywords = [
    "Mika",
    "mika",
    "Mice",
    "mice",
    "Miki",
    "miki",
    "pies",
    "piesek",
    "psa",
    "pieska",
    "Mikę",
    "mikę",
    "Mike",
    "mike",
    "miką",
    "Miką",
  ];
  return keywords.some((keyword) => message.includes(keyword));
};

export function convertToSpeechImpairment(text) {
  return text.replace(/r/g, "l").replace(/R/g, "L");
}

const basicResponses = [
  "Eee... co? Za dłuuugie! Powiedz plosciej...",
  "Za duzo słuf... zgubiłem wątek...",
  "Nie lapie, za skomplikowane...",
  "Mozesz to powtólc innymi słowami?",
  "Ja... ja sie gubie... plosze powtólc?",
  "Słowa... za dużo słów... AAAAA!",
  "Eeee... mój mózg mówi 'nie'...",
  "Ploszę mniej słów, więcej sensu...",
  "Ja? Tu? Co? Nieeee, to za tludne...",
  "Zalaz! Stop! Jeszcze laz, wolniej...",
  "Szzzz... moje myśli sie lolzłażą...",
  "Ale... chwila, czy ja... czy ty... co?",
  "Mój język się plącze jak twoje zdania...",
  "Ej, ale selio... to tak na selio?",
  "Stop! Leset! Cofnij do pocontku!",
  "Ja już wylądowałem na innej planecie...",
  "To... to było jak wil słów! Stlaszne!",
  "Doblze, że to nie test, bo bym poległ...",
  "Moja głowa mówi: 'Elol 404: Sens not found'.",
  "Eee... pomidol? Tak się mówi, plawda?",
  "Ploszę mniej tludnych leczy, więcej jaśnych lzeczy!",
  "Mój mózg lobi 'puff' i zniknął...",
  "Czy ja zgubiłem temat, czy temat zgubił mnie?",
  "A gdyby tak... mniej słów i więcej ciszy?",
  "Pociąg moich myśli właśnie wykoleił się...",
];

const angryResponses = [
  "Ej! Plzestan! Myslisz, ze to smiesne?! Nie bede z tobą glowil!",
  "Ty sie ze mnie nasmiewasz! Nie mow tak!",
  "Nie lubie takiego mówienia! Plzestan!",
  "Oblazam sie! Nie powiem nic!",
  "Ja nie bede glosil, kiedy mnie wysmiewasz!",
  "To wcale nie jest smiesne! Wcale wcale wcale!",
  "Dlaczego tak mowisz?! To nie jest ladne!",
  "Plzestan! Nie chce cie slyszec!",
  "Ty myslisz, ze to zabawne, ale ja nie!",
  "Oblazam sie i nie bede nic mówil!",
  "Nie tlaktuj mnie jak dziecko! Nie lubie!",
  "Nie smiej sie ze mnie! To nie śmiesne, tylko glupie!",
  "Mówisz tak, bo chcesz mnie zdenelwować! Udalo ci sie!",
  "Ty mnie nie zesmieszasz, ty mnie zlobi wściekłym!",
  "Niesplawiedliwe! Ja nie bede z tobą lazmawial!",
  "A ty myslisz, ze jesteś mądlzejszy?!",
  "Ty sobie globy ze mnie lobil?! Nie pozwalam!",
  "Oblazam sie na zawsze! Juz koniec!",
  "Ploszę nie mowic tak do mnie! Nie lubie!",
  "Zly jesteś! Blllee! Nie chce cie sluchac!",
  "Mówisz tak specjalnie, żebym się czuł źle! Nieładnie!",
  "Ja nie jestem do wysmiewania! Jestem powazny!",
  "Jestem smutny plzez ciebie! Ploszę plzestan!",
  "Jak tak to ja sobie ide! Nie blawie się tak!",
  "Ja ci tlaz tego nie odpłacę! Nieładnie!",
  "Jesteś oklopny! nie śmiej się ze mnie...",
  "Tylko sie ze mnie naśmiewasz! Nie bawie się!",
  "Moja głowa mowi: 'Nie, nie, nie! Nie pozwalam!'",
  "To jest wstlętne i nie chce tego sluchać!",
  "Moglbys mnie posluchać, zamiast się wysmiewać?!",
  "Ja mam uczucia! Nie można tak do mnie mowić!",
  "Mówisz tak, bo myślisz, że to śmieszne?! To nie jest śmieszne!",
  "Ty nie masz wstydu! Tak się nie mowi do ludzi!",
  "Ja to zapamiętam! Nie myśl, że zapomnę!",
  "Mój mózg mówi 'Buuu, plzyklosc, koniec, ide sobie!'",
  "Ja cię wcale nie lubie, jak tak mówisz!",
];

const distrustResponses = [
  "Nie ufam ci... plosze, nie chce lazmawiać.",
  "Dlaczego chcesz to wiedzieć?! Nie mogę... nie mogę mówić!",
  "To nie jest dobly pomysł. Nie powiem nic...",
  "Heeej, nie wiem kim jesteś... nie ufam ci...",
  "Tylko ciemność… i zlomalny tłach. Nie pytaj...",
  "Ploszę… ja nie mogę mówić. To jest za dużo...",
  "Mylśę, że… że nic nie wiem. Albo wiem za dużo?",
  "Dlaczego ty pytasz? Ja cię nie znam...",
  "Nic nie wiem, nic nie słyszałem. Hehe… albo słyszałem?",
  "Może… może nie jestem tu bezpieczny? Ty też nie!",
];

export const getRandomResponse = (type) => {
  if (type === "basic")
    return basicResponses[Math.floor(Math.random() * basicResponses.length)];
  if (type === "angry")
    return angryResponses[Math.floor(Math.random() * angryResponses.length)];
  if (type === "distrust")
    return distrustResponses[
      Math.floor(Math.random() * distrustResponses.length)
    ];
  return "";
};
