import { EmbedBuilder } from 'discord.js';
import { config } from 'dotenv';
import { noUser } from '.';
config();

export const getUseProfile = async (username: string) => {
	const res = await fetch(
		`https://api.mozambiquehe.re/bridge?auth=${process.env.API_KEY}&player=${username}&platform=PC`
	);
	const data = await res.json();

	if (data.Error) return noUser;

	const message = new EmbedBuilder()
		.setColor('DarkPurple')
		.setTitle(data.global.name)
		.setURL(`https://apexlegendsstatus.com/profile/PC/${username}`)
		.setDescription(
			`${
				data.realtime.isOnline === 1
					? ':green_circle: User is online'
					: ':red_circle: User is offline'
			}`
		)
		.addFields(
			{
				name: 'General',
				value: `${
					data.global.levelPrestige > 0
						? `Level: ${data.global.level} (${data.global.toNextLevelPercent}%).\nPrestige ${data.global.levelPrestige}.`
						: `Level: ${data.global.level} (${data.global.toNextLevelPercent}%).`
				}`,
				inline: true,
			},
			{ name: '\u200B', value: '\u200B', inline: true },
			{
				name: 'Ranked',
				value: `Rank: ${data.global.rank.rankName} ${data.global.rank.rankDiv}\nRP: ${data.global.rank.rankScore}`,
				inline: true,
			},
			{
				name: 'Current legend',
				value: `${data.legends.selected.LegendName}`,
			}
		);
	return message;
};

export const getMap = async () => {
	const res = await fetch(
		`https://api.mozambiquehe.re/maprotation?auth=${process.env.API_KEY}&version=2`
	);
	const data = await res.json();

	return `Current map is ${data.ranked.current.map} next map will be ${data.ranked.next.map} in ${data.ranked.current.remainingTimer}`;
};

export const getNews = async () => {
	const res = await fetch(
		`https://api.mozambiquehe.re/news?auth=${process.env.API_KEY}`
	);
	const data = await res.json();

	const message = new EmbedBuilder()
		.setColor('DarkPurple')
		.setTitle(data[0].title)
		.setURL(data[0].link)
		.setDescription(data[0].short_desc)
		.setImage(data[0].img);

	return message;
};

getNews();
