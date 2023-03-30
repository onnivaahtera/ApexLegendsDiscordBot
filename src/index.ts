import { REST, Routes, Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import { config } from "dotenv";
import { apexInteractions, ApexMap, news, stats, store } from "./apex/commands";
import { MarioMap } from "./marioKart/commands";
config();

export const noUser = new EmbedBuilder().setTitle("User not found");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
			body: [ApexMap, news, stats, store, MarioMap],
		});

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
	console.log(`Logged in as ${client.user?.tag}!`);
});

apexInteractions();

client.login(process.env.TOKEN);
