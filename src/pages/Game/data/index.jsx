export const player_stats = {
	gold: {
		id: 0,
		label: "Gold",
		short: "$",
		value: 500,
	},
	health: {
		id: 1,
		label: "Santé",
		short: "SNT",
		value: 50,
	},
	attack: {
		id: 2,
		label: "Attaque",
		short: "ATK",
		value: 20,
	},
	protection: {
		id: 3,
		label: "Protection",
		short: "PTC",
		value: 20,
	},
};

export const player_inventory = [
	{
		id: "health_potion",
		label: "Potion de soin",
		description: "Une potion pour récupérer des points de vie.",
		details: [
			{
				skill_id: 1,
				skill_label: "Santé",
				skill_short: "SNT",
				skill_change: 20,
			},
		],
		quantity: "5",
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
		quantity: "0",
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
		quantity: "0",
		image: "shield",
	},
];
