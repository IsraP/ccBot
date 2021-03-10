Funcoes: {
    function encontrarPeriodo(msg) {
        if(msg.toLowerCase().includes("f"))
            return 10;
        for (i = 1; i < 9; i++)
            if (msg.includes(i))
                return i;
        return 0;
    }

    function hasPeriodo(membro) {
        for (i = 1; i < 9; i++) {
            let role = membro.guild.roles.cache.findKey(role => role.name === `${i}º Periodo`);

            if (membro.roles.cache.has(role)) {
                return role;
            }
        }

        role = membro.guild.roles.cache.findKey(role => role.name === 'Formado');
        if(membro.roles.cache.has(role))
            return role;

        return null;
    }

    function tratarComandos() {
        console.log("Esse servidor não tem comandos :/");
    }

    function darCargo(periodo, membro) {
        let periodoAnterior = hasPeriodo(membro);
        let periodoRole = periodo != 10? membro.guild.roles.cache.find(role => role.name === `${periodo}º Periodo`) : membro.guild.roles.cache.find(role => role.name === 'Formado');

        if (periodoAnterior != null) {
            membro.roles.remove(periodoAnterior).catch(console.error);
        }

        membro.roles.add(periodoRole).catch(console.error);
    }
}


const disc = require('discord.js');

const client = new disc.Client();

const prefix = "cc!";

client.once("ready", () => {
    console.log("we in babyyyy");
});


client.on("message", message => {
    if (message.content.startsWith(prefix) && !message.author.bot)
        tratarComandos();
    else {
        let periodo = encontrarPeriodo(message.content);
        if (periodo != 0)
            darCargo(periodo, message.member);
    }
});

client.login(process.env.token); // Ultima linha em