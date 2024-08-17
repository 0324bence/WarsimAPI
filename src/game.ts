import { ChildProcess, exec } from "child_process";
import "tree-kill";
import kill from "tree-kill";

class Game {
    currentPage: string = "";
    outputTimer: NodeJS.Timeout | undefined;
    cp: ChildProcess | undefined;
    currentOptions: string[] = [];

    constructor() {
        this.cp = exec(`cd /d "D:/Steam/steamapps/common/Warsim The Realm of Aslona" & start /wait /b ./Warsim.exe`);

        if (!this.cp || !this.cp.stdout || !this.cp.pid) {
            return;
        }

        this.cp.stdout.on("data", data => {
            this.currentPage += data;
            if (this.outputTimer) {
                clearTimeout(this.outputTimer);
            }
            this.outputTimer = setTimeout(() => {
                if (!this.cp || !this.cp.stdout || !this.cp.pid) {
                    return;
                }

                let lineArray = this.currentPage.split("\n").map(line => line.trim());
                for (let line of lineArray) {
                    let option = line.match(/^(\d*)\).*/);
                    if (option && option[1]) {
                        this.currentOptions.push(option[1]);
                    }
                }
                //exec(`taskkill /pid ${child.pid} /T /F `);
            }, 1000);
        });
    }

    getCurrentState() {
        return {
            text: this.currentPage,
            options: this.currentOptions
        };
    }

    chooseOption(option: string) {
        if (!this.cp || !this.cp.stdin) {
            return;
        }
        this.currentPage = "";
        this.currentOptions = [];
        this.cp.stdin.write(option + "\n");
    }

    kill() {
        if (this.cp && this.cp.pid) {
            console.log("Killing process");
            kill(this.cp.pid!, "SIGINT");
            // exec(`taskkill /pid ${this.cp.pid} /T /F `);
        }
    }
}

export default Game;
