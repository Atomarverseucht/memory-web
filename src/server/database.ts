import Database from "better-sqlite3";
import {createHash} from "crypto";

const db = new Database('./database.db')
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    passwordHash TEXT NOT NULL,
    saltValue TEXT NOT NULL
  )`);

export function addUser(id: string, name: string, password: string) {
    const saltValue = randomString(10)
    const passwordHash = hashFun(password + saltValue);
    const prepInsert = db.prepare(
        `INSERT INTO users (id, name, passwordHash, saltValue) VALUES (?,?,?,?)`)
    prepInsert.run(id, name, passwordHash, saltValue);
}

export function getUsers() {
    return db.prepare(`SELECT * FROM users`).all();
}

export function hashFun(value: string) {
    return createHash("sha256").update(value).digest("base64");
}

function randomString(length = 4): string {
    return Math.random().toString(36).substring(2, 2 + length);
}