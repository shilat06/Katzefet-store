import express from "express"
const router = express.Router()
import StoreItems from "../collections/storeItems.js"

router.get("/", async (req, res) => {
  try {
    const iceCreampProducts = await StoreItems.find({ category: "iceCream" })
    return res.send({ products: { iceCream: iceCreampProducts } })
  } catch (err) {
    return res
      .status(500)
      .json({ message: "error in get products", error: err })
  }
})

router.post("/", async (req, res) => {
  try {
    const { storeItems = [] } = req.body
    await Promise.all(
      storeItems.map((item) => {
        const { makat, name, img, cost, stockAmount, category } = item
        const newStoreItem = new StoreItems({
          makat,
          name,
          img,
          cost,
          stockAmount,
          category,
        })
        return newStoreItem.save()
      })
    )

    res.sendStatus(204)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "error in save items", error: err })
  }
})

export default router
