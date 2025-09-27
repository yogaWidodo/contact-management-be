import contactService from "../service/contact-service.js";

const create = async (req, res, next) => {
    try {
        const result = await contactService.create(req.user, req.body);
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}
const update = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactService.update(req.user, req.body, id);
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}
const get = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactService.get(req.user, id)
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const {id} = req.params;
        await contactService.remove(req.user, id)
        res.status(200).json({
            data: "OK"
        });
    }catch (err){
        next(err);
    }
}

const search = async (req,res,next)=>{

    try {
        const query = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        }
        const result = await contactService.search(req.user,query)
        res.status(200).json({
            data:result.data,
            paging:result.paging
        });
    }catch (err){
        next(err)
    }
}

export default {
    create,
    update,
    get,
    remove,
    search
}