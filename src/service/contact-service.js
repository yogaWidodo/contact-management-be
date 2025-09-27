import {validate} from "../validation/validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import {contactValidation, getContactValidation, searchContactValidation} from "../validation/contact-validation.js";

const create = async (user, request) => {
    const contact = validate(contactValidation, request);

    const countContact = await prismaClient.contact.count({
        where: {
            username: user.username,
            phone: request.phone
        }
    });

    if (countContact === 1) {
        throw new ResponseError(400, "Contact Number is already exists");
    }

    return prismaClient.contact.create({
        data: {
            ...contact,
            username: user.username
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });
}

const update = async (user, request, id) => {
    const contactId = validate(getContactValidation, id);
    const contact = validate(contactValidation, request)
    const foundContact = await prismaClient.contact.findFirst({
        where: {
            username: user.username,
            id: contactId
        }
    });

    if (!foundContact) {
        throw new ResponseError(400, "Contact does not exists");
    }
    return prismaClient.contact.update({
        where: {
            id: contactId
        },
        data: {
            ...contact,
            username: user.username
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}


const get = async (user, id) => {
    const contactId = validate(getContactValidation, id)
    const foundContact = await prismaClient.contact.findFirst({
        where: {
            username: user.username,
            id: contactId
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });

    if (!foundContact) {
        throw new ResponseError(400, "Contact does not exists");
    }
    return foundContact

}

const remove = async (user, id) => {
    const contactId = validate(getContactValidation, id)
    const contact = await prismaClient.contact.findUnique({
        where: {id: contactId}
    });

    if (!contact || contact.username !== user.username) {
        throw new ResponseError(404, "Contact not found");
    }

    return prismaClient.contact.delete({
        where: {id: contactId}
    });
}

const search = async (user, request) => {
    request = validate(searchContactValidation, request)

    // 1 ((page - 1) * size) = 0
    // 2 ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;
    const filters = [];


    filters.push({
        username: user.username
    })

    if (request.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.name
                    }
                },
                {
                    last_name: {
                        contains: request.name
                    }
                },
            ]
        });
    }

    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        });
    }
    if (request.phone) {
        filters.push({
            phone: {
                contains: request.phone
            }
        });
    }
    const contacts = await prismaClient.contact.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.contact.count({
        where: {
            AND: filters
        }
    });

    return {
        data: contacts,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }

}
export default {
    create,
    update,
    get,
    remove,
    search
};
