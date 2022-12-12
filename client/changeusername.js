const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  channelLink,
} = require("discord.js");

const { token, serverURL } = require("./config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  token: token,
});

client.once(Events.ClientReady, () => {
  console.log("Ready!");
});

client.on("ready", () => {
  // Set the new username for the bot
  const newUsername = "Contract Surfer";

  console.log(client.api);
  // Send a PATCH request to the /users/@me endpoint
  //   client.api
  //     .users("@me")
  //     .patch({
  //       username: newUsername,
  //     })
  //     .then(() => {
  //       console.log(`Successfully changed the bot's username to ${newUsername}`);
  //     })
  //     .catch(console.error);
});

client.login(token);
