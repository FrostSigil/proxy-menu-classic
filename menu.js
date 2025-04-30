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
	{ command: "m bank 1", id: 60264 },
	{ command: "m broker", id: 60265 },
	// { command: "m store", id: 60262 },
	{ command: "m", id: 5023 },
];

// Настройка меню
module.exports.categories = {
	"Основное": [
		// https://github.com/tera-classic-mods/npc-summoner
		{ command: "m bank 1", name: "Банк", color: c.lp },
		{ command: "m bank 3", name: "Банк гильдии", color: c.lp },
		{ command: "mail", name: "Почта", color: c.b },
		// https://github.com/tera-classic-mods/auto-bank
		{ command: "ab", name: "Автобанк", color: c.p },
		{},
		// https://github.com/tera-classic-mods/npc-summoner
		{ command: "m broker", name: "Брокер", color: c.lg },
		{ command: "store", name: "Торговец", color: c.g },
		{ command: "sstore", name: "Магазин редкостей", color: c.g },
		{},
		// https://github.com/tera-classic-mods/auto-loot
		{ command: "loot auto", name: "Автолут", color: c.y },
		// https://github.com/tera-classic-mods/anti-cc
		{ command: "cc", name: "Антиопрокид", color: c.y },
		{},
		// https://github.com/tera-classic-mods/translate-chat
		{ command: "translate send", name: "Автоперевод", color: c.lb },
		// https://github.com/tera-classic-mods/gathering-markers
		{ command: "gat ui", name: "Сбор", color: c.lb },
	],
};

module.exports.pages = {

};