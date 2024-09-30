const mongoose = require("mongoose");
const { StoreItemSchema } = require("./storeItems");

const OrderSchema = new mongoose.Schema({
  items: [StoreItemSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = {
  OrderSchema,
  OrderModel: mongoose.model("order", OrderSchema),
};
