
import addressService from "../service/address-service.js";

const create = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await addressService.create(req.user, contactId, req.body);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const { contactId, addressId } = req.params;
        const result = await addressService.update(req.user, contactId, addressId, req.body);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const { contactId, addressId } = req.params;
        const result = await addressService.get(req.user, contactId, addressId);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const { contactId, addressId } = req.params;
        await addressService.remove(req.user, contactId, addressId);
        res.status(200).json({ data: "OK" });
    } catch (e) {
        next(e);
    }
}

const list = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await addressService.list(req.user, contactId);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    update,
    get,
    remove,
    list
}
