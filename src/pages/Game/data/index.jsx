export const player_stats = {
	gold: {
		id: "gold",
		label: "Gold",
		short: "$",
		value: 500,
	},
	health: {
		id: "health",
		label: "Santé",
		short: "SNT",
		value: 50,
	},
	attack: {
		id: "attack",
		label: "Attaque",
		short: "ATK",
		value: 20,
	},
	protection: {
		id: "protection",
		label: "Protection",
		short: "PTC",
		value: 20,
	},
};

export const player_inventory = [
	{
		id: "health_potion",
		type: "potion",
		label: "Potion",
		description: "Une potion pour récupérer des points de vie.",
		details: [
			{
				skill_id: 1,
				skill_label: "Santé",
				skill_short: "SNT",
				skill_change: 20,
			},
		],
		quantity: {
			label: 5,
			value: 5,
		},
		image: "health_potion",
	},
	{
		id: "sword",
		type: "weapon",
		label: "Épée",
		description: "Une épée forgée par les elfes",
		details: [
			{
				skill_id: 2,
				skill_label: "Attaque",
				skill_short: "ATK",
				skill_change: 50,
			},
		],
		quantity: {
			label: 0,
			value: 0,
		},
		image: "sword",
	},
	{
		id: "shield",
		label: "Bouclier",
		description: "Un bouclier en bois augmentant",
		details: [
			{
				skill_id: 3,
				skill_label: "Protection",
				skill_short: "PTC",
				skill_change: 100,
			},
		],
		quantity: {
			label: 0,
			value: 0,
		},
		image: "shield",
	},
];

export const data = [
	{
		id: "gold",
		label: "Gold",
		value: "Gold",
	},
	{
		id: "health_potion",
		label: "Potion",
		value: "Potion",
	},
	{
		id: "sword",
		label: "Épée",
		value: "Épée",
	},
	{
		id: "shield",
		label: "Bouclier",
		value: "Bouclier",
	},
];

export const quantityItem = new Array(5).fill().map((e, i) => {
	return { value: i + 1, label: i + 1 };
});
export const quantityGold = new Array(10).fill().map((e, i) => {
	return { value: 50 * i, label: 50 * i };
});
