const { EmbedBuilder } = require("discord.js");

const makeEmbed = (contractJSON) => {
  const embed = new EmbedBuilder()
    .setColor("#00FFFF")
    .setAuthor({
      name: "Contract Surfer 🏄‍♂️",
      url: "https://www.contractsurfer.xyz/",
    })
    .setTitle(
      `New Contract: ${contractJSON["Contract Name"]} (${contractJSON["Contract Symbol"]})`
    )
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
        name: "Contract Address: ",
        value: `[${contractJSON["Contract Address"]}](https://etherscan.io/address/${contractJSON["Contract Address"]})`,
        inline: false,
      },
      {
        name: "Contract Creator:",
        value: `[${contractJSON["Contract Creator"]}](https://etherscan.io/address/${contractJSON["Contract Creator"]})`,
        inline: true,
      },
      {
        name: "Transaction Hash: ",
        value: `[${contractJSON["Transaction Hash"]}](https://etherscan.io/tx/${contractJSON["Transaction Hash"]})`,
        inline: false,
      },
      {
        name: "Block: ",
        value: `[${contractJSON["Block"]}](https://etherscan.io/block/${contractJSON["Block"]})`,
      }
    )
    .addFields({
      name: "\u200B",
      value:
        "Consider making a [donation](https://contract-surfer-frontend.vercel.app/#Donate) to keep this bot alive!",
    })
    .setFooter({
      text: "Contract Surfer",
    })
    .setTimestamp();
  return embed;
};

exports.makeEmbed = makeEmbed;
