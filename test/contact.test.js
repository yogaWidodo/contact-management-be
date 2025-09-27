
import supertest from "supertest";
import {web} from "../src/application/web.js";
import {ContactTest, UserTest} from "./test-util.js";

describe('POST /api/contacts', function () {
    beforeEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
        await UserTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should can create new contact', async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "Bearer test")
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@pzn.com",
                phone: "0809000000"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@pzn.com");
        expect(result.body.data.phone).toBe("0809000000");
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "Bearer test")
            .send({
                first_name: "",
                last_name: "test",
                email: "test",
                phone: "0809000000"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should can get contact', async () => {
        const contact = await ContactTest.get();
        const result = await supertest(web)
            .get("/api/contacts/" + contact.id)
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(contact.id);
        expect(result.body.data.first_name).toBe(contact.first_name);
        expect(result.body.data.last_name).toBe(contact.last_name);
        expect(result.body.data.email).toBe(contact.email);
        expect(result.body.data.phone).toBe(contact.phone);
    });

    it('should reject if contact is not found', async () => {
        const contact = await ContactTest.get();
        const result = await supertest(web)
            .get("/api/contacts/" + (contact.id + 1))
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});

describe('PUT /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should can update contact', async () => {
        const contact = await ContactTest.get();
        const result = await supertest(web)
            .put("/api/contacts/" + contact.id)
            .set("Authorization", "Bearer test")
            .send({
                first_name: "test2",
                last_name: "test2",
                email: "test2@pzn.com",
                phone: "0809000002"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(contact.id);
        expect(result.body.data.first_name).toBe("test2");
        expect(result.body.data.last_name).toBe("test2");
        expect(result.body.data.email).toBe("test2@pzn.com");
        expect(result.body.data.phone).toBe("0809000002");
    });

    it('should reject if request is invalid', async () => {
        const contact = await ContactTest.get();
        const result = await supertest(web)
            .put("/api/contacts/" + contact.id)
            .set("Authorization", "Bearer test")
            .send({
                first_name: "",
                last_name: "",
                email: "",
                phone: ""
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('DELETE /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should can delete contact', async () => {
        const contact = await ContactTest.get();
        const result = await supertest(web)
            .delete("/api/contacts/" + contact.id)
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");
    });

    it('should reject if contact is not found', async () => {
        const contact = await ContactTest.get();
        const result = await supertest(web)
            .delete("/api/contacts/" + (contact.id + 1))
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts', function () {
    beforeEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should can search contact', async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(1);
    });

    it('should can search contact using name', async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({name: "es"})
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
    });

    it('should can search contact using email', async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({email: ".com"})
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
    });

    it('should can search contact using phone', async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({phone: "0809"})
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
    });

    it('should can search contact no result', async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({name: "salah"})
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(0);
    });

    it('should can search contact with paging', async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({page: 2, size: 1})
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(0);
        expect(result.body.paging.page).toBe(2);
    });
});
