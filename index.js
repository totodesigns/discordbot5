// index.js er vores "main entry point" for at initialisere botten og dens aktivitet.

// Tilgår config.json-filen, der indeholder bottens Token, som er dens ID. Den er gemt væk fra index.js for sikkerhed.
const { token } = require("./config.json");

const { Client, Events, IntentsBitField } = require('discord.js');

// Variabel "client" er selve botten.
const client = new Client({ 
    
    // "Intents" er en række permissions som botten kan bruge for at få adgang til nogle relevante events.
    // Se https://discord.com/developers/docs/topics/gateway#gateway-intents for alle Intents.
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ] 
});

// Her anvendes "client"-variablen som er vores Bot og logger ind med dens ID fra Discord.dev (Tonny's account). Det gør, at den er "online" på discord.
client.login(token);

// Logger, når botten er aktiv ved brug af "on"-metoden.
client.on("ready", c => {
    console.log(`${c.user.username} (#${c.user.tag}) is online!`);
});

// Clienten lytter efter en besked på Discord. Her anvendes Intent: "MessageContent", hvorfor det er vigtigt at definere intents, så client kan lytte efter de events.
// ".content"-metoden tager al' indholdet fra "messageCreate"-datasættet og logger kun dét, der bliver skrevet i discord, altså kun indholdet.
client.on("messageCreate", svar => {
    console.log(svar.content);
    if (svar.author.bot) {
        return;
    }
    if (svar.content === "Hej Bot") {
        svar.reply("Hejsa");
    }
});