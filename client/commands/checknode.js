const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("currentnode")
    .setDescription("Shows your current JSON-RPC url"),
  async execute(interaction) {
    await interaction.reply("Your rpc url: ");
  },
};
