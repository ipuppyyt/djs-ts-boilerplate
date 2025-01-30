import { User } from "discord.js"

const getAvatar = (user: User) => {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar?.startsWith('a_') ? 'gif' : 'png'}`
}

export default getAvatar