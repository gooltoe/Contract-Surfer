const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Unsubscriber to the contract monitor."),
  async execute(interaction) {
    await interaction.reply("Not listening to the contract monitor!");
  },
};
