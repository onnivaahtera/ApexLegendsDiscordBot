import {
	REST,
	Routes,
	Client,
	GatewayIntentBits,
	SlashCommandBuilder,
} from 'discord.js';
import { config } from 'dotenv';
import { getMap, getNews, getUseProfile } from './api';
config();

const stats = new SlashCommandBuilder()
	.setName('stats')
	.setDescription('get stats')
	.addStringOption((option) =>
		option
			.setName('username')
			.setDescription('origin username')
			.setRequired(true)
	);

const map = new SlashCommandBuilder()
	.setName('map')
	.setDescription('get current and next map');

const store = new SlashCommandBuilder()
	.setName('store')
	.setDescription('Current store items');

const news = new SlashCommandBuilder()
	.setName('news')
	.setDescription('get latest news');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
			body: [stats, map, store, news],
		});

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
	console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'stats') {
		const username = interaction.options.getString('username');
		await interaction.reply({
			embeds: [await getUseProfile(username!)],
		});
	}

	if (interaction.commandName === 'map') {
		await interaction.reply({
			content: await getMap(),
		});
	}

	if (interaction.commandName === 'store') {
		await interaction.reply({
			content:
				"I'm lazy so here's the link: https://apexlegendsstatus.com/store",
		});
	}

	if (interaction.commandName === 'news') {
		await interaction.reply({
			embeds: [await getNews()],
		});
	}
});

client.login(process.env.TOKEN);
