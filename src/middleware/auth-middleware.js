import {ResponseError} from "../error/response-error.js";
import {prismaClient} from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(new ResponseError(401, "Unauthorized"));
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return next(new ResponseError(401, "Unauthorized"));
        }

        const user = await prismaClient.user.findFirst({
            where: {token: token},
        });

        if (!user) {
            return next(new ResponseError(401, "Invalid token"));
        }
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

