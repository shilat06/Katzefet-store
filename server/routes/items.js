const express = require("express");
const router = express.Router();
const {
  StoreItemSchema,
  StoreItemsModel,
} = require("../collections/storeItems");

router.get("/", async ({ query: { page: pageString = "0" } }, res) => {
  if (isNaN(pageString)) {
    res.status(400).send("Invalid Params");
    return;
  }

  const itemsPerPage = 10;
  const page = Math.max(0, +pageString - 1);
  try {
    const cart = await StoreItemsModel.aggregate([
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: page * itemsPerPage }, { $limit: itemsPerPage }],
        },
      },
    ]);

    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "error fetching items", error: err });
  }
});

module.exports = router;
