// import { exec } from "child_process";
// import "tree-kill";
// import kill from "tree-kill";

// let child = exec(`cd /d "D:/Steam/steamapps/common/Warsim The Realm of Aslona" & start /wait /b ./Warsim.exe`);

// // let child = exec(`cd /d "D:/desktop/Scripting/c#/20230214_testzsir/BMI/bin/Debug" & start /wait /b ./BMI.exe`);

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

import express from "express";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
