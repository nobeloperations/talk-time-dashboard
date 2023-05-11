"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const server = new ws_1.Server({ port: 3000 });
const WEBSOCKET_OPEN = 1;
function startUpSocket() {
    server.on('connection', ws => {
        ws.on('message', message => {
            const convertedMessage = message.toString();
            server.clients.forEach(client => {
                console.log(client);
                if (client.readyState === WEBSOCKET_OPEN) {
                    client.send(JSON.stringify({ message: convertedMessage }));
                }
            });
        });
    });
}
exports.default = startUpSocket;
//# sourceMappingURL=startup.js.map