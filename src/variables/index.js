export const types = [
	{ icon: "ni ni-ruler-pencil", value: 1, label: "Sondage", questionTypes: [1, 2, 4, 5, 6, 7], disabled: false },
	{ icon: "ni ni-hat-3", value: 2, label: "Live Question", questionTypes: [3], disabled: false },
	{ icon: "ni ni-check-bold", value: 3, label: "Quizz", disabled: true },
	{ icon: "ni ni-trophy", value: 3, label: "Concours", disabled: true }
];

export const visibility = [
	{ icon: "ni ni-ruler-pencil", value: 1, label: "Tout le monde", disabled: false },
	{ icon: "ni ni-hat-3", value: 2, label: "Collaborateurs", disabled: false }
];

export const questionTypes = [
	{ id: 1, label: "Choix simple" },
	{ id: 2, label: "Choix multiple" },
	{ id: 3, label: "Choix avec réponse" },
	{ id: 4, label: "Vrai/Faux" },
	{ id: 5, label: "Liste déroulante" },
	{ id: 6, label: "Texte Court" },
	{ id: 7, label: "Texte Long" }
];
