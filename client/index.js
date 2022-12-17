const fs = require("fs");
const path = require("path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  channelLink,
  PermissionsBitField
} = require("discord.js");
const { token, serverURL } = require("./config.json");
const { io } = require("socket.io-client");
const { makeEmbed } = require("./embed");

// const socket = io("ws://localhost:3000", { path: "" });
const socket = io(serverURL, { path: "" });

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.channels.subscribed = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

socket.on("Connect", (param) => {
  console.log(param);
});

const sendEmbedAsync = async (channelId, embed) => {
  const channel = client.channels.cache.get(channelId);
  if (channel) {
    channel.send({ embeds: [embed] }).catch(console.error);
  }
};

socket.on("new_contract", (contractJSON) => {
  const embed = makeEmbed(contractJSON);
  console.log(contractJSON);

  for (const [channelId, guildId] of client.channels.subscribed) {
    sendEmbedAsync(channelId, embed);
  }
});

client.once(Events.ClientReady, () => {
  console.log("Ready!");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    // we want to highlight the channel where this was called so that we can start sending embeds there
    // we need to modify the client object so do it here
    // new Collection on client.channels called client.channels.
    if (command.data.name === "start") {
      const guildId = interaction.guildId;
      const channelId = interaction.channelId;

      const permissions = interaction.channel.guild.members.me.permissionsIn(interaction.channel);

      if (!permissions.has(PermissionsBitField.Flags.EmbedLinks)) {
        throw 'No embed perms'
      }

      client.channels.subscribed.set(channelId, guildId);
    }
    if (command.data.name === "stop") {
      const channelId = interaction.channelId;
      client.channels.subscribed.delete(channelId);
    }

    await command.execute(interaction);
  } catch (error) {

    if (error === "No embed perms") {
      console.log(`No embed links permission for channel: #${interaction.channel.name} (${interaction.channelId})`);
      await interaction.reply({
        content: "Bot must have Embed Links permission in order to display output.",
        ephemeral: true,
      });
    } else {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.login(token);

// const exampleJSON = {
//   "Transaction Hash":
//     "0x74ce9cd7b4e31c53daaf466d6e393b5cc22c25a3de9046d7b3e53d6f704bb7ad",
//   Block: 16121284,
//   "Contract Address": "0xE4D59Bc8C14574b217CB7bF678Bf2B0e38aCD9b6",
//   "Contract Creator": "0x552acA1343A6383aF32ce1B7c7B1b47959F7ad90",
//   "Contract Name": "UNKNOWN",
//   "Contract Symbol": "UNKNOWN",
//   Time: 1670276186687,
// };
// const channel = client.channels.cache.get(channelId);
// channel.send({ embeds: [makeEmbed(exampleJSON)] }).catch(console.error);

// client.channels.subscribed.forEach((v, k) => {
//   const channel = client.channels.cache.get(k);
//   channel.send({ embeds: [makeEmbed(exampleJSON)] }).catch(console.error);
// });