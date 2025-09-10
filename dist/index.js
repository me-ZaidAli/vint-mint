import { extractProducts } from "./utils.js";
import createEmbed from "./embed.js";
import { Client, Events, GatewayIntentBits, TextChannel } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
async function main() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    client.once(Events.ClientReady, async (readyClient) => {
        console.log(`✅ Ready! Logged in as ${readyClient.user.tag}`);
        const products = await extractProducts();
        if (!products)
            return;
        const embeds = products.map((product) => createEmbed(product));
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);
        if (!channel || !channel.isTextBased()) {
            console.error("❌ Invalid channel ID or not a text channel");
            return;
        }
        for (let i = 0; i < embeds.length; i += 10) {
            const chunk = embeds.slice(i, i + 10);
            await channel.send({ embeds: chunk });
        }
        console.log(`📤 Sent ${embeds.length} embeds in chunks of 10`);
    });
    await client.login(process.env.DISCORD_TOKEN);
}
main();
//# sourceMappingURL=index.js.map