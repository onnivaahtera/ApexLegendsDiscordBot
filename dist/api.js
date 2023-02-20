"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNews = exports.getMap = exports.getUseProfile = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const _1 = require(".");
(0, dotenv_1.config)();
const getUseProfile = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`https://api.mozambiquehe.re/bridge?auth=${process.env.API_KEY}&player=${username}&platform=PC`);
    const data = yield res.json();
    if (data.Error)
        return _1.noUser;
    const message = new discord_js_1.EmbedBuilder()
        .setColor('DarkPurple')
        .setTitle(data.global.name)
        .setURL(`https://apexlegendsstatus.com/profile/PC/${username}`)
        .setDescription(`${data.realtime.isOnline === 1
        ? ':green_circle: User is online'
        : ':red_circle: User is offline'}`)
        .addFields({
        name: 'General',
        value: `${data.global.levelPrestige > 0
            ? `Level: ${data.global.level} (${data.global.toNextLevelPercent}%).\nPrestige ${data.global.levelPrestige}.`
            : `Level: ${data.global.level} (${data.global.toNextLevelPercent}%).`}`,
        inline: true,
    }, { name: '\u200B', value: '\u200B', inline: true }, {
        name: 'Ranked',
        value: `Rank: ${data.global.rank.rankName} ${data.global.rank.rankDiv}\nRP: ${data.global.rank.rankScore}`,
        inline: true,
    }, {
        name: 'Current legend',
        value: `${data.legends.selected.LegendName}`,
    });
    return message;
});
exports.getUseProfile = getUseProfile;
const getMap = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`https://api.mozambiquehe.re/maprotation?auth=${process.env.API_KEY}&version=2`);
    const data = yield res.json();
    return `Current map is ${data.ranked.current.map} next map will be ${data.ranked.next.map} in ${data.ranked.current.remainingTimer}`;
});
exports.getMap = getMap;
const getNews = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`https://api.mozambiquehe.re/news?auth=${process.env.API_KEY}`);
    const data = yield res.json();
    const message = new discord_js_1.EmbedBuilder()
        .setColor('DarkPurple')
        .setTitle(data[0].title)
        .setURL(data[0].link)
        .setDescription(data[0].short_desc)
        .setImage(data[0].img);
    return message;
});
exports.getNews = getNews;
