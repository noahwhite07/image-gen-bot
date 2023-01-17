const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('image')
		.setDescription('Fetches an AI generated image from the DALLE-Mini web API'),
	async execute(interaction) {
		const data = JSON.stringify({
			"version": "2e3975b1692cd6aecac28616dba364cc9f1e30c610c6efd62dbe9b9c7d1d03ea",
			"input": {
				"prompt": "A black cat sitting on a wood table",
				"n_predictions": 1,
			},
		});

		const config = {
			method: 'post',
			url: 'https://api.replicate.com/v1/predictions',
			headers: {
				'Authorization': 'Token 24eb6dd8b60afafcf8a620356160a4db5df4fc32',
				'Content-Type': 'application/json',
			},
			data: data,
		};

        let response = null;
        try {
            response = await axios(config);

        } catch (error) {
            console.log(error);
        }
        console.log(JSON.stringify(await response.data));
		interaction.reply("done");
	},
};