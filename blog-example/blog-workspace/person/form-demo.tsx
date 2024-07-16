"use client";

import { useState } from "react";
import { produce } from "immer";

type CallbackFn = (value: any) => void;

function myFetch(cb1: CallbackFn, cb2: CallbackFn) {
  return new Promise((res) => {
    setTimeout(() => {
      cb1(false);
      res(null);
    }, 5000);
  });

  // cb1(true);
  //
  // return "erledigt";
}

export default function FormExample() {
  const [requestState, setRequestState] = useState({
    isChecking: false,
    isAvailableOnBackendSite: false,
    error: null,
    lastResults: [],
  });

  const [isChecking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [isAvailableOnBackendSite, setIsAvailableOnBackendSite] =
    useState(true);
  const [counter, setCounter] = useState(0);

  function onBlur() {
    console.log("Beginn blur", Math.random());

    setChecking(true);
    // requestState.isChecking = true; // VERBOTEN!!!
    setRequestState({
      ...requestState,
      lastResults: [...requestState.lastResults, "..."],
    }); // RICHTIG

    // Mit immer.js:
    const newObject = produce(requestState, (draft) => {
      draft.lastResults.push("fasdfasdf");
      draft.isChecking = true;
      draft.lastResults[7].city = "Hamburg";
    });

    // setRequestState({
    //
    // })

    setCounter(counter + 1);

    const promiseObject = myFetch(
      () => {
        console.log("COUNTER IN promiseObject", counter);
        setIsAvailableOnBackendSite(false);
        setCounter((currentCounter) => {
          console.log("Wert in setCounter", currentCounter);
          return currentCounter;
        });
      },
      () => setIsAvailableOnBackendSite(false),
    );

    promiseObject.then(() => {
      setChecking(false);
      setError("");
      console.log("End blur", Math.random());
    });

    // await myFetch(
    //   () => setIsAvailableOnBackendSite(false),
    //   () => setIsAvailableOnBackendSite(false),
    // );
  }

  function onSubmit() {
    console.log("Beginn submit");
    if (isChecking) {
      setError("key wird geprüft... bitte warten");
      return;
    }

    if (isAvailableOnBackendSite) {
      return;
    }

    console.log("Submit wird durchgeführt!");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        onSubmit();
      }}
    >
      <input onBlur={onBlur} />
      <button type={"submit"}>Submit</button>
      <p>isChecking: {String(isChecking)}</p>
      <p>Counter: {counter}</p>
      <p>
        isAvailableOnBackendSite:{" "}
        {isChecking ? "wird geprüft" : String(isAvailableOnBackendSite)}
      </p>
      <p>Fehler: {error}</p>
    </form>
  );
}
