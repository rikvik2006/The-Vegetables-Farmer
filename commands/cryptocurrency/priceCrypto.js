
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "price",
    description: "Get a price of a cryptocurrency",
    async execute(message) {
        const [command, ...args] = message.content.split(' ');
        //** Controlla se ci sono due argomenti */
        // Check if there are two arguments present
        if (args.length !== 2) {
          return message.reply({embeds: [missParams]});
        } else {
          const [coin, vsCurrency] = args;
          try {
            //** Prendiamo il pezzo della crypto dalla API di coingecko */
            // Get crypto price from coingecko API
            const { data } = await axios.get(
              `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${vsCurrency}`
            );
            //** Controliamo se i dati inseriti esistono */
            // Check if data exists
            if (!data[coin][vsCurrency]) throw Error();

            const piriceMessge = `The current price of 1 ${coin} = ${data[coin][vsCurrency]} ${vsCurrency}`;
            var priceEmbed = new Discord.MessageEmbed()
              .setColor ('#8D8D8D')
              .setTitle ('Price')
              .setDescription (piriceMessge)
              .timestamp();
            return message.reply({embeds: [priceEmbed]}); //priceEmbed

          } catch (err) {
            return message.reply({embeds: [parmsNotExist]}); //parmsNotExist
          }
        }
    }
}



var missParams = new Discord.MessageEmbed()
    .setColor ('#8D8D8D')
    .setTitle ('Missing parameters')
    .setDescription ('You must provide the crypto and the currency to compare with!')

var parmsNotExist = new Discord.MessageEmbed()
    .setColor ('#8D8D8D')
    .setTitle ('Parameters not exist')
    .setDescription ('Please check your inputs. For example: !price bitcoin usd')

