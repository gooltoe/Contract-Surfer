const { EmbedBuilder } = require("discord.js");

const makeEmbed = (contractJSON) => {
  const embed = new EmbedBuilder()
    .setColor("#00FFFF")
    .setAuthor({
      name: "Contract Surfer",
      url: "https://discord.js.org",
    })
    .setDescription("New contract found")
    .setTimestamp()
    .addFields(
      {
        name: "Contract Name:",
        value: contractJSON["Contract Name"],
        inline: true,
      },
      {
        name: "Contract Symbol:",
        value: contractJSON["Contract Symbol"],
        inline: true,
      }
    )
    .addFields(
      {
        name: "Block: ",
        value: `${contractJSON["Block"]}`,
      },
      {
        name: "Contract Address: ",
        value: contractJSON["Contract Address"],
        url: "https://etherscan.io/address/" + contractJSON["Contract Address"],
        inline: true,
      },
      {
        name: "Contract Creator:",
        value: contractJSON["Contract Creator"],
        url: "https://etherscan.io/address/" + contractJSON["Contract Creator"],
        inline: true,
      },
      {
        name: "Transaction Hash: ",
        value: contractJSON["Transaction Hash"],
        url: "https://etherscan.io/tx/" + contractJSON["Transaction Hash"],
        inline: false,
      }
    );
  return embed;
};

exports.makeEmbed = makeEmbed;
