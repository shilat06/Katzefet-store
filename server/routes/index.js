const express = require("express");
const usersRouter = require("./users");
const cartRouter = require("./carts");
const itemRouter = require("./items");
const ordersRouter = require("./orders");
const isUserAuthenticated = require("../middlewares/isUserAuthenticated");

const appRouter = new express.Router();

appRouter.use("/users", usersRouter);
appRouter.use("/carts", isUserAuthenticated, cartRouter);
appRouter.use("/items", isUserAuthenticated, itemRouter);
appRouter.use("/orders", isUserAuthenticated, ordersRouter);

module.exports = appRouter;
