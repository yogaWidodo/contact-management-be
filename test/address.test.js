
import supertest from "supertest";
import {web} from "../src/application/web.js";
import {AddressTest, ContactTest, UserTest} from "./test-util.js";

describe('POST /api/contacts/:contactId/addresses', function () {
    beforeEach(async () => {
        await UserTest.delete();
        await ContactTest.deleteAll();
        await AddressTest.deleteAll();
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should can create new address', async () => {
        const contact = await ContactTest.get();
        const result = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("Authorization", "Bearer test")
            .send({
                street: "Jalan test",
                city: "Kota test",
                province: "Provinsi test",
                country: "Indonesia",
                postal_code: "12345"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe("Jalan test");
        expect(result.body.data.city).toBe("Kota test");
        expect(result.body.data.province).toBe("Provinsi test");
        expect(result.body.data.country).toBe("Indonesia");
        expect(result.body.data.postal_code).toBe("12345");
    });

    it('should reject if request is invalid', async () => {
        const contact = await ContactTest.get();
        const result = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("Authorization", "Bearer test")
            .send({
                street: "Jalan test",
                city: "Kota test",
                province: "Provinsi test",
                country: "",
                postal_code: ""
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if contact is not found', async () => {
        const contact = await ContactTest.get();
        const result = await supertest(web)
            .post(`/api/contacts/${contact.id + 1}/addresses`)
            .set("Authorization", "Bearer test")
            .send({
                street: "Jalan test",
                city: "Kota test",
                province: "Provinsi test",
                country: "Indonesia",
                postal_code: "12345"
            });

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts/:contactId/addresses/:addressId', function () {
    beforeEach(async () => {
        await UserTest.delete();
        await ContactTest.deleteAll();
        await AddressTest.deleteAll();
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should can get address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const result = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(address.id);
    });

    it('should reject if contact is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const result = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if address is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const result = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});

describe('PUT /api/contacts/:contactId/addresses/:addressId', function () {
    beforeEach(async () => {
        await UserTest.delete();
        await ContactTest.deleteAll();
        await AddressTest.deleteAll();
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should can update address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const result = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("Authorization", "Bearer test")
            .send({
                street: "Jalan test updated",
                city: "Kota test updated",
                province: "Provinsi test updated",
                country: "Indonesia updated",
                postal_code: "54321"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(address.id);
        expect(result.body.data.street).toBe("Jalan test updated");
    });

    it('should reject if request is invalid', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const result = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("Authorization", "Bearer test")
            .send({
                country: ""
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('DELETE /api/contacts/:contactId/addresses/:addressId', function () {
    beforeEach(async () => {
        await UserTest.delete();
        await ContactTest.deleteAll();
        await AddressTest.deleteAll();
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should can remove address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const result = await supertest(web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const addressDb = await AddressTest.get();
        expect(addressDb).toBeNull();
    });

    it('should reject if address is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const result = await supertest(web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts/:contactId/addresses', function () {
    beforeEach(async () => {
        await UserTest.delete();
        await ContactTest.deleteAll();
        await AddressTest.deleteAll();
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should can list addresses', async () => {
        const contact = await ContactTest.get();
        const result = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses`)
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
    });

    it('should reject if contact is not found', async () => {
        const contact = await ContactTest.get();
        const result = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}/addresses`)
            .set("Authorization", "Bearer test");

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});
