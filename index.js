const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const http = require('http');

// ✅ Keep-Alive Server لمنع النوم على Render
http.createServer((req, res) => res.end('ALshayeb AFK Bot is alive!')).listen(process.env.PORT || 3000);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates // 🔊 مهم جداً للصوت
    ]
});

// 📌 حط أيدي الروم الصوتي وأيدي السيرفر حقك هنا (بدون أي رموز زيادة)
const VOICE_CHANNEL_ID = "1508662405490544790";
const GUILD_ID = "1402711345929130106";

client.once('ready', async () => {
    console.log(`✅ البوت شغال باسم: ${client.user.tag}`);

    try {
        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) return console.log('❌ لم يتم العثور على السيرفر!');

        const channel = guild.channels.cache.get(VOICE_CHANNEL_ID);
        if (!channel) return console.log('❌ لم يتم العثور على الروم الصوتي!');

        // 🔌 الاتصال بالروم الصوتي (دفن بدون ميوت)
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfDeaf: true,  // 🔇 يدفن نفسه (Deafen)
            selfMute: false // 🎤 بدون كتم للميكروفون
        });

        // الانتظار حتى يتم الاتصال بنجاح
        await entersState(connection, VoiceConnectionStatus.Ready, 20 * 1000);
        console.log(`🔊 دخل البوت روم الصوت (${channel.name}) ودفن نفسه بدون ميوت بنجاح!`);

    } catch (error) {
        console.error('❌ صار خطأ أثناء محاولة دخول الروم الصوتي:', error);
    }
});

client.login(process.env.TOKEN);
