
const moment = require("moment-timezone");
const globalShortcut = global.TeraProxy.GUIMode ? require("electron").globalShortcut : null;

module.exports = function ProxyMenu(mod) {

	mod.dispatch.addDefinition('S_DIALOG', 10, __dirname + '/S_DIALOG.def', true);

	mod.dispatch.addDefinition("C_REQUEST_CONTRACT", 50, [
		["name", "refString"],
		["data", "refBytes"],
		["type", "int32"],
		["target", "int64"],
		["value", "int32"],
		["name", "string"],
		["data", "bytes"]
	], true);
 
	mod.dispatch.addDefinition("S_VOTE_DISMISS_PARTY", 1, [
		["accept", "byte"]
	]);

	mod.dispatch.addDefinition("C_VOTE_DISMISS_PARTY", 1, [
		["accept", "byte"]
	], true);

	const COMMAND = "m";
	const menu = require("./menu");
	const keybinds = new Set();
	const weather = {
		normal: "acn_aeroset.AERO.SPR_Corruption_AERO",
		snow: "BF_snowBattle_aeroset.AERO.BF_snowBattle_renew_AERO",
		night: "EX_Halloween_T42_AEROSet.AERO.EX_Halloween_Inside_Aeroset",
		dark: "Kubel_Fortress_Pegasus_AERO.AERO.Kubel_Fortress_Pegasus_AERO"
	};
	const { player, entity, library } = mod.require.library;
	let contract = null;
	let contractType = null;
	let debug = false;
	let debugData = [];
	let premiumAvailable = false;
	let premiumAddedSlots = new Map();

	mod.game.initialize("inventory");

	Object.keys(mod.settings.npc).forEach(name => {
		mod.command.add(name, () => {
			const npc = mod.settings.npc[name];
			const buffer = Buffer.alloc(4);

			buffer.writeUInt32LE(npc.value);
			mod.send("C_REQUEST_CONTRACT", 50, {
				type: npc.type,
				target: npc.gameId,
				value: npc.value,
				name: "",
				data: buffer
			});
		});
	});

	if (menu.pages !== undefined) {
		Object.values(menu.pages).forEach(page =>
			bindHotkeys(page)
		);
	}

	bindHotkeys(menu.categories);
	keybinds.add(mod.settings.hotkey);
	if (globalShortcut) {
		globalShortcut.register(mod.settings.hotkey, () => show());
	}

	mod.hook("C_CONFIRM_UPDATE_NOTIFICATION", 1, { order: 100010 }, () => false);
	mod.hook("C_ADMIN", 1, { order: 100010, filter: { fake: null, silenced: false, modified: null } }, event => {
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

	mod.hook("S_RETURN_TO_LOBBY", "raw", () => {
		premiumAvailable = false;
	});

	mod.hook("S_PCBANGINVENTORY_DATALIST", 1, { order: Infinity, filter: { fake: null } }, event => {
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
				slot: size + index,
				type: 1,
				skill: 0,
				item: slot.id,
				amount: 1,
				cooldown: 0
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

	mod.hook("S_REQUEST_CONTRACT", 1, event => {
		contract = event.id;
		contractType = event.type;
		if (debug) {
			debugData.push(`"type": ${event.type}`);
			debugData.forEach(data => {
				console.log(data);
				mod.command.message(data);
			});
			debugData = [];
		}
	});

	mod.hook("S_DIALOG", 10, event => { // just spam F
		if (debug) {
			debugData = [
				"Detected NPC:",
				`   "value": ${event.buttons[0]?.type}`,
				`   "gameId": ${event.gameId}`,
				`   "templateId": ${event.templateId}`,
				`   "huntingZoneId": ${event.huntingZoneId}`
			];
		}
		if (mod.settings.spamf) {
			if (!event.buttons.length) return;
			for (let i = 0; i < event.buttons.length; i++) {
				if ([1, 2, 3, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46].includes(event.buttons[i].type)) event.buttons[i].type = 33;
			}		
			event.type = 1;
			return true;
		}
	});

	mod.hook("S_STORE_SELL_LIST", 1, event => {
		if (!debug) return;
		debugData.push(`   "value": ${event.button}`);
		debugData.forEach(data => {
			console.log(data);
			mod.command.message(data);
		});
 
		debugData = [];
	});

	mod.hook("S_SPAWN_NPC", 11, event => { // NPC суммонер
		Object.entries(mod.settings.npc).forEach(([name, npc]) => {
			if (npc.opts === undefined) return;
			const opt = npc.opts.find(option => option.templateId === event.templateId && option.huntingZoneId === event.huntingZoneId);

			if (opt) {
				mod.settings.npc[name].value = opt._value;
				mod.settings.npc[name].gameId = parseInt(event.gameId);
			}
			if (opt) {
				npc.gameId = parseInt(event.gameId);
			}
		});
	});

	mod.hook("S_ABNORMALITY_BEGIN", 3, (event) => { // отключение пьяного экрана
		if (!mod.game.me.is(event.target)) return;
		if (mod.settings.drunk) {
			if (mod.settings.drinkAbnormalities.includes(event.id))
				return false;
		}
	});

	mod.hook("S_PLAY_MOVIE", 1, (event) => { // блокировка видео заставок
		if (mod.settings.blockscene) {
			mod.send("C_END_MOVIE", 1, { unk: 1, ...event });
			return false;
		}
	});

	mod.hook("S_START_ACTION_SCRIPT", "*", event => { // блокировка видео заставок
		if (mod.settings.blockscene && [40003, 60029801, 9782001, 9783001, 9783003, 9794001, 9794002, 9794004, 9794005, 9794006].includes(event.script)) return false;
	});

	mod.hook("S_BEGIN_THROUGH_ARBITER_CONTRACT", 1, event => { // автопринятие пати
		if (!mod.settings.autoaccept) return;
		autoAcceptPartyInvite(event);
	});

	mod.hook("S_VOTE_DISMISS_PARTY", 1, () => { // розпуск пати
		if (!mod.settings.autoaccept) return;
		mod.send("C_VOTE_DISMISS_PARTY", 1, { accept: true	});
	});

	mod.hook("S_VOTE_RESET_ALL_DUNGEON", 1, () => { // сброс данжа
		if (!mod.settings.autoaccept) return;
		mod.send("C_VOTE_RESET_ALL_DUNGEON", 1, { accept: true });
	});

	mod.hook("S_PARTY_LOOTING_METHOD_VOTE", 1, () => { // смена метода лута
		if (!mod.settings.autoaccept) return;
		mod.send("C_PARTY_LOOTING_METHOD_VOTE", 1, { accept: true });
	});

	mod.hook("S_LOAD_TOPO", 3, () => { // смена погоды
		if (mod.settings.aeromanual) {
			meteo();
		}
	});

	mod.command.add("clear", () => {
		mod.command.message("\n".repeat(75));
	});

	mod.command.add(COMMAND, {
		$none: () => show(),
		premium: () => {
			mod.settings.premiumSlotEnabled = !mod.settings.premiumSlotEnabled;
			mod.command.message(`Add item to premium panel: ${mod.settings.premiumSlotEnabled ? "enabled" : "disabled"}`);
		},
		hotkey: arg => {
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
		use: id => useItem(id),
		id: id => getItemIdChatLink(id),
		debug: () => {
			debug = !debug;
			mod.command.message(`Debug mode ${debug ? "enabled" : "disabled"}.`);
		},
		$default: arg => {
			if (arg[0] === "$") {
				show(arg.slice(1));
			}
		},
		lobby: () => {
			mod.send("C_RETURN_TO_LOBBY", 1);
		},
		drop: () => {
			mod.send("C_LEAVE_PARTY", 1);
		},
		disband: () => {
			mod.send("C_DISMISS_PARTY", 1);
		},
		reset: () => {
			mod.send("C_RESET_ALL_DUNGEON", 1);
		},
		broker: () => {
			mod.send("S_NPC_MENU_SELECT", 1, { type: 28 });
		},
		npc: arg => { // bank(1), gbank(3), pbank(9), cbank(12);
			cRequestContract(27, "0", arg, "", 4);
		},
		np: () => {
			cRequestContract(9, 3518437209083625, 70310, "0", 4);
		},
		invite: arg => {
			cRequestContract(27, "0", 0, arg, 1);
			mod.command.message(`Приглашаю в группу ${arg}`);
		},
		autoaccept: () => {
			mod.settings.autoaccept = !mod.settings.autoaccept;
			mod.command.message(`Авто принятие пати / сброса / ролла : ${mod.settings.autoaccept ? "Включено" : "Выключено"}`);
		},
		et: (arg) => {
			mod.send("C_SELECT_EVENT_MATCHING", 1, {
				id: arg
			});
		},
		spamf: () => {
			mod.settings.spamf = !mod.settings.spamf;
			mod.command.message(`JustSpam F: ${mod.settings.spamf ? "Включено" : "Выключено"}`);
		},
		drunk: () => {
			mod.settings.drunk = !mod.settings.drunk;
			mod.command.message(`Скрытие пьяного экрана: ${mod.settings.drunk ? "Скрываю" : "Не скрываю"}`);
		},
		scene: () => {
			mod.settings.blockscene = !mod.settings.blockscene;
			mod.command.message(`Пропуск видеозаставок: ${mod.settings.blockscene ? "Включен" : "Выключен"}`);
		},
		aero: (arg) => {
			if (mod.settings.aeromanual) {
				if (weather[arg]) {
					if (mod.settings.aero === arg) {
						mod.settings.aeromanual = false;
						mod.settings.aero = "normal";
						mod.command.message("Погода отключена.");
					} else {
						mod.settings.aero = arg;
						mod.command.message(`Погода сменилась на: ${arg}`);
					}
					meteo();
				} else {
					mod.command.message("Некорректная погода. Доступные варианты: normal, snow, dark, night.");
				}
			} else if (weather[arg]) {
				mod.settings.aeromanual = true;
				mod.settings.aero = arg;
				mod.command.message(`Погода включена: ${arg}`);
				meteo();
			} else {
				mod.command.message("Некорректная погода. Доступные варианты: normal, snow, dark, night.");
			}
		}
	});

	function cRequestContract(type, target, value, name, dataBuffer) {
		const buffer = Buffer.alloc(dataBuffer);
		buffer.writeUInt32LE(value);
		mod.send("C_REQUEST_CONTRACT", 50, {
			type, target, value, name, data: buffer
		});
	}

	function autoAcceptPartyInvite(event) {
		mod.send("C_REPLY_THROUGH_ARBITER_CONTRACT", 1, {
			type: event.type,
			id: event.id,
			response: 1,
			recipient: event.sender
		});
		if (event.type === 4) {
			mod.command.message(`Вступаю в группу к ${event.sender}`);
		} else if (event.type === 5) {
			mod.command.message(`Принимаю в группу ${event.sender}`);
		}
	}

	function meteo() {
		if (mod.settings.aero === "normal") {
			mod.send("S_START_ACTION_SCRIPT", 3, {
				gameId: mod.game.me.gameId,
				script: 105,
				unk2: 0
			});
		} else {
			const aeroSet = weather[mod.settings.aero] || weather.normal;
			mod.send("S_AERO", 1, {
				enabled: true,
				blendTime: 1,
				aeroSet: aeroSet
			});
		}
	}

	function getItemIdChatLink(chatLink) {
		const id = chatLink.match(/#(\d*)@/);
		if (id) {
			mod.command.message(`itemId: ${(Number(id[1]))}`);
		}
		return null;
	}

	function show(page = null) {
		const categories = menu.pages !== undefined && menu.pages[page] ? menu.pages[page] : menu.categories;
		const tmpData = [];

		if (page !== null) {
			tmpData.push(
				{ text: "<font color=\"#9966cc\" size=\"+20\">[Back]</font>", command: COMMAND },
				{ text: "<br>" }
			);
		}

		Object.keys(categories).forEach(category => {
			tmpData.push(
				{ text: `<font color="#cccccc" size="+22">${category}</font>` },
				{ text: "<br>" }
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
					tmpData.push({ text: "<br>" });
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
						{ text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
						{ text: `<font color="${
							menuEntry.color || "#4de19c"}" size="+${
							menuEntry.size || "20"}">[${
							menuEntry.name || menuEntry.command}]</font>`,
						command: `${menuEntry.command}` }
					);
				} else {
					tmpData.push(
						{ text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
						{ text: `<font color="#777777" size="+${
							menuEntry.size || "20"}">[${
							menuEntry.name || menuEntry.command}]</font>` }
					);
				}
			});
			tmpData.push(
				{ text: "<font size=\"+2\"><br><br></font>" }
			);
		});
		const command = page ? `${COMMAND} $${page}` : COMMAND;
		tmpData.push(
			{ text: "<br>" },
			{ text: "<font color=\"#9966cc\" size=\"+15\">[Reload]</font>", command: `proxy reload proxy-menu; ${command}` },
			{ text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
			{ text: `<font color="${color(debug)}" size="+15">[Debug]</font>`, command: `m debug; ${command}` },
			{ text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
			{ text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
			{ text: `<font color="#dddddd" size="+18">${moment().tz("Europe/Berlin").format("HH:mm z")} / ${moment().tz("Europe/Moscow").format("HH:mm z")}</font>` }
		);
		parse(tmpData, `<font>Menu [${mod.settings.hotkey}]</font>`);
	}

	function color(e) {return e ? "#04ff1c" : "#ff0000";}

	function useItem(id) {
		if (!player) return;
		mod.send("C_USE_ITEM", 3, {
			gameId: mod.game.me.gameId,
			id: id,
			amount: 1,
			loc: player.loc,
			w: player.w,
			unk4: true
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
		mod.send("S_ANNOUNCE_UPDATE_NOTIFICATION", 1, { id: 0, title, body });
	}

	this.saveState = () => ({
		premiumAvailable,
		premiumAddedSlots
	});

	this.loadState = state => {
		premiumAvailable = state.premiumAvailable;
		premiumAddedSlots = state.premiumAddedSlots;
	};

	this.destructor = () => {
		keybinds.forEach(keybind => globalShortcut.unregister(keybind));
		mod.command.remove(COMMAND);
	};
};