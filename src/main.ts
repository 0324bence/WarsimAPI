import express from "express";
import "dotenv/config";
import Game from "./game";

const app = express();

let game: Game | undefined;

app.get("/", (req, res) => {
    if (!game) return res.send("Game not started");
    const state = game.getCurrentState();
    res.send(state);
});

app.get("/input", (req, res) => {
    if (!game) return res.send("Game not started");
    const input = req.query.input as string;
    game.chooseOption(input);
    res.send("OK");
});

process.on("SIGINT", () => {
    if (game) {
        game.kill();
    }
    server.close();
});

const server = app.listen(process.env.PORT, () => {
    game = new Game();
    console.log(`Server is running on port ${process.env.PORT}`);
});
