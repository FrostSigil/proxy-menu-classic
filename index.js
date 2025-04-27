
const moment = require("moment-timezone");
const globalShortcut = global.TeraProxy.GUIMode ? require("electron").globalShortcut : null;

module.exports = function ProxyMenu(mod) {

	mod.dispatch.addDefinition("C_REQUEST_CONTRACT", 50, [
		["name", "refString"],
		["data", "refBytes"],
		["type", "int32"],
		["target", "int64"],
		["value", "int32"],
		["name", "string"],
		["data", "bytes"]
	], true);

	const COMMAND = "m";
	const menu = require("./menu");
	const keybinds = new Set();
	let player = null;
	let debug = false;
	let premiumAvailable = false;
	let premiumAddedSlots = new Map();

	mod.game.initialize("inventory");

	if (menu.pages !== undefined) {
		Object.values(menu.pages).forEach(page =>
			bindHotkeys(page)
		);
	}

	bindHotkeys(menu.categories);

	keybinds.add(mod.settings.hotkey);
	globalShortcut.register(mod.settings.hotkey, () => show());

	mod.hook("C_CONFIRM_UPDATE_NOTIFICATION", 1, { "order": 100010 }, () => false);
	mod.hook("C_ADMIN", 1, { "order": 100010, "filter": { "fake": false, "silenced": false, "modified": null } }, event => {
		if (event.command.includes(";")) {
			event.command.split(";").forEach(cmd => {
				try {
					mod.command.exec(cmd);
				} catch (e) {
					return;
				}
			});
			return false;
		}
	});

	mod.hook("S_SPAWN_ME", 3, event => { player = event; });
	mod.hook("C_PLAYER_LOCATION", 5, event => { player = event; });

	mod.hook("S_RETURN_TO_LOBBY", "raw", () => {
		premiumAvailable = false;
	});

	mod.hook("S_PCBANGINVENTORY_DATALIST", 1, { "order": Infinity, "filter": { "fake": null } }, event => {
		if (!mod.settings.premiumSlotEnabled || menu.premium.length === 0) return;
		const size = event.inventory.length;
		premiumAddedSlots.clear();
		premiumAvailable = true;
		menu.premium.forEach((slot, index) => {
			if (slot.class) {
				const classes = (Array.isArray(slot.class) ? slot.class : [slot.class]);
				if (!classes.includes(mod.game.me.class)) {
					return;
				}
			}
			if (slot.ifcmd && !mod.command.base.hooks.has(slot.ifcmd.toLocaleLowerCase())) {
				return;
			}
			if (slot.ifnocmd && mod.command.base.hooks.has(slot.ifnocmd.toLocaleLowerCase())) {
				return;
			}
			if (!mod.command.base.hooks.has(slot.command.split(" ")[0])) {
				return;
			}
			premiumAddedSlots.set(size + index, index);
			event.inventory.push({
				"slot": size + index,
				"type": 1,
				"skill": 0,
				"item": slot.id,
				"amount": 1,
				"cooldown": 0
			});
		});
		return true;
	});

	mod.hook("C_PCBANGINVENTORY_USE_SLOT", 1, event => {
		if (menu.premium.length === 0 || !premiumAddedSlots.has(event.slot)) return;
		const slot = menu.premium[premiumAddedSlots.get(event.slot)];
		if (slot.command) {
			mod.command.exec(slot.command);
		}
	});

	mod.command.add(COMMAND, {
		"$none": () => show(),
		"premium": () => {
			mod.settings.premiumSlotEnabled = !mod.settings.premiumSlotEnabled;
			mod.command.message(`Add item to premium panel: ${mod.settings.premiumSlotEnabled ? "enabled" : "disabled"}`);
		},
		"hotkey": arg => {
			if (!arg) {
				mod.command.message(`Current hotkey: ${mod.settings.hotkey}`);
			} else {
				if (arg.toLowerCase() !== mod.settings.hotkey.toLowerCase()) {
					const hotkey = arg.toLowerCase().split("+").map(w => w[0].toUpperCase() + w.substr(1)).join("+");
					try {
						globalShortcut.register(hotkey, () => show());
						globalShortcut.unregister(mod.settings.hotkey);
						keybinds.add(hotkey);
						keybinds.delete(mod.settings.hotkey);
						mod.settings.hotkey = hotkey;
					} catch (e) {
						return mod.command.message(`Invalid hotkey: ${hotkey}`);
					}
				}
				mod.command.message(`New hotkey: ${mod.settings.hotkey}`);
			}
		},
		"use": id => useItem(id),
		"debug": () => {
			debug = !debug;
			mod.command.message(`Debug mode ${debug ? "enabled" : "disabled"}.`);
		},
		"$default": arg => {
			if (arg[0] === "$") {
				show(arg.slice(1));
			}
		},
		"broker": () => {
			mod.send("S_NPC_MENU_SELECT", 1, { type: 28 });
		},
		"bank": () => {
			openNPC(27, 1);
		}
	});

	function openNPC(type, value) {
		const buffer = Buffer.alloc(4);
		buffer.writeUInt32LE(1);
		mod.send("C_REQUEST_CONTRACT", 50, {
			type,
			target: "0",
			value,
			name: "",
			data: buffer
		});
	}

	function show(page = null) {
		const categories = menu.pages !== undefined && menu.pages[page] ? menu.pages[page] : menu.categories;
		const tmpData = [];

		if (page !== null) {
			tmpData.push(
				{ "text": "<font color=\"#9966cc\" size=\"+20\">[Back]</font>", "command": COMMAND },
				{ "text": "<br>" }
			);
		}

		Object.keys(categories).forEach(category => {
			tmpData.push(
				{ "text": `<font color="#cccccc" size="+22">${category}</font>` },
				{ "text": "<br>" }
			);
			categories[category].forEach(menuEntry => {
				if (menuEntry.class) {
					const classes = (Array.isArray(menuEntry.class) ? menuEntry.class : [menuEntry.class]);
					if (!classes.includes(mod.game.me.class)) {
						return;
					}
				}
				if (menuEntry.ifcmd && !mod.command.base.hooks.has(menuEntry.ifcmd.toLocaleLowerCase())) {
					return;
				}
				if (menuEntry.ifnocmd && mod.command.base.hooks.has(menuEntry.ifnocmd.toLocaleLowerCase())) {
					return;
				}
				if (!menuEntry.command || !menuEntry.name) {
					tmpData.push({ "text": "<br>" });
					return;
				}
				const commandParts = menuEntry.command.split(" ");
				let available = mod.command.base.hooks.has(commandParts[0]);
				if (commandParts[0].toLocaleLowerCase() === COMMAND && commandParts[1] !== undefined && commandParts[1].toLocaleLowerCase() === "use") {
					available = false;
					const items = mod.game.inventory.findAll(parseInt(commandParts[2]));
					if (items.length !== 0) {
						available = items[0].amount > 0;
					}
				}
				if (available) {
					tmpData.push(
						{ "text": "&nbsp;&nbsp;&nbsp;&nbsp;" },
						{ "text": `<font color="${
							menuEntry.color || "#4de19c"}" size="+${
							menuEntry.size || "20"}">[${
							menuEntry.name || menuEntry.command}]</font>`,
						"command": `${menuEntry.command}` }
					);
				} else {
					tmpData.push(
						{ "text": "&nbsp;&nbsp;&nbsp;&nbsp;" },
						{ "text": `<font color="#777777" size="+${
							menuEntry.size || "20"}">[${
							menuEntry.name || menuEntry.command}]</font>` }
					);
				}
			});
			tmpData.push(
				{ "text": "<font size=\"+2\"><br><br></font>" }
			);
		});
		const command = page ? `${COMMAND} $${page}` : COMMAND;
		tmpData.push(
			{ "text": "<br>" },
			{ "text": "<font color=\"#9966cc\" size=\"+15\">[Reload]</font>", "command": `proxy reload proxy-menu; ${command}` },
			{ "text": "&nbsp;&nbsp;&nbsp;&nbsp;" },
			{ "text": `<font color="#dddddd" size="+18">${moment().tz("Europe/Berlin").format("HH:mm z")} / ${moment().tz("Europe/Moscow").format("HH:mm z")}</font>` }
		);
		parse(tmpData, `<font>Menu [${mod.settings.hotkey}]</font>`);
	}

	function useItem(id) {
		if (!player) return;
		mod.send("C_USE_ITEM", 3, {
			"gameId": mod.game.me.gameId,
			"id": id,
			"amount": 1,
			"loc": player.loc,
			"w": player.w,
			"unk4": true
		});
	}

	function bindHotkeys(categories) {
		Object.keys(categories).forEach(category =>
			Object.keys(categories[category]).forEach(command => {
				if (categories[category][command].keybind) {
					try {
						globalShortcut.register(categories[category][command].keybind, () =>
							mod.command.exec(categories[category][command].command)
						);
						keybinds.add(categories[category][command].keybind);
					} catch (e) {}
				}
			})
		);
	}

	function parse(array, title) {
		let body = "";
		try {
			array.forEach(data => {
				if (body.length >= 16000)
					throw "GUI data limit exceeded, some values may be missing.";
				if (data.command)
					body += `<a href="admincommand:/@${data.command};">${data.text}</a>`;
				else if (!data.command)
					body += `${data.text}`;
				else
					return;
			});
		} catch (e) {
			body += e;
		}
		mod.send("S_ANNOUNCE_UPDATE_NOTIFICATION", 1, { "id": 0, title, body });
	}

	this.saveState = () => ({
		player,
		premiumAvailable,
		premiumAddedSlots
	});

	this.loadState = state => {
		player = state.player;
		premiumAvailable = state.premiumAvailable;
		premiumAddedSlots = state.premiumAddedSlots;
	};

	this.destructor = () => {
		keybinds.forEach(keybind => globalShortcut.unregister(keybind));
		mod.command.remove(COMMAND);
	};
};