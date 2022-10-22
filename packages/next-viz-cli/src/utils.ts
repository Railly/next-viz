import fs from "fs";
import path from "path";

export const getVersion = () =>
  fs
    .readFileSync(path.join(__dirname, "../package.json"), "utf8")
    .split("version")[1]
    .split('"')[2];
