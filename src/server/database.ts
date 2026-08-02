import bcrypt from "bcryptjs";
import crypto from "crypto";
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });

export async function addUser(id: string, name: string, password: string) {
    const passwordHash = bcrypt.hashSync(password, 16);
    await prisma.user.create({ data: { id, name, passwordHash } });
}

export async function getUsers() {
    return prisma.user.findMany();
}

export async function getUser(name: string, password: string) {
    const user = await prisma.user.findFirst({ where: { name } });
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) return undefined;
    return user;
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({ where: { id }, select: { id: true, name: true } });
}

export async function addGameSession(userId: string, memSet: number, score: number) {
    await prisma.gameSession.create({
        data: { id: crypto.randomUUID(), userId, memSet, score, createdAt: new Date() }
    });
}

export async function getGameSessions(userId: string) {
    return prisma.gameSession.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });
}