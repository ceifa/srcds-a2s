const dgram = require('dgram')
// TODO: upgrade packet package
const packet = require('packet')
const { A2S_INFO } = require('./packets')

const info = (ip, port) => {
    return new Promise((resolve) => {
        const client = dgram.createSocket('udp4')
        const parser = new packet.Parser()
    
        parser._transforms.chr = (parsing, field, value) => {
            return parsing ? String.fromCharCode(value) : value.charCodeAt()
        }
    
        parser.extract(A2S_INFO.response, (msg) => {
            let decoded = msg
    
            switch (decoded.os) {
                case 'l':
                    decoded.os = 'Linux'
                    break
                case 'w':
                    decoded.os = 'Windows'
                    break
            }
    
            switch (decoded.dedicated) {
                case 'd':
                    decoded.dedicated = 'dedicated'
                    break
                case 'l':
                    decoded.dedicated = 'listen'
                    break
                case 'p':
                    decoded.dedicated = 'SourceTV'
                    break
            }
    
            decoded.pw = decoded.pw === 1
            decoded.secure = decoded.secure === 1
    
            client.close()
            resolve(decoded)
        })
    
        client.on('message', (msg, rinfo) => {
            return parser.write(msg)
        })
    
        const request_packet = Buffer.from(A2S_INFO.body)
        client.send(request_packet, 0, request_packet.length, port, ip)
    })
}

module.exports = {
    info
}