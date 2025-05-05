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
	"Торговцы": [
		{ command: "ab", name: "@", color: c.p, ifcmd: "translate" },
		{ command: "bank", name: "Банк", color: c.lp },
		// { command: "m pbank", name: "Перс. хранилище", color: c.lp },
		// { command: "m cbank", name: "Костюмы", color: c.lp },
		{ command: "gbank", name: "Банк гильдии", color: c.lp },
		{},
		{ command: "m broker", name: "Брокер", color: c.lb },
		{ command: "store", name: "Торговец", color: c.g },
		{ command: "ssstore", name: "Кристаллы", color: c.lg },
		{ command: "sstore", name: "Редкости", color: c.y },
		{ command: "bel", name: "Белликариум", color: c.v },
		{},
		{ command: "vng", name: "Авангард", color: c.b },
		{ command: "vgc", name: "Кристаллы", color: c.b },
		{ command: "bsoul", name: "Душегубы", color: c.v },
		{},
		{ command: "acraft", name: "Алхимия", color: c.p },
		{ command: "acraftr", name: "R", color: c.p },
		{ command: "scraft", name: "Оружка", color: c.o },
		{ command: "scraftr", name: "R", color: c.o },
		{ command: "pcraft", name: "Броня", color: c.y },
		{ command: "pcraftr", name: "R", color: c.y },
		{ command: "ecraft", name: "Грава", color: c.lb },
		{ command: "ecraftr", name: "R", color: c.lb },
	],
	"Основное": [
		// https://github.com/tera-classic-mods/auto-loot
		{ command: "loot auto", name: "Автолут", color: c.p, ifcmd: "loot" },
		// https://github.com/tera-classic-mods/anti-cc
		{ command: "cc", name: "Антиоткид", color: c.y, ifcmd: "cc" },
		{ ifcmd: "translate" },
		// https://github.com/tera-classic-mods/translate-chat
		{ command: "translate send", name: "Автоперевод", color: c.lb, ifcmd: "translate", },
		// https://github.com/tera-classic-mods/gathering-markers
		{ command: "gat ui", name: "Сбор", color: c.lg },
		{ ifcmd: "logger" },
		{ command: "logger", name: "Loger menu", color: c.r, ifcmd: "logger" },
		{ command: "clear", name: "Очистить чат", color: c.w },
	],
	"Погода": [
		{ command: "m aero normal", name: "Нормально", color: c.w },
		{ command: "m aero snow", name: "Снег", color: c.lb },
		{ command: "m aero night", name: "Сумерки", color: c.b },
		{ command: "m aero dark", name: "Ночь", color: c.br },
	],
	"Разное": [
		{ command: "m drop", name: "Покинуть групу", color: c.y },
		{ command: "m reset", name: "Сброс", color: c.lb },
		{ command: "m disband", name: "Распустить", color: c.br },
		{ command: "m lobby", name: "Выбор Персонажей", color: c.p },
		{},
		{ ifnocmd: "tp" },
		{ command: "tp zone", name: "Телепорт", color: c.b, ifcmd: "tp" },
		{ command: "tp to", name: "Зона", color: c.r, ifcmd: "tp" },
		{ command: "tp fav", name: "Избраное", color: c.o, ifcmd: "tp" },
		{ command: "tp party", name: "Группа", color: c.lg, ifcmd: "tp" },
		{ command: "tp blink 100", name: "Блинк вперёд", color: c.п, ifcmd: "tp", keybind: "ctrl+w" },
		{ command: "tp up 350", name: "Блинк вверх", color: c.g, ifcmd: "tp", keybind: "ctrl+q" },
		{ ifcmd: "tp" },
		{ command: "m $setting", name: "Настройки", color: c.v },
	],
};

module.exports.pages = {
	"loger": {
		"Reload mods": [
			{ ifcmd: "cc" },
			{ command: "proxy reload anti-cc", name: "Anti-CC reload", color: c.p, ifcmd: "cc" },
			{ ifcmd: "loot" },
			{ command: "proxy reload auto-loot", name: "auto-loot", color: c.y, ifcmd: "loot" },
		],
	},
	"setting": {
		"Настройки": [
		//	{ command: "m hidename", name: "Скрытие имени персонажа", color: c.p },
		//	{},
			{ command: "m scene", name: "Пропуск видео заставок", color: c.lp },
			{},
			{ command: "m drunk", name: "Отключение пьяного экрана", color: c.lg },
			{},
			{ command: "m spamf", name: "Just spam F диалогов с NPC", color: c.lv },
			{},
		//	{ command: "m tolobby", name: "Отключение таймера при выходе на выбор персонажей", color: c.y },
		//	{},
			{ command: "m autoaccept", name: "Авто принятие приглашения в пати", color: c.g },
		//	{},
		//	{ command: "m autobox", name: "Авто открытие коробок в один клик", color: c.v },
		],
		"HSDN mods": [
			{ command: "m premium", name: "Меню доп. кнопки на VIP панели", color: c.y },
			{ ifcmd: "tp" },
			{ command: "tp premium", name: "Телепорт доп. кнопка на VIP панели", color: c.lb, ifcmd: "tp" },
			{ ifcmd: "atlas" },
			{ command: "atlas premium", name: "Атлас доп. кнопка на VIP панели", color: c.lg, ifcmd: "atlas" },
			{ ifcmd: "back" },
			{ command: "back ui", name: "Backstab открыть меню настройки", color: c.r, ifcmd: "back" },
			{ ifcmd: "setlock" },
			{ command: "setlock", name: "Запрет изменение настроек (чата/интерфейса)", color: c.w, ifcmd: "setlock" },
		],
	}
};