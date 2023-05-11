import { Server } from 'ws'

const server = new Server({ port: 3000 })
const WEBSOCKET_OPEN = 1

export default function startUpSocket() {
    server.on('connection', ws => {
        ws.on('message', message => {
            const convertedMessage = message.toString()
            server.clients.forEach(client => {
                console.log(client)
                if (client.readyState === WEBSOCKET_OPEN) {
                    client.send(JSON.stringify({ message: convertedMessage }))
                }
            })
        })

    })
}