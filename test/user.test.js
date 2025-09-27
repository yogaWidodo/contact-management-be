
import supertest from "supertest";
import {web} from "../src/application/web.js";
import {logger} from "../src/application/logging.js";
import {UserTest} from "./test-util.js";

describe('POST /api/users', function () {
    beforeEach(async () => {
        await UserTest.delete();
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "test",
                name: "test"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post("/api/users")
            .send({
                username: "",
                password: "test",
                name: "test"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if username already registered', async () => {
        let result = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "test",
                name: "test"
            });

        expect(result.status).toBe(200);

        result = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "test",
                name: "test"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await UserTest.delete();
        await UserTest.create();
    })

    it('should can login', async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "test"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "",
                password: ""
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if username is wrong', async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "testx",
                password: "test"
            });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if password is wrong', async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "testx"
            });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/users/current', function () {
    beforeEach(async () => {
        await UserTest.delete();
        await UserTest.create();
    })

    it('should can get current user', async () => {
        const result = await supertest(web)
            .get("/api/users/current")
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
    });

    it('should reject if token is invalid', async () => {
        const result = await supertest(web)
            .get("/api/users/current")
            .set("Authorization", "salah");

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('PATCH /api/users/current', function () {
    beforeEach(async () => {
        await UserTest.delete();
        await UserTest.create();
    })

    it('should can update user', async () => {
        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", "Bearer test")
            .send({
                name: "updated"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("updated");
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", "Bearer test")
            .send({
                name: "updateddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd-updated"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('DELETE /api/users/logout', function () {
    beforeEach(async () => {
        await UserTest.delete();
        await UserTest.create();
    });

    it('should can logout', async () => {
        let result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'Bearer test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await UserTest.get();
        expect(user.token).toBeNull();
    });

    it('should reject if token is invalid', async () => {
        let result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'salah');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});
