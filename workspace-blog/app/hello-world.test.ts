import { expect, test } from "vitest";
import { z } from "zod";

// Definiere das 'UserSchema' mit Zod.
//   - Der TypeScript-Typ soll dem Typ "User" unten entsprechen
//   - zusätzlich:
//     - 'username' muss ein String mit MINDESTENS drei Buchstaben sein
//
// - Wenn du das Schema beschrieben hast, leite mit 'infer' einen TypeScript-
//   Typen dafür ab ('IUserSchema')
// - Gib diesen Typen unten in 'convert' für 'u' an (statt 'unknown')
//   - Wenn du das Zod-Schema richtig beschrieben hast, darf es keinen Compile-Fehler geben.
//
// - Für mit 'npm test' die unten stehenden Tests aus.
//    - Diese sollten "grün" sein, wenn du das Schema korrekt definiert hast

const UserSchema = z.object({
  username: z.string().min(3),
  fullname: z.string().nullish(),
  credits: z.number(),
  role: z.enum(["ADMIN", "EDITOR"]),
});

type IUserSchema = z.infer<typeof UserSchema>;

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
