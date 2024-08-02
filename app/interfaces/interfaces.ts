/* General */
export interface StatDetail{
	stat_type: string;
	stat_value: number;
}
/* Descendant */

export interface DescendantStat{
	level: number;
	stat_detail: StatDetail[];
}
export interface Skill{
	skill_type: string;
	skill_name: string;
	element_type: string;
	arche_type: string;
	skill_image_url: string;
	skill_description: string;
}
export interface Descendant{
	descendant_id: string;
	descendant_name: string;
	descendant_element: string;
	descendant_description: string;
	descendant_image_url: string;
	descendant_stat: DescendantStat[];
	descendant_skill: Skill[];
}
export interface DescendantPart{
	name: string;
	amorphous?: number | string;
	drop_location: string;
	open_location?: string;
	drop_rate: number;
}
/* Weapon */
export interface Stat{
	stat_id: string;
	stat_name: string;
}
export interface BaseStat{
	stat_id: string;
	stat_value: number | string;
}
export interface FirearmAtk{
	firearm_atk_type: string;
	firearm_atk_value: number;
}
export interface FirearmAtkLevel{
	level: number;
	firearm: FirearmAtk[];
}
export interface Weapon{
	weapon_id: string;
	weapon_name: string;
	image_url: string;
	weapon_type: string;
	weapon_tier: string;
	weapon_rounds_type: string;
	base_stat: BaseStat[];
	firearm_atk: FirearmAtkLevel[];
	weapon_perk_ability_name?: string | null;
	weapon_perk_ability_description?: string | null;
	weapon_perk_ability_image_url?: string |null;
}

export interface WeaponAbilityEffect {
    name: string;
    levels: any;
}

export interface WeaponAbility {
    weapon_id: string;
    weapon_name: string;
    weapon_perk_ability_name: string;
    weapon_perk_ability_description: string;
    weapon_perk_ability_image_url: string;
    ability_effects: WeaponAbilityEffect[];
}

export interface WeaponPart{
	name: string;
	amorphous?: number | string;
	drop_location: string;
	open_location?: string;
	drop_rate: number;
}

/* Amorphous */
export interface Amorphous{
	id: string | number;
	name?: string;
	image_url?: string;
	drop_location: string;
	open_location: string;
	drop_location_type: string;
	vaulted?: boolean;
	rewards: Reward[];
}
export interface Reward{
	name: string;
	drop_rate: number;
}

/* Void */

export interface VoidMaterial{
	name: string;
	value: number;
}

export interface VoidMission {
    location: string;
    type: string;
    element: string;
    difficulty: string;
    bonus?: string;
	materials: VoidMaterial[];
}

/* Recent Items */

export interface RecentItem{
    name: string;
    link_url?: string;
    image_url?: string;
}
export interface RecentlyAddedItems {
    version: string;
    news: RecentItem[];
}

/* Consumable */

export interface Consumable{
	name: string;
	type: string;
	tier: string;
	description: string;
	image_url?: string;
}
export interface ExtendedConsumable extends Consumable{
	drop_location?: any[];
	craft?: any[];
}
export interface ConsumableDrop{
	location: string;
	type: string;
	recommended?: boolean;
}
export interface ConsumableDetail{
	name: string;
	craft?: any[];
	drop_location?: ConsumableDrop[];
}

/* Maps */

export interface MarkerData {
	position: [number, number];
	popupText: string;
}
  
export interface MapData {
	mapUrl: string;
	markers: MarkerData[];
}
  
