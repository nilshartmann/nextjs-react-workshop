"use client";

import { useEffect, useState } from "react";
import Container from "./Container";

export default function SearchApp() {
  const [name, setName] = useState("");
  const [plz, setPlz] = useState("");
  const [city, setCity] = useState("");

  // PROBLEME:
  // - wir wollten nicht, dass die Suche ausgeführt wird, wenn sich der Name
  //   geändert hat
  // - das Erzeugen von 'citySearchConf' könnte sehr teuer und aufwändig sein
  //
  // SCHRITT 2: handleReset an CitySearch übergeben

  const citySearchConf = {
    city,
    plz,
  };

  const handleReset = () => {
    setName("");
    setPlz("");
    setCity("");
  };

  return (
    <Container title="Root">
      <h1>Person</h1>

      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        PLZ
        <input
          type="text"
          value={plz}
          onChange={(e) => setPlz(e.target.value)}
        />
      </label>

      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>

      <CitySearch conf={citySearchConf} />
    </Container>
  );
}

type CitySearchConf = {
  city: string;
  plz: string;
};

type SearchProps = {
  conf: CitySearchConf;
};
function CitySearch({ conf }: SearchProps) {
  console.log("CitySearch - searchString", conf);

  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    console.log("useEffect - searchString", conf);
    // in einer richtigen Anwendung würde hier ein richtiger
    // API-Call ausgelöst...

    const searchResult = doSearch(conf.plz + conf.city);

    setResult(searchResult);
  }, [conf]);

  return (
    <Container title="Search Result">
      <ul>
        {result.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </Container>
  );
}

// "Simulation" eines echten Api Calls
function doSearch(searchString: string): string[] {
  return [
    "found-01-for-" + searchString,
    "found-02-for-" + searchString,
    "found-03-for-" + searchString,
  ];
}
