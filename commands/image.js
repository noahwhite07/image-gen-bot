const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { imageApiToken, imageApiVersion } = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('image')
		.setDescription('Fetches an AI generated image from the DALLE-Mini web API'),
	async execute(interaction) {
		const data = JSON.stringify({
			"version": imageApiVersion,
			"input": {
				"prompt": "A black cat sitting on a wood table",
				"n_predictions": 1,
			},
		});

		const config = {
			method: 'post',
			url: 'https://api.replicate.com/v1/predictions',
			headers: {
				// TODO: Remove authorization token from source, generate a new token, and put it in config.json
				'Authorization': 'Token ' + imageApiToken,
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
	async printInTenSeconds(str) {
		setTimeout(function() {
			console.log(str);
		}, 10000);
	},

};