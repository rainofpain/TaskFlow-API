import type { Task } from "../../domain/task/entity.js";
import type { User } from "../../domain/user/entity.js";
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface jsonEditor<T>{
    readJson(path: string) : Promise<T[]>
    writeJson(path:string, data: T[]) : Promise<void>
}

function editJson<T>(): jsonEditor<T>{
    return{
        async readJson(filename) {
            const filePath = path.join(__dirname, '..', '..','data', `${filename}.json`);
            const data: string = await fs.readFile(filePath, 'utf8');
            const obj : T[] = JSON.parse(data);
            return obj;
        },

        async writeJson(filename, data) {
            const filePath = path.join(__dirname, '..', '..','data', `${filename}.json`);
            const jsonString = JSON.stringify(data, null, 2);
            await fs.writeFile(filePath , jsonString, 'utf8');
        }
    }
}

export const jsonUserEditor: jsonEditor<User> = editJson();
export const jsonTaskEditor: jsonEditor<Task> = editJson();
