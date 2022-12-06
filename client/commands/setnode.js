const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setnode")
    .setDescription("Sets your node via JSON-RPC")
    .addStringOption((option) =>
      option.setName("rpc").setDescription("JSON-RPC url").setRequired(true)
    ),
  async execute(interaction) {
    console.log(interaction.options);
    await interaction.reply("setting node!");
  },
};
