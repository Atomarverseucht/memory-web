import Database from "better-sqlite3";
import {createHash} from "crypto";
import bcrypt from "bcryptjs"

const db = new Database('./database.db')
interface User {
    id: string;
    name: string;
    passwordHash: string;
}
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    passwordHash TEXT NOT NULL
  )`);

export function addUser(id: string, name: string, password: string) {
    const passwordHash = bcrypt.hashSync(password, 16);
    const prepInsert = db.prepare(
        `INSERT INTO users (id, name, passwordHash) VALUES (?,?,?)`)
    prepInsert.run(id, name, passwordHash);
}

export function getUsers() {
    return db.prepare(`SELECT * FROM users`).all();
}

export function getUser(name: string, password: string): User | undefined {
    const users = db.prepare(`SELECT * FROM users WHERE name=?`).all(name) as User[]
    return users.find(user => bcrypt.compareSync(password, user.passwordHash))
}
