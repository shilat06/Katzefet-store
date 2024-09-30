const mongoose = require("mongoose");

const StoreItemSchema = new mongoose.Schema({
  makat: { type: Number },
  name: { type: String },
  img: { type: String },
  cost: { type: Number },
  stockAmount: { type: Number },
  category: { type: String },
});

module.exports = {
  StoreItemSchema,
  StoreItemsModel: mongoose.model("storeItems", StoreItemSchema),
};
