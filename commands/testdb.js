const { SlashCommandBuilder } = require('discord.js');
const { mySqlInfo } = require('../config.json');
const mysql = require('mysql');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testdb')
		.setDescription('Makes a query to a MySQL databse'),
	async execute(interaction) {
		await interaction.deferReply();

        const connection = mysql.createConnection(mySqlInfo);

        await connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
          });

        connection.query('SELECT * FROM Users', (err, rows) =>{
            if (err) throw err;
            console.log('Matching rows from query: ');
            console.log(rows);
        });

		await interaction.editReply("done");

	},
};