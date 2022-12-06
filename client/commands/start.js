const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Starts contract monitor (if the node is set)"),
  async execute(interaction) {
    await interaction.reply("Starting contract monitor!");
  },
};
