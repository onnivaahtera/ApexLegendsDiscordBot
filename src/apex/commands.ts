import { SlashCommandBuilder } from "discord.js";
import { client } from "..";
import { getMap, getNews, getUseProfile } from "./api";
import { noUser } from "..";

export const stats = new SlashCommandBuilder()
	.setName("stats")
	.setDescription("get stats")
	.addStringOption((option) =>
		option.setName("username").setDescription("origin username").setRequired(true)
	);

export const ApexMap = new SlashCommandBuilder()
	.setName("map")
	.setDescription("get current and next map");

export const store = new SlashCommandBuilder()
	.setName("store")
	.setDescription("Current store items");

export const news = new SlashCommandBuilder().setName("news").setDescription("get latest news");

export const apexInteractions = () => {
	client.on("interactionCreate", async (interaction) => {
		if (!interaction.isChatInputCommand()) return;

		if (interaction.commandName === "stats") {
			try {
				const username = interaction.options.getString("username");
				await interaction.reply({
					embeds: [await getUseProfile(username!)],
				});
			} catch (err) {
				console.log(err);
				await interaction.reply({
					embeds: [noUser],
				});
			}
		}
		if (interaction.commandName === "map") {
			await interaction.reply({
				content: await getMap(),
			});
		}

		if (interaction.commandName === "store") {
			await interaction.reply({
				content: "I'm lazy so here's the link: https://apexlegendsstatus.com/store",
			});
		}

		if (interaction.commandName === "news") {
			await interaction.reply({
				embeds: [await getNews()],
			});
		}
	});
};
