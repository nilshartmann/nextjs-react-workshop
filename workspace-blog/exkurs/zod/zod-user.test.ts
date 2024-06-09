import { expect, test } from "vitest";
import { z } from "zod";

// Definiere das 'UserSchema' mit Zod.
//   - Der TypeScript-Typ soll dem Typ "User" unten entsprechen
//   - zusätzlich:
//     - 'username' muss ein String mit MINDESTENS drei Buchstaben sein
//
// - Wenn du das Schema beschrieben hast, leite mit 'infer' einen TypeScript-
//   Typen dafür ab ('IUserSchema')
// - Dieser Typ wird unten in 'convert' für 'u' verwendet
//   - Wenn du das Zod-Schema richtig beschrieben hast, darf es keinen Compile-Fehler geben.
//
// - Für mit 'npm test' die unten stehenden Tests aus.
//    - Diese sollten "grün" sein, wenn du das Schema korrekt definiert hast

// todo #1: durch zod-Definition ersetzen
//   (alles hinter dem =-Zeichen ist nur, damit der Code unten compiliert
//    du kannst die Zeile komplett löschen und neu hinschreiben)
const UserSchema = { parse: (a: any) => {} };

// todo #2: lasse dir den IUserSchema Typen von zod ableiten
type IUserSchema = any;

type User = {
  username: string;
  fullname?: string | null | undefined;
  credits: number;
  role: "ADMIN" | "EDITOR";
};

function convert(u: IUserSchema): User {
  // In einer echten Anwendung reicht es, wenn du den von Zod-erzeugten Typen
  // (IUserSchema) verwendest. Diese Funktion und der "User"-Typ sind hier nur
  // zum testen bzw. um sicherzustellen, dass du das IUserSchema korrekt
  // beschrieben hast.
  return u;
}

test("valid object does not throw", () => {
  // no exception
  UserSchema.parse({
    username: "Sven",
    fullname: "Sven Mueller",
    credits: 3,
    role: "ADMIN",
  });

  // different role:
  UserSchema.parse({
    username: "Sven",
    fullname: "Sven Mueller",
    credits: 3,
    role: "EDITOR",
  });

  // ...without fullname
  UserSchema.parse({
    username: "Sven",
    credits: 3,
    role: "ADMIN",
  });
});

test("invalid object does throw", () => {
  // username too short
  expect(() =>
    UserSchema.parse({
      username: "AB",
      fullname: "Sven Mueller",
      credits: 3,
      role: "ADMIN",
    }),
  ).toThrowError();

  // invalid role
  expect(() =>
    UserSchema.parse({
      username: "Sven",
      credits: 3,
      role: "ANONYMOUS",
    }),
  ).toThrowError();

  // no role
  expect(() =>
    UserSchema.parse({
      username: "Sven",
      credits: 3,
    }),
  ).toThrowError();

  // no credits
  expect(() =>
    UserSchema.parse({
      username: "Sven",
      fullname: "Sven Mueller",
      role: "EDITOR",
    }),
  ).toThrowError();
});
