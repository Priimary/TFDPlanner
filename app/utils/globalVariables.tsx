import { Amorphous, VoidMaterial, VoidMission } from "../interfaces/interfaces";

export const descendantParts = [
	"Code",
	"Enhanced Cells Blueprint",
	"Spiral Catalyst Blueprint",
	"Stabilizer Blueprint"
]

export const weaponParts = [
	"Blueprint",
	"Nano Tube Blueprint",
	"Synthetic Fiber Blueprint",
	"Polymer Syncytium Blueprint"
];
export const weaponsRoundsTypes = ['General Rounds','Special Rounds', 'Impact Rounds','High-Power Rounds'];
export const consumablesTypes = ["Core Materials", "Basic Materials", "Amorphous Materials", "Enhancement Materials", "Miscellaneous"];
export const consumablesTypeMapping: Record<string, string> = {
    "Core Materials": "Core Material",
    "Basic Materials": "Basic Material",
    "Amorphous Materials": "Amorphous Material",
    "Enhancement Materials": "Enhancement Material",
};

export const measureTypes: { [key: string]: string } = {
	'Fire Rate': 'RPM',
    'Weak Point Damage': 'x',
    'Effective Range (Drop-off start)': 'm',
	'Effective Range (Drop-off end)': 'm',
    'ATK Drop-off Modifier': 'x',
	'Max Range': 'm',
	'Reload Time': 's',
	'Pierce': '%',
	'Burst': '%',
	'Crush': '%',
	'Firearm Critical Hit Rate': '%',
	'Firearm Critical Hit Damage': '%',
	'Attribute Statu Effect Trigger Rate': '%', 
};
export const filterTiers = ["All", "Standard", "Rare", "Ultimate"];
export const weaponTypes = [
    'All',
    'Hand Cannon',
    'Handgun',
    'Shotgun',
    'Submachine Gun',
    'Machine Gun',
    'Assault Rifle',
    'Tactical Rifle',
    'Scout Rifle',
    'Sniper Rifle',
    'Launcher',
    'Beam Rifle',
];
export const getTierColor = (tier: string) => {
	switch (tier.toLowerCase()) {
		case 'standard':
			return '#42a5f5';
		case 'rare':
			return '#9351c1';
		case 'ultimate':
			return '#d2a544';
		default:
			return 'white';
	}
}

// Function to extract difficulty and clean location string
export const parseLocation = (location: string) => {
	// Adjusted regex to capture location and description
	const match = location.match(/^(.*?)\s+\[(H|N)\]\s+-\s+(.*)$/);
	if (match) {
		const loc = match[1].trim();
		const diff = match[2] === 'H' ? 'Hard' : 'Normal';
		let description = match[3].trim();
		
		// Remove "Void Reactor" from the description if it exists
		description = description.replace(/Void Reactor$/, '').trim();

		const combinedLocation = `${loc} - ${description}`;
		return { location: combinedLocation, difficulty: diff };
	}
	return { location, difficulty: '', description: '' };
};

export const getMaterialsPerAmorphous = (amorphousData: Amorphous[], voidMissions: VoidMission[]): VoidMaterial[][] => {
    return amorphousData.map(amorphous => {
        const { location, difficulty } = parseLocation(amorphous.open_location);

        const matchingMissions = voidMissions
            .filter(mission => mission.location === location && mission.difficulty === difficulty && mission.type === 'Reactor');

        return matchingMissions.map(mission => mission.materials).flat();
    });
};