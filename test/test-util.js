
import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

export class UserTest {

    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        });
    }

    static async create() {
        await prismaClient.user.create({
            data: {
                username: "test",
                name: "test",
                password: await bcrypt.hash("test", 10),
                token: "test"
            }
        });
    }

    static async get() {
        return prismaClient.user.findUnique({
            where: {
                username: "test"
            }
        });
    }
}

export class ContactTest {

    static async deleteAll() {
        await prismaClient.contact.deleteMany({
            where: {
                username: 'test'
            }
        });
    }

    static async create() {
        await prismaClient.contact.create({
            data: {
                first_name: 'test',
                last_name: 'test',
                email: 'test@pzn.com',
                phone: '0809000000',
                username: 'test'
            }
        })
    }

    static async get() {
        return prismaClient.contact.findFirst({
            where: {
                username: 'test'
            }
        });
    }
}

export class AddressTest {

    static async deleteAll() {
        await prismaClient.address.deleteMany({
            where: {
                contact: {
                    username: 'test'
                }
            }
        });
    }

    static async create() {
        const contact = await ContactTest.get();
        await prismaClient.address.create({
            data: {
                contact_id: contact.id,
                street: 'jalan test',
                city: 'kota test',
                province: 'provinsi test',
                country: 'indonesia',
                postal_code: '11111'
            }
        })
    }

    static async get(){
        return prismaClient.address.findFirst({
            where: {
                contact: {
                    username: 'test'
                }
            }
        });
    }
}
