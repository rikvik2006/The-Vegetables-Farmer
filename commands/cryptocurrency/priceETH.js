
// const Discord = require('discord.js');
// const axios = require('axios');

// module.exports = {
//     name: "priceETH",
//     description: "Get the price of ETH",
//     execute(message) {
//         const [command, ...args] = message.content.split(' ');
//         //** Controlla se ci sono due argomenti */
//         // Check if there are two arguments present
//         if (args.length !== 2) {
//           return message.reply(
//             'You must provide the crypto and the currency to compare with!'
//           );
//         } else {
//           const [coin, vsCurrency] = args;
//           try {
//             //** Prendiamo il pezzo della crypto dalla API di coingecko */
//             // Get crypto price from coingecko API
//             const { data } = await axios.get(
//               `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${vsCurrency}`
//             );
//             //** Controliamo se i dati inseriti esistono */
//             // Check if data exists
//             if (!data[coin][vsCurrency]) throw Error();
    
//             return message.reply(
//               `The current price of 1 ${coin} = ${data[coin][vsCurrency]} ${vsCurrency}`
//             );
//           } catch (err) {
//             return message.reply(
//               'Please check your inputs. For example: !price bitcoin usd'
//             );
//           }
//         }
//     }
// }
