/* eslint-disable no-param-reassign */
"use strict";

const DefaultSettings = {
	premiumSlotEnabled: true,
	hotkey: "Ctrl+Shift+M",
	autoaccept: false,
	blockscene: false,
	drunk: false,
	spamf: false,
	aeromanual: false,
	aero: "normal",
	drinkAbnormalities: [48732, 48733, 48734, 48735, 48736, 48737, 48738, 48739, 70251, 70252, 70253, 70254, 70255, 70256, 75000022, 999001011],
	npc: {
		// For bank NPC.
		// The "type" is a "type" from S_REQUEST_CONTRACT packet.
		// The "value" is a "container" from S_VIEW_WARE_EX packet.
		bank: {
			type: 27,
			value: 1
		},
		gbank: {
			type: 27,
			value: 3
		},
		pbank: {
			type: 27,
			value: 9
		},
		cbank: {
			type: 27,
			value: 12
		},
		// For other NPCs.
		// You can use "npcsummoner" command to enable debug for get values.
		store: {
			type: 9,
			value: 70310,
			gameId: 3518437209100017,
			opts: [
				{ templateId: 2001, huntingZoneId: 183, _value: 70310 },
				{ templateId: 2018, huntingZoneId: 183, _value: 70310 },
				{ templateId: 2019, huntingZoneId: 183, _value: 70310 }
			]
		},
		sstore: {
			type: 9,
			value: 250,
			gameId: 3518437209103231,
			opts: [
				{ templateId: 2014, huntingZoneId: 183, _value: 250 },
				{ templateId: 2109, huntingZoneId: 183, _value: 250 },
				{ templateId: 2110, huntingZoneId: 183, _value: 250 }
			]
		},
		bel: {
			type: 50,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 2045, huntingZoneId: 183, _value: 141 }
			]
		},
		vng: {
			type: 49,
			value: 609,
			gameId: 3518437209105086,
			opts: [
				{ templateId: 2056, huntingZoneId: 183, _value: 609 },
				{ templateId: 2058, huntingZoneId: 183, _value: 609 }
			]
		},
		vgc: {
			type: 49,
			value: 6090,
			gameId: 3518437209089139,
			opts: [
				{ templateId: 2057, huntingZoneId: 183, _value: 6090 },
				{ templateId: 2059, huntingZoneId: 183, _value: 6090 }
			]
		},
		ssstore: {
			type: 9,
			value: 110,
			gameId: 3518437209100999,
			opts: [
				{ templateId: 2002, huntingZoneId: 183, _value: 110 }
			]
		},
		acraft: { // material
			type: 9,
			value: 185,
			gameId: 3518437209106523,
			opts: [
				{ templateId: 2012, huntingZoneId: 183, _value: 185 }
			]
		},
		acraftr: { // recipe
			type: 9,
			value: 195,
			gameId: 3518437209098148,
			opts: [
				{ templateId: 2013, huntingZoneId: 183, _value: 195 }
			]
		},
		scraft: { // material
			type: 9,
			value: 180,
			gameId: 3518437209092228,
			opts: [
				{ templateId: 2006, huntingZoneId: 183, _value: 180 }
			]
		},
		scraftr: { // recipe
			type: 9,
			value: 190,
			gameId: 3518437209097286,
			opts: [
				{ templateId: 2007, huntingZoneId: 183, _value: 190 }
			]
		},
		pcraft: { // material
			type: 9,
			value: 181,
			gameId: 3518437209105369,
			opts: [
				{ templateId: 2008, huntingZoneId: 183, _value: 181 }
			]
		},
		pcraftr: { // recipe
			type: 9,
			value: 191,
			gameId: 3518437209088940,
			opts: [
				{ templateId: 2009, huntingZoneId: 183, _value: 191 }
			]
		},
		ecraft: { // material
			type: 9,
			value: 196,
			gameId: 3518437209109866,
			opts: [
				{ templateId: 2011, huntingZoneId: 183, _value: 196 }
			]
		},
		ecraftr: { // recipe
			type: 9,
			value: 184,
			gameId: 3518437209102356,
			opts: [
				{ templateId: 2010, huntingZoneId: 183, _value: 184 }
			]
		}
	}
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
	if (from_ver === undefined) return { ...DefaultSettings, ...settings };
	else if (from_ver === null) return DefaultSettings;
	else {
		from_ver = Number(from_ver);
		to_ver = Number(to_ver);

		if (from_ver + 1 < to_ver) {
			settings = MigrateSettings(from_ver, from_ver + 1, settings);
			return MigrateSettings(from_ver + 1, to_ver, settings);
		}

		const oldsettings = settings;

		switch (to_ver) {
			default:
				settings = Object.assign(DefaultSettings, {});

				for (const option in oldsettings) {
					if (settings[option] !== undefined) {
						settings[option] = oldsettings[option];
					}
				}
		}

		return settings;
	}
};