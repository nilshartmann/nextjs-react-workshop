"use client";

// 1. RENDER Phase => VIRTUAL DOM  { element="p", props={className: "zeit" }, children: "Aktuelle ZEit.." }
//     - Wird im Browser ausgeführt und bei SSR auch auf dem Server
//     - Dürfen wir keine Seiteneffekte machen!
//                          ^---- Seiteneffekte modifizieren "Dinge" außerhalb von unserer Komponente
// 2. COMMIT Phase => Virtual DOM => "echten" Browser DOM überführt
//       - Effect-Callback-Funktionen werden ausgeführt

// let c = 0;
// function add(a: number, b: number) {
//   c++;
//   return a + b;
// }

import { useCallback, useEffect, useMemo, useState } from "react";
let counter = 0;

export default function Uhrzeit() {
  const [time, setTime] = useState(0);
  const [multiplikator, setMultiplikator] = useState(100);

  const [name, setName] = useState("Hallo Welt.");

  // SEITENEFFEKT VERBOTEN!!!!
  // window.document.title = "Hallo Welt"
  // fetch(...)
  // setTimeout und setInterval

  // useMemo
  // useCallback

  const emptyObject = useMemo(() => {
    return {};
  }, []);

  const logName = useCallback(
    function logName() {
      console.log(name);
    },
    [name],
  );

  useEffect(() => {
    // Effect Callback

    const now = Math.random() * multiplikator;

    console.log("RENDERING", ++counter);

    // Mehrere States für "gleiche" Daten
    //   -> Ziel stateless Komponenten

    setTime(now);
    // setTime( currentName => { console.log(currentName); return currentName }   )
    // console.log(time);
    // fetch("").then( () => logName() )
    // setTimeout(logName, 2000);

    console.log("LEERES OBJEKT", emptyObject);

    // fetch("fasdfasdfasfd");
  }, [emptyObject, multiplikator]);

  return (
    <div>
      <p className={"zeit"}>Aktuelle Zeit: {time} !</p>
      <label>
        Prefix:
        <input
          type={"number"}
          value={multiplikator}
          onChange={(e) => setMultiplikator(parseInt(e.target.value))}
        />
      </label>
      <label>
        Name:
        <input
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </div>
  );
}
