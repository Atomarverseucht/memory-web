import Database from "better-sqlite3";
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

db.exec(`
    CREATE TABLE IF NOT EXISTS game_sessions (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    memSet INTEGER NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);`)

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

export function getUserById(id: string): { id: string; name: string } | undefined {
    return db.prepare(`SELECT id, name FROM users WHERE id=?`).get(id) as { id: string; name: string } | undefined;
}

export function addGameSession(userId: string, memSet: number, score: number) {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    db.prepare(
        `INSERT INTO game_sessions (id, userId, memSet, score, createdAt) VALUES (?,?,?,?,?)`
    ).run(id, userId, memSet, score, createdAt);
}

export function getGameSessions(userId: string) {
    return db.prepare(
        `SELECT * FROM game_sessions WHERE userId=? ORDER BY createdAt DESC`
    ).all(userId);
}
