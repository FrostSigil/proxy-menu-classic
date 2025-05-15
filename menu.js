/* eslint-disable no-dupe-keys */
/* eslint-disable quote-props,  comma-dangle */
"use strict";

// Цвета
const c = {
	"w": "#ffffff", // белый
	"br": "#bc8f8f", // коричневый
	"o": "#daa520", // оранжевый
	"p": "#ed5d92", // розовый
	"lp": "#ffb7c5", // светло-розовый
	"r": "#fe6f5e", // красный
	"g": "#4de19c", // зеленый
	"lg": "#5bc0be", // светло-зеленый
	"v": "#9966cc", // фиолетовый
	"lv": "#e0b0ff", // светло-фиолетовый
	"b": "#436eee", // синий
	"lb": "#08b3e5", // светло-синий
	"gr": "#778899", // серый
	"y": "#c0b94d", // желтый
};

// Дочступные ключи записи:
//   name    -- Название пункта меню
//   color   -- Цвет пункта меню
//   keybind -- Установка горячей клавиши
//   ifcmd   -- Фильтр (отображение) пункта меню, если указанная команда найдена
//   ifnocmd -- Фильтр (отображение) пункта меню, если указанная команда не найдена
//   class   -- Фильтр (отображение) пункта меню по игровому классу:
//                  warrior, lancer, slayer, berserker, sorcerer, archer, priest,
//                  elementalist, soulless
//
// Встроенный команды:
//   mm et  [quest] [instance] -- Телепортация по Авангарду
//   mm use [id предмета]      -- Использовать предмет из инвентаря

// Настройка премиум-слотов
module.exports.premium = [
	{ command: "bank", id: 60264 },
	{ command: "m broker", id: 60265 },
	{ command: "store", id: 60262 },
	{ command: "m", id: 352 },
];

// Настройка меню
module.exports.categories = {
	Merchants: [
		{ command: "ab", name: "Autobank", color: c.p, ifcmd: "ab", ifcmd: "ab" },
		{ command: "banker", name: "Autobank", color: c.p, ifcmd: "banker", ifcmd: "banker" },
		{ command: "bank", name: "Bank", color: c.lp },
		{ command: "m pbank", name: "Spec. storage", color: c.lp },
		{ command: "gbank", name: "Guild bank", color: c.lp },
		{},
		{ command: "m broker", name: "Broker", color: c.lb },
		{ command: "store", name: "Merchant", color: c.g },
		{ command: "ssstore", name: "Crystals", color: c.lg },
		{ command: "sstore", name: "S.store", color: c.y },
		{},
		{ command: "vng", name: "Vanguard", color: c.b },
		{ command: "vgc", name: "Crystals", color: c.b },
		{ command: "bel", name: "Bellicarium", color: c.v },
		{},
		{ command: "acraft", name: "Alchemy", color: c.p },
		{ command: "acraftr", name: "R", color: c.p },
		{ command: "scraft", name: "Smelting", color: c.o },
		{ command: "scraftr", name: "R", color: c.o },
		{ command: "pcraft", name: "Processing", color: c.y },
		{ command: "pcraftr", name: "R", color: c.y },
		{ command: "ecraft", name: "Etching", color: c.lb },
		{ command: "ecraftr", name: "R", color: c.lb }
	],
	Main: [
		// https://github.com/tera-classic-mods/auto-loot
		{ command: "loot auto", name: "Autoloot", color: c.p, ifcmd: "loot" },
		{ ifcmd: "translate" },
		// https://github.com/tera-classic-mods/translate-chat
		{ command: "translate send", name: "Auto translation", color: c.lb, ifcmd: "translate" },
		// https://github.com/tera-classic-mods/gathering-markers
		{ command: "gat ui", name: "Gathering markers", color: c.lg },
		{ ifcmd: "logger" },
		{ command: "logger", name: "Loger menu", color: c.r, ifcmd: "logger" },
		{ command: "clear", name: "Clear chat", color: c.w },
		{ ifcmd: "fps" },
		{ command: "fps", name: "FPS Menu", color: c.y, ifcmd: "fps" },
		{ command: "fps 0", name: "FPS 0", color: c.w, ifcmd: "fps" },
		{ command: "fps 1", name: "FPS 1", color: c.w, ifcmd: "fps" },
		{ command: "fps 2", name: "FPS 2", color: c.w, ifcmd: "fps" },
		{ command: "fps 3", name: "FPS 3", color: c.w, ifcmd: "fps" }
	],
	Weather: [
		{ command: "m aero normal", name: "Default", color: c.g },
		{ command: "m aero snow", name: "Snow", color: c.lb },
		{ command: "m aero night", name: "Night", color: c.o },
		{ command: "m aero dark", name: "Dark", color: c.v }
	],
	Other: [
		{ command: "m drop", name: "Leave party", color: c.y },
		{ command: "m reset", name: "Reset", color: c.lb },
		{ command: "m disband", name: "Disband", color: c.br },
		{ command: "m lobby", name: "Characters", color: c.p },
		{},
		{ ifnocmd: "tp" },
		{ command: "tp zone", name: "Teleport", color: c.b, ifcmd: "tp" },
		{ command: "tp to", name: "Zone", color: c.r, ifcmd: "tp" },
		{ command: "tp party", name: "Party", color: c.lg, ifcmd: "tp" },
		{ command: "tp blink 100", name: "Blink front", color: c.п, ifcmd: "tp" },
		{ command: "tp up 350", name: "Blink Up", color: c.g, ifcmd: "tp" },
		{ ifcmd: "tp" },
		{ command: "guide", name: "On/Off", color: c.o, ifcmd: "guide" },
		{ command: "guide ui", name: "Settings", ifcmd: "guide" },
		{ command: "guide debug ui", name: "Debug", color: c.b, ifcmd: "guide" },
		{ ifcmd: "guide" },
		{ command: "m $setting", name: "Others Menu Settings", color: c.v }
	],
};

module.exports.pages = {
	"setting": {
		Settings: [
			{ command: "m scene", name: "Skipping video intros", color: c.lp },
			{},
			{ command: "m drunk", name: "Disabling drunk screen", color: c.lg },
			{},
			{ command: "m spamf", name: "JustSpam F", color: c.lv },
			{},
			{ command: "m autoaccept", name: "Auto accept party", color: c.lg }
		],
		"HSDN mods": [
			{ command: "m premium", name: "Add. buttons VIP-panel", color: c.y },
			{ ifcmd: "tp" },
			{ command: "tp premium", name: "Teleport buttons VIP-panel", color: c.lb, ifcmd: "tp" },
			{ ifcmd: "back" },
			{ command: "back ui", name: "Backstab menu", color: c.r, ifcmd: "back" }
		],
	}
};