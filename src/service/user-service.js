import {validate} from "../validation/validation.js";
import {loginUserValidation, registerUserValidation, updateUserValidation} from "../validation/user-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";


const register = async (request) => {

    const user = validate(registerUserValidation, request);
    const countUser = await prismaClient.user.count({
        where: {
            username: user.username,
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);
    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true,
        }
    });
}


const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username,
        },
    });

    if (!user) {
        throw new ResponseError(401, "Invalid username or password");
    }
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Invalid username or password");
    }

    const token = uuidv4();

    return prismaClient.user.update({
        where: {username: user.username},
        data: {token},
        select: {
            username: true,
            name: true,
            token: true
        }
    });
}


const logout = async (user) => {
    const countUser = await prismaClient.user.count({
        where: { username: user.username },
    });

    if (countUser === 0) {
        throw new ResponseError(404, "User not found");
    }
    await prismaClient.user.update({
        where: {
            username: user.username
        },
        data:{
            token:null
        }
    });
    return true
}


const update = async (user, request) => {
    const updateRequest = validate(updateUserValidation, request);
    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })
    if (countUser === 0) {
        throw new ResponseError(404, "User not found");
    }
    if (updateRequest.name) {
        user.name = updateRequest.name;
    }
    if (updateRequest.password) {
        updateRequest.password = await bcrypt.hash(updateRequest.password, 10);
        user.password = updateRequest.password;
    }
    return prismaClient.user.update({
        where: {username: user.username},
        data: {
            name: user.name,
            password: user.password
        },
        select: {
            username: true,
            name: true,
        }
    });

}


const getUser = async (user) => {
    const findUser = await prismaClient.user.findUnique({
        where: {username: user.username},
    });
    if (!findUser) {
        throw new ResponseError(404, "User not found");
    }
    return prismaClient.user.findUnique({
        where: {username: user.username},
        select: {
            username: true,
            name: true,
        }
    });
}

export default {
    register,
    login,
    update,
    getUser,
    logout
};
