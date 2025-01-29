import { ButtonInteraction, Events, MessageFlags } from "discord.js";
import loadButtons from "../utils/loadButtons";
import { CustomDiscordClient } from "../types";

const buttons = loadButtons('../actions/button');

export default {
    name: Events.InteractionCreate,
    async execute(interaction: ButtonInteraction, client: CustomDiscordClient) {
        if (!interaction.isButton()) return;
        try {
            if (buttons[interaction.customId]) {
                await buttons[interaction.customId].execute(interaction, client);
            } else {
                await interaction.reply({ content: 'Button not found!', flags: MessageFlags.Ephemeral });
            }
        } catch (error: Error | any) {
            await interaction.reply({ content: 'There was an error while executing this button!', flags: MessageFlags.Ephemeral });
        }
    },
};