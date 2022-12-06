const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Subscribe to the contract monitor."),
  async execute(interaction) {
    await interaction.reply("Listening to contract monitor!");
  },
};
