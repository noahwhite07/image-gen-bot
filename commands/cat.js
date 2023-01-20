const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');
const fetch = require('node-fetch');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Fetches a random picture of a cat'),
	async execute(interaction) {
		const catResult = await fetch('https://cataas.com/cat?json=true').then(response => response.json());
		const imageUrl = 'https://cataas.com' + await catResult.url;
		// console.log(catResult);
		// console.log(imageUrl);
		await interaction.deferReply();
		await wait(10000);
		await interaction.editReply(imageUrl);
	},
};