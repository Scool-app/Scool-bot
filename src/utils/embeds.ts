import { EmbedBuilder, ColorResolvable } from "discord.js";

export const Colors = {
  WHITE: 0xffffff as ColorResolvable,
  BLACK: 0x0a0a0a as ColorResolvable,
  LIGHT: 0xf5f5f5 as ColorResolvable,
  DARK: 0x111111 as ColorResolvable,
  ACCENT: 0xe0e0e0 as ColorResolvable,
  ERROR: 0xff4444 as ColorResolvable,
  SUCCESS: 0x44ff88 as ColorResolvable,
};

export const Emojis = {
  SCOOL: "🎓",
  PING: "📡",
  INFO: "📋",
  HELP: "📚",
  SOON: "🔮",
  SETUP: "⚙️",
  INVITE: "🔗",
  LANG: "🌐",
  SUCCESS: "✅",
  ERROR: "❌",
  ARROW: "›",
  DOT: "·",
  GHUB: "💻",
};


export function createEmbed(color: ColorResolvable = Colors.WHITE): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(color)
    .setFooter({
      text: "Scool · scoolapp.fr",
      iconURL: "https://cdn.discordapp.com/app-icons/1500944923560509450/689515c8752ca5ef0e25d0028e593c6f.png?size=64",
    })
    .setTimestamp();
}


export function successEmbed(title: string, description: string): EmbedBuilder {
  return createEmbed(Colors.WHITE)
    .setTitle(`${Emojis.SUCCESS}  ${title}`)
    .setDescription(`\`\`\`\n${description}\n\`\`\``);
}

export function errorEmbed(description: string): EmbedBuilder {
  return createEmbed(Colors.ERROR)
    .setTitle(`${Emojis.ERROR}  Something went wrong`)
    .setDescription(description);
}

export function infoEmbed(title: string, description: string): EmbedBuilder {
  return createEmbed(Colors.WHITE)
    .setTitle(`${Emojis.DOT}  ${title}`)
    .setDescription(description);
}