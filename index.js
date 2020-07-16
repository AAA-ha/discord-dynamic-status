const Discord = require('discord.js')

const TOKEN = process.env.TOKEN || 'PUT_YOUR_TOKEN_HERE' // How to extract token https://www.youtube.com/watch?v=tI1lzqzLQCs

const DELAY = 10 // In seconds

const STATUS_LIST = [
    { name: 'Shhh', options: { url: 'https://www.twitch.tv/ANYNAMEHERE' } },
    { name: 'Pornhub.com', options: { type: 'WATCHING' } },
    { name: 'Sad songs', options: { type: 'LISTENING' } },
]

const start = async () => {
    const bot = new Discord.Client()

    await bot.login(TOKEN)

    console.log('user logged in')

    const loop = true
    while (loop) {
        for (let index = 0; index < STATUS_LIST.length; index += 1) {
            const activity = STATUS_LIST[index]
            // eslint-disable-next-line no-await-in-loop
            await bot.user.setActivity(activity.name, activity.options)
            console.log('status updated : ', activity)
            // eslint-disable-next-line no-await-in-loop
            await new Promise(resolve => setTimeout(resolve, DELAY * 1000))
        }
    }
}

start().then()
