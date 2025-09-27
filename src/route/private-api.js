
import express from "express";
import userController from "../controller/user-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";
import contactController from "../controller/contact-controller.js";
import addressController from "../controller/address-controller.js";

const privateRouter = new express.Router();

privateRouter.use(authMiddleware);
privateRouter.patch('/api/users/current', userController.update);
privateRouter.get('/api/users/current', userController.getUser)
privateRouter.delete('/api/users/logout', userController.logout)

// Contact
privateRouter.post("/api/contacts", contactController.create)
privateRouter.put("/api/contacts/:id", contactController.update)
privateRouter.get("/api/contacts/:id", contactController.get)
privateRouter.get("/api/contacts", contactController.search)
privateRouter.delete("/api/contacts/:id", contactController.remove)

// Address
privateRouter.post("/api/contacts/:contactId/addresses", addressController.create);
privateRouter.put("/api/contacts/:contactId/addresses/:addressId", addressController.update);
privateRouter.get("/api/contacts/:contactId/addresses/:addressId", addressController.get);
privateRouter.get("/api/contacts/:contactId/addresses", addressController.list);
privateRouter.delete("/api/contacts/:contactId/addresses/:addressId", addressController.remove);


export {
    privateRouter
}
