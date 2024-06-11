import { z } from "zod";

type Person = {
  firstname: string;
  lastname: string;
  age: number;
};

type Company = {
  name: string;
  address: string;
};

// Type Narrowing
function sayHello(name: string | null | boolean | Person | Company) {
  if (name === null) {
    // Type Guard
    return "";
  }

  if (typeof name === "boolean") {
    // Type Guard
    return;
  }

  if (typeof name === "object") {
    if ("firstname" in name) {
      // type guard
      return "HAllo " + name.firstname.toString();
    }
    return name.name.toLowerCase();
  }

  return "Hello " + name.toUpperCase();
}

type User2 = {
  firstname: string;
  age?: number | undefined;
};

const UserSchema = z.object({
  firstname: z.string().min(5),
  lastname: z.string().emoji(),
  age: z.number().max(100).optional(),
});

type User = z.infer<typeof UserSchema>;

declare function fetchUser(): unknown;

const user = fetchUser(); // any
const validatedUser = UserSchema.parse("fjasklfjsdf");

function showUser(u: User) {
  console.log(`User '${u.firstname}' is '${u.age}' years old`);
}

showUser(validatedUser);

// zod

// if ( user != null && typeof user === "object" && "firstname" in user) {
//
// }

// irgendwas mit user machen
const lastname = user.firstname; //🙀 🙀 🙀 🙀

showUser(user);
