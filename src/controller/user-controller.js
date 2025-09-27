import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}


const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user)
        res.status(200).json({
            data: "OK"
        })
    }catch (err){
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await userService.update(req.user, req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getUser = async (req, res, next) => {
    try {
        const result = await userService.getUser(req.user);
        res.status(200).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
}


export default {
    register,
    login,
    update,
    getUser,
    logout
}