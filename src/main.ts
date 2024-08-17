import express from "express";
import "dotenv/config";
import kill from "tree-kill";
import Game from "./game";

const app = express();

let game: Game | undefined;

app.get("/", (req, res) => {
    if (!game) return res.send("Game not started");
    const state = game.getCurrentState();
    res.send(state);
});

process.on("SIGINT", () => {
    console.log("Log that Ctrl + C has been pressed");
    if (game) {
        game.kill();
    }
    process.exit();
});

app.listen(process.env.PORT, () => {
    game = new Game();
    console.log(`Server is running on port ${process.env.PORT}`);
});
