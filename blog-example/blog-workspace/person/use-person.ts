import { sayHello } from "person";

type Language = "de" | "en";

function translate(msg: string, lang: Language) {
  // ...
}

translate("Hello", "en");

type Person = {
  id: string;
  lastname: string;
  age: number;
};

type PersonWithoutAge = Omit<IPerson, "id">;

function createPerson(newPerson: Omit<IPerson, "id">) {}

interface IPerson {
  id: string;
  lastname: string;
  age: number;
}

interface IPerson {
  firstname: string;
}
interface MyUtils {
  sayHello(): void;
}
window.myutils = {
  sayHello() {
    /* ... */
  },
};

interface MyUtils {
  sayGoodbye(): void;
}
window.myutils = {
  sayGoodbye() {
    /* ... */
  },
};

type Employee = Person & {
  sallary: number;
};

type OptionalPerson = string | null | undefined;

interface IEmployee extends Person {
  sallary: number;
}

class PersonImpl implements Person {}
