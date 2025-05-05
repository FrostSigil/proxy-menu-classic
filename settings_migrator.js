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
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1001, huntingZoneId: 60, _value: 16060 },
				{ templateId: 1001, huntingZoneId: 63, _value: 16063 },
				{ templateId: 1001, huntingZoneId: 59, _value: 16059 },
				{ templateId: 1002, huntingZoneId: 61, _value: 16061 },
				{ templateId: 1002, huntingZoneId: 62, _value: 16062 },
				{ templateId: 1002, huntingZoneId: 67, _value: 16067 },
				{ templateId: 1002, huntingZoneId: 68, _value: 16068 },
				{ templateId: 1003, huntingZoneId: 59, _value: 16059 },
				{ templateId: 1003, huntingZoneId: 62, _value: 16062 },
				{ templateId: 1003, huntingZoneId: 67, _value: 16067 },
				{ templateId: 1004, huntingZoneId: 61, _value: 16061 },
				{ templateId: 1004, huntingZoneId: 65, _value: 16065 },
				{ templateId: 1035, huntingZoneId: 203, _value: 16087 },
				{ templateId: 1103, huntingZoneId: 63, _value: 16063 },
				{ templateId: 2001, huntingZoneId: 183, _value: 70310 },
				{ templateId: 2018, huntingZoneId: 183, _value: 70310 },
				{ templateId: 2019, huntingZoneId: 183, _value: 70310 }
			]
		},
		sstore: {
			type: 9,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1001, huntingZoneId: 359, _value: 250 },
				{ templateId: 1001, huntingZoneId: 360, _value: 250 },
				{ templateId: 1001, huntingZoneId: 361, _value: 250 },
				{ templateId: 1001, huntingZoneId: 362, _value: 250 },
				{ templateId: 1001, huntingZoneId: 365, _value: 250 },
				{ templateId: 1001, huntingZoneId: 367, _value: 250 },
				{ templateId: 1001, huntingZoneId: 368, _value: 250 },
				{ templateId: 2014, huntingZoneId: 183, _value: 250 },
				{ templateId: 2109, huntingZoneId: 183, _value: 250 },
				{ templateId: 2110, huntingZoneId: 183, _value: 250 }
			]
		},
		ssstore: {
			type: 9,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1002, huntingZoneId: 63, _value: 110 },
				{ templateId: 1002, huntingZoneId: 60, _value: 110 },
				{ templateId: 1003, huntingZoneId: 61, _value: 110 },
				{ templateId: 1003, huntingZoneId: 65, _value: 110 },
				{ templateId: 1003, huntingZoneId: 68, _value: 110 },
				{ templateId: 1104, huntingZoneId: 63, _value: 110 },
				{ templateId: 1173, huntingZoneId: 63, _value: 110 },
				{ templateId: 2002, huntingZoneId: 183, _value: 110 }
			]
		},
		bel: {
			type: 50,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1256, huntingZoneId: 63, _value: 41 }
			]
		},
		bsoul: {
			type: 50,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1263, huntingZoneId: 63, _value: 41 }
			]
		},
		vng: {
			type: 49,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 2056, huntingZoneId: 183, _value: 609 },
				{ templateId: 2058, huntingZoneId: 183, _value: 609 }
			]
		},
		vgc: {
			type: 49,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 2057, huntingZoneId: 183, _value: 6090 },
				{ templateId: 2059, huntingZoneId: 183, _value: 6090 }
			]
		},
		acraft: { // material
			type: 9,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1212, huntingZoneId: 63, _value: 185 },
				{ templateId: 1255, huntingZoneId: 63, _value: 185 },
				{ templateId: 1600, huntingZoneId: 59, _value: 185 },
				{ templateId: 1600, huntingZoneId: 60, _value: 185 },
				{ templateId: 1600, huntingZoneId: 61, _value: 185 },
				{ templateId: 1600, huntingZoneId: 62, _value: 185 },
				{ templateId: 1600, huntingZoneId: 65, _value: 185 },
				{ templateId: 1600, huntingZoneId: 67, _value: 185 },
				{ templateId: 1600, huntingZoneId: 68, _value: 185 },
				{ templateId: 2012, huntingZoneId: 183, _value: 185 }
			]
		},
		acraftr: { // recipe
			type: 9,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1215, huntingZoneId: 63, _value: 195 },
				{ templateId: 1254, huntingZoneId: 63, _value: 195 },
				{ templateId: 2013, huntingZoneId: 183, _value: 195 }
			]
		},
		scraft: { // material
			type: 9,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1189, huntingZoneId: 63, _value: 180 },
				{ templateId: 1190, huntingZoneId: 63, _value: 180 },
				{ templateId: 1191, huntingZoneId: 63, _value: 180 },
				{ templateId: 2006, huntingZoneId: 183, _value: 180 }
			]
		},
		scraftr: { // recipe
			type: 9,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1195, huntingZoneId: 63, _value: 190 },
				{ templateId: 1196, huntingZoneId: 63, _value: 190 },
				{ templateId: 1197, huntingZoneId: 63, _value: 190 },
				{ templateId: 2007, huntingZoneId: 183, _value: 190 }
			]
		},
		pcraft: { // material
			type: 9,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1192, huntingZoneId: 63, _value: 181 },
				{ templateId: 1193, huntingZoneId: 63, _value: 181 },
				{ templateId: 1194, huntingZoneId: 63, _value: 181 },
				{ templateId: 1207, huntingZoneId: 63, _value: 182 },
				{ templateId: 1208, huntingZoneId: 63, _value: 182 },
				{ templateId: 1209, huntingZoneId: 63, _value: 182 },
				{ templateId: 1218, huntingZoneId: 63, _value: 183 },
				{ templateId: 1219, huntingZoneId: 63, _value: 183 },
				{ templateId: 1220, huntingZoneId: 63, _value: 183 },
				{ templateId: 2008, huntingZoneId: 183, _value: 181 }
			]
		},
		pcraftr: { // recipe
			type: 9,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1198, huntingZoneId: 63, _value: 191 },
				{ templateId: 1199, huntingZoneId: 63, _value: 191 },
				{ templateId: 1200, huntingZoneId: 63, _value: 192 },
				{ templateId: 1202, huntingZoneId: 63, _value: 192 },
				{ templateId: 1203, huntingZoneId: 63, _value: 192 },
				{ templateId: 1204, huntingZoneId: 63, _value: 192 },
				{ templateId: 1222, huntingZoneId: 63, _value: 193 },
				{ templateId: 1223, huntingZoneId: 63, _value: 193 },
				{ templateId: 1224, huntingZoneId: 63, _value: 193 },
				{ templateId: 2009, huntingZoneId: 183, _value: 191 }
			]
		},
		ecraft: { // material
			type: 9,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1211, huntingZoneId: 63, _value: 184 },
				{ templateId: 2011, huntingZoneId: 183, _value: 196 }
			]
		},
		ecraftr: { // recipe
			type: 9,
			value: null,
			gameId: null,
			opts: [
				{ templateId: 1214, huntingZoneId: 63, _value: 196 },
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