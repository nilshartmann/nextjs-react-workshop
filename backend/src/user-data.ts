type IUser = {
	userId: string;
	fullname: string;
	email: string;
}

export function createUserData(): Record<string, IUser> {
	return {
		"U1": {
			email:    "susi@example.de",
			fullname: "Susi Müller",
			userId:   "U1"
		},
		"U2": {
			email:    "UlrikeGruenewald@example.de",
			fullname: "Ulrike Gruenewald",
			userId:   "U2"
		},
		"U3": {
			email:    "ralf_austerlitz@example.de",
			fullname: "Ralf Austerlitz",
			userId:   "U3"
		},
		"U4": {
			email:    "kv@example.de",
			fullname: "Katrin Vogler",
			userId:   "U4"
		},
		"U5": {
			email:    "uta_s@example.de",
			fullname: "Uta Schulze",
			userId:   "U5"
		},
		"U6": {
			email:    "chris_e1975@example.de",
			fullname: "Christina Ebersbacher",
			userId:   "U6"
		},
		"U7": {
			email:    "gabriele.kuster@example.de",
			fullname: "Gabriele Kuster",
			userId:   "U7"
		},
	}
}