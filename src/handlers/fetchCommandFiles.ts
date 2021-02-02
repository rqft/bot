import fs from "fs";
import { CMDFilesPath } from "../globals";
export function fetchCommandFiles() {
  return fs.readdirSync(CMDFilesPath).filter((file) => file.endsWith(".js"));
}
