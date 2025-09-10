import { EmbedBuilder } from 'discord.js';
type VintedProduct = {
    id: number;
    likes: number;
    link: string;
    imageUrl: string;
    name: string;
    brand: string;
    price: string;
    size: string;
    condition: string;
    fullDescription: string;
};
declare const createEmbed: (data: VintedProduct) => EmbedBuilder;
export default createEmbed;
//# sourceMappingURL=embed.d.ts.map