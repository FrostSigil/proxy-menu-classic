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
	{ command: "m bank", id: 60264 },
	{ command: "m broker", id: 60265 },
	{ command: "m store", id: 60262 },
	{ command: "m", id: 352 }
];

// Настройка меню
module.exports.categories = {
	"Торговцы": [
		{ command: "ab", name: "Autobank", color: c.p, ifcmd: "ab", ifcmd: "ab" },
		{ command: "banker", name: "Autobank", color: c.p, ifcmd: "banker", ifcmd: "banker" },
		{ command: "m bank", name: "Банк", color: c.lp },
		{ command: "m pbank", name: "Перс. хранилище", color: c.lp },
		{ command: "m gbank", name: "Банк гильдии", color: c.lp },
		{},
		{ command: "m broker", name: "Брокер", color: c.lb },
		{ command: "m store", name: "Торговец", color: c.g },
		{ command: "m ssstore", name: "Кристаллы", color: c.lg },
		{ command: "m sstore", name: "Редкости", color: c.y },
		{},
		{ command: "m vng", name: "Авангард", color: c.b },
		{ command: "m vgc", name: "Кристаллы", color: c.b },
		{ command: "m bel", name: "Белликариум", color: c.v },
		{},
		{ command: "m acraft", name: "Алхимия", color: c.p },
		{ command: "m acraftr", name: "R", color: c.p },
		{ command: "m scraft", name: "Оружка", color: c.o },
		{ command: "m scraftr", name: "R", color: c.o },
		{ command: "m pcraft", name: "Броня", color: c.y },
		{ command: "m pcraftr", name: "R", color: c.y },
		{ command: "m ecraft", name: "Грава", color: c.lb },
		{ command: "m ecraftr", name: "R", color: c.lb }
	],
	"Основное": [
		// https://github.com/tera-classic-mods/auto-loot
		{ command: "loot auto", name: "Автолут", color: c.p, ifcmd: "loot" },
		{ ifcmd: "translate" },
		// https://github.com/tera-classic-mods/translate-chat
		{ command: "translate send", name: "Автоперевод", color: c.lb, ifcmd: "translate", },
		// https://github.com/tera-classic-mods/gathering-markers
		{ command: "gat ui", name: "Сбор", color: c.lg },
		{ ifcmd: "logger" },
		{ command: "logger", name: "Loger menu", color: c.r, ifcmd: "logger" },
		{ command: "clear", name: "Очистить чат", color: c.w },
		{ ifcmd: "fps" },
		{ command: "fps", name: "FPS Menu", color: c.y, ifcmd: "fps" },
		{ command: "fps 0", name: "FPS 0", color: c.w, ifcmd: "fps" },
		{ command: "fps 1", name: "FPS 1", color: c.w, ifcmd: "fps" },
		{ command: "fps 2", name: "FPS 2", color: c.w, ifcmd: "fps" },
		{ command: "fps 3", name: "FPS 3", color: c.w, ifcmd: "fps" }
	],
	"Погода": [
		{ command: "m aero normal", name: "Нормально", color: c.w },
		{ command: "m aero snow", name: "Снег", color: c.lb },
		{ command: "m aero night", name: "Сумерки", color: c.b },
		{ command: "m aero dark", name: "Ночь", color: c.br }
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
		{ command: "guide", name: "Гайд Вкл/Выкл", color: c.o, ifcmd: "guide" },
		{ command: "guide ui", name: "Настройка", ifcmd: "guide" },
		{ command: "guide spawnObject", name: "Объекты", color: c.y, ifcmd: "guide" },
		{ command: "guide debug ui", name: "Отладка", color: c.b, ifcmd: "guide" },
		{ ifcmd: "guide" },
		{ command: "m $setting", name: "Настройки", color: c.v }
	],
};

module.exports.pages = {
	"setting": {
		"Настройки": [
			{ command: "m scene", name: "Пропуск видео заставок", color: c.lp },
			{},
			{ command: "m drunk", name: "Отключение пьяного экрана", color: c.lg },
			{},
			{ command: "m spamf", name: "Just spam F диалогов с NPC", color: c.lv },
			{},
			{ command: "m autoaccept", name: "Авто принятие приглашения в пати", color: c.g },
		],
		"HSDN mods": [
			{ command: "m premium", name: "Меню доп. кнопки на VIP панели", color: c.y },
			{ ifcmd: "tp" },
			{ command: "tp premium", name: "Телепорт доп. кнопка на VIP панели", color: c.lb, ifcmd: "tp" },
			{ ifcmd: "atlas" },
			{ command: "atlas premium", name: "Атлас доп. кнопка на VIP панели", color: c.lg, ifcmd: "atlas" },
			{ ifcmd: "back" },
			{ command: "back ui", name: "Backstab открыть меню настройки", color: c.r, ifcmd: "back" }
		],
	}
};