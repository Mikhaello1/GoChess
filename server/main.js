"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const wss = new ws_1.default.Server({ port: 8080 });
const games = new Map();
const players = new Set();
wss.on("connection", (ws) => {
    const playerId = Math.round(Math.random() * 1000);
    players.add(playerId);
    console.log(players);
    ws.send(JSON.stringify({
        type: "connect",
        payload: {
            player: {
                id: playerId,
                color: players.size === 1 ? 1 : 0,
            },
        },
    }));
    if (players.size === 2) {
        ws.send(JSON.stringify({ type: "create" }));
    }
    ws.on("message", (message) => {
        const msg = JSON.parse(message.toString());
        const playersArray = Array.from(players);
        if (msg.type === "create") {
            const gameId = Math.round(Math.random() * 100000);
            games.set(gameId, {
                id: gameId,
                players: playersArray,
                field: msg.payload.field,
            });
            wss.clients.forEach((client) => {
                client.send(JSON.stringify({
                    type: "game_created",
                    payload: { gameId, players: playersArray },
                }));
            });
            players.clear();
        }
        if (msg.type === "move") {
            const { gameId, field, turn, enemy } = msg.payload;
            const game = games.get(gameId);
            game.id = gameId;
            game.field = field;
            game.turn = turn;
            game.players = players;
            console.log("получили мув");
            wss.clients.forEach((client) => {
                client.send(JSON.stringify({
                    type: "move",
                    payload: {
                        playerId: enemy,
                        field,
                        turn,
                    },
                }));
            });
        }
    });
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
console.log("WebSocket server is running on ws://localhost:8080");
