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
exports.client = exports.noUser = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const commands_1 = require("./apex/commands");
(0, dotenv_1.config)();
exports.noUser = new discord_js_1.EmbedBuilder().setTitle("User not found");
const rest = new discord_js_1.REST({ version: "10" }).setToken(process.env.TOKEN);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Started refreshing application (/) commands.");
        yield rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands_1.commands,
        });
        console.log("Successfully reloaded application (/) commands.");
    }
    catch (error) {
        console.error(error);
    }
}))();
exports.client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
exports.client.on("ready", () => {
    var _a;
    console.log(`Logged in as ${(_a = exports.client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
});
(0, commands_1.apexInteractions)();
exports.client.login(process.env.TOKEN);
