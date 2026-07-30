import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app, httpServer } from "../app";

beforeAll(() => {
    // Server muss für Supertest nicht zwingend laufen (supertest injected app),
    // aber Socket.io braucht ihn. Starten falls nötig:
    // httpServer.listen(0);
});

afterAll(() => {
    httpServer.close();
});

describe("API", () => {
    it("GET /api/health returns status ok", async () => {
        const res = await request(app).get("/api/health");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: "ok" });
    });

    it("GET /api/memSets returns an array of set-titles", async () => {
        const res = await request(app).get("/api/memSets");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("sets");
        expect(Array.isArray(res.body.sets)).toBe(true);
    });

    it("POST /api/register with valid data returns token and user", async () => {
        const uniqueName = `test_${Date.now()}`;
        const res = await request(app)
            .post("/api/register")
            .send({ name: uniqueName, password: "secret" });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body.user.name).toBe(uniqueName);
    });

    it("POST /api/login returns 401 used with wrong datas", async () => {
        const res = await request(app)
            .post("/api/login")
            .send({ name: "nonexistent", password: "wrong" });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("error");
    });
});
