const express = require("express");
const router = express.Router();
const axios = require("axios");
const { StoreItemsModel } = require("../collections/storeItems");
const ItemService = require("../services/item.service");

router.get("/", async (req, res) => {
  res.status(200).send(req.session.cart || []);
});

router.get("/stock", async (req, res) => {
  const items = await ItemService.findItemsNotInStock(req.session.cart);

  res.status(200).send(items);
});

router.get("/total", async (req, res) => {
  let total = 0;

  for (const item of req.session.cart || []) {
    total += +item.cost * +item.stockAmount;
  }

  res.status(200).send(total.toString());
});

router.post("/", async (req, res) => {
  const item = req.body;
  const itemModel = new StoreItemsModel(item);

  try {
    await itemModel.validate();
  } catch (err) {
    console.error(err);

    res.status(500).end();
  }

  if (!Array.isArray(req.session.cart)) {
    req.session.cart = [];
  }

  if (item.stockAmount > 0) {
    const existingItemIndex = req.session.cart.findIndex(
      (cartItem) => cartItem.makat === item.makat
    );

    if (existingItemIndex >= 0) {
      req.session.cart[existingItemIndex] = item;
    } else {
      req.session.cart.push(item);
    }

    res.status(204).end();
  } else {
    res.status(400).end();
  }
});

router.delete("/:makat", async (req, res) => {
  const itemId = req.params.makat;

  if (!Array.isArray(req.session.cart)) {
    req.session.cart = [];
  }

  const beforeDeleteLength = req.session.cart.length;

  req.session.cart = req.session.cart.filter((item) => item.makat !== itemId);

  const afterDeleteLength = req.session.cart.length;

  res.status(beforeDeleteLength !== afterDeleteLength ? 204 : 400).end();
});

router.delete("/", async (req, res) => {
  req.session.cart = [];

  res.status(204).end();
});

module.exports = router;
