import { input } from "@inquirer/prompts";
import { image, imageSync } from "qr-image";
import { writeFileSync, createWriteStream, writeFile } from "fs";

const inp = await input({ message: `Enter URL: ` });

writeFileSync("generatedQRCode.png", imageSync(inp));

writeFile("url.txt", inp, (err) => {
    if (err) throw err;
});
