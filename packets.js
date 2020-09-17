// https://developer.valvesoftware.com/wiki/Server_queries

const A2S_INFO = { // Does not require a challenge
    body: [
        0xFF, 0xFF, 0xFF, 0xFF,
        0x54, // Header
        0x53, 0x6F, 0x75, 0x72, 0x63, 0x65, 0x20, 0x45, 0x6E, 0x67,
        0x69, 0x6E, 0x65, 0x20, 0x51, 0x75, 0x65, 0x72, 0x79, 0x00],
    response: `
        x32,
        b8|chr() => type,
        b8 => version,
        b8z|utf8() => serverName,
        b8z|utf8() => map,
        b8z|utf8() => gameType,
        b8z|utf8() => gameName,
        l16 => appID,
        b8 => numPlayers,
        b8 => maxPlayers,
        b8 => numBots,
        b8|chr() => dedicated,
        b8|chr() => os,
        b8 => password,
        b8 => secure,
        b8z|utf8() => gameVersion
    `
}

module.exports = {
    A2S_INFO
}