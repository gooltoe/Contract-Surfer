const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the contract monitor."),
  async execute(interaction) {
    await interaction.reply("Stopping monitor!");
  },
};
