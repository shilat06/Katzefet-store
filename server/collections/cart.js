const mongoose = require("mongoose");
const { StoreItemSchema } = require("./storeItems");

const CartSchema = new mongoose.Schema({
  shoopingCart: [StoreItemSchema],
  // shoopingCart: {type: String},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = {
  CartSchema,
  CartModel: mongoose.model("cart", CartSchema),
};
