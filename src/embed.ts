import { EmbedBuilder } from 'discord.js';

type VintedProduct = {	
    id: number,
    likes: number,
    link: string,
    imageUrl: string,
    name: string,
    brand: string,
    price: string,
    size: string,
    condition: string,
    fullDescription: string,
}

const createEmbed = (data: VintedProduct ) => {

	const embedObject = {
		color: 0x0099ff,
		title: data.name,
		url: data.link,
		description: data.fullDescription, 
		fields: [
			{
				name: 'Price',
				value: data.price,
				inline: true,
			},
			{
				name: 'Likes',
				value: `${data.likes}`,
				inline: true,
			},

			{
				name: '\u200b',
				value: '\u200b',
				inline: false,
			},
			{
				name: 'Brand',
				value: data.brand,
				inline: true,
			},
			{
				name: 'Size',
				value: data.size,
				inline: true,
			},
			{
				name: 'Condition',
				value: data.condition,
				inline: true,
			},
		],
		image: {
			url: 'https://i.imgur.com/AfFp7pu.png',
		},
		timestamp: new Date().toISOString(),
	};

	return new EmbedBuilder(embedObject)


}

export default createEmbed;

