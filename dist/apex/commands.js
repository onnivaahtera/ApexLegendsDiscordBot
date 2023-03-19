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
exports.apexInteractions = exports.commands = void 0;
const discord_js_1 = require("discord.js");
const __1 = require("..");
const api_1 = require("./api");
const __2 = require("..");
const stats = new discord_js_1.SlashCommandBuilder()
    .setName("stats")
    .setDescription("get stats")
    .addStringOption((option) => option
    .setName("username")
    .setDescription("origin username")
    .setRequired(true));
const map = new discord_js_1.SlashCommandBuilder()
    .setName("map")
    .setDescription("get current and next map");
const store = new discord_js_1.SlashCommandBuilder()
    .setName("store")
    .setDescription("Current store items");
const news = new discord_js_1.SlashCommandBuilder()
    .setName("news")
    .setDescription("get latest news");
exports.commands = [stats, map, store, news];
const apexInteractions = () => {
    __1.client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName === "stats") {
            try {
                const username = interaction.options.getString("username");
                yield interaction.reply({
                    embeds: [yield (0, api_1.getUseProfile)(username)],
                });
            }
            catch (err) {
                console.log(err);
                yield interaction.reply({
                    embeds: [__2.noUser],
                });
            }
        }
        if (interaction.commandName === "map") {
            yield interaction.reply({
                content: yield (0, api_1.getMap)(),
            });
        }
        if (interaction.commandName === "store") {
            yield interaction.reply({
                content: "I'm lazy so here's the link: https://apexlegendsstatus.com/store",
            });
        }
        if (interaction.commandName === "news") {
            yield interaction.reply({
                embeds: [yield (0, api_1.getNews)()],
            });
        }
    }));
};
exports.apexInteractions = apexInteractions;
