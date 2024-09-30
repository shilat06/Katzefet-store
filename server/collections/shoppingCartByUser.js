import mongoose from "mongoose"
import storeItems  from "./storeItems"

const shoppingCartByUserSchema = new mongoose.Schema({
  shoopingCart: [storeItems],
  // shoopingCart: {type: String},
  user: { type: Schema.Types.ObjectId, ref: "user" },
})

module.exports = mongoose.model("person", shoppingCartByUserSchema)
