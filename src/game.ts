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
                console.log("page:" + this.currentPage);

                let lineArray = this.currentPage.split("\n").map(line => line.trim());
                for (let line of lineArray) {
                    let option = line.match(/^(\d*)\).*/);
                    if (option && option[1]) {
                        this.currentOptions.push(option[1]);
                    }
                }
                console.log("options:" + this.currentOptions);
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
        this.cp.stdin.write(option + "\n");
    }

    kill() {
        if (this.cp && this.cp.pid) {
            console.log("Killing process");
            exec(`taskkill /pid ${this.cp.pid} /T /F `);
        }
    }
}

export default Game;

// let child = exec(`cd /d "D:/Steam/steamapps/common/Warsim The Realm of Aslona" & start /wait /b ./Warsim.exe`);

// let currentPage = "";

// let timer: NodeJS.Timeout | null = null;

// child.stdout!.on("data", data => {
//     currentPage += data;
//     if (timer) {
//         clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//         console.log("page:" + currentPage);

//         let lineArray = currentPage.split("\n").map(line => line.trim());
//         let options = [];
//         for (let line of lineArray) {
//             let option = line.match(/^(\d*)\).*/);
//             if (option && option[1]) {
//                 options.push(option[1]);
//             }
//         }
//         console.log("options:" + options);
//         //exec(`taskkill /pid ${child.pid} /T /F `);
//         kill(child.pid!, "SIGINT");
//     }, 1000);
// });
