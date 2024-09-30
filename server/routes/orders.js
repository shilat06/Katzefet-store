const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { OrderModel } = require("../collections/order");
const { StoreItemsModel } = require("../collections/storeItems");
const ItemService = require("../services/item.service");

router.post("/", async (req, res) => {
  const items = req.session.cart;
  const itemsNotInStock = await ItemService.findItemsNotInStock(items);

  if (itemsNotInStock.length > 0) {
    res.status(400).json({
      type: "not_in_stock",
      data: itemsNotInStock,
      message: "Items not in stock",
    });
    return;
  }

  const order = new OrderModel();
  order.items = items;
  order.user = mongoose.Types.ObjectId(req.session.userId);

  try {
    const success = await ItemService.removeItemsFromStock(items);

    if (success) {
      const savedOrder = await order.save();

      req.session.cart = [];

      res.status(200).send(savedOrder);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);

    return res.status(500).end();
  }
});

module.exports = router;
