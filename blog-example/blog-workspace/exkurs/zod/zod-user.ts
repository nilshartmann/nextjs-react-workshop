type User = {
  firstname: string;
  age?: number;
};

// todo: zod-Typen definieren
// todo: komplexe Regeln

function showUser(u: User) {
  // irgendwas mit user machen
  console.log(`User '${u.firstname}' is '${u.age}' years old`);
}

declare function fetchUser(): any;

const user = fetchUser(); // any
// irgendwas mit user machen
const lastname = user.lastname; //🙀 🙀 🙀 🙀

showUser(user);
