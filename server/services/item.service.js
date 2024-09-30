const { ObjectId } = require("mongodb");
const { StoreItemsModel } = require("../collections/storeItems");

class ItemService {
  static async findItemsNotInStock(items) {
    const itemsStock = await StoreItemsModel.find({
      _id: { $in: items.map(({ _id }) => new ObjectId(_id)) },
    });
    const itemsNotInStock = [];

    for (let index = 0; index < itemsStock.length; ++index) {
      const { _doc: item } = { ...itemsStock[index] };
      const orderItem = items.find((it) => it._id === item._id.toString());

      if (orderItem && orderItem.stockAmount > +item.stockAmount) {
        itemsNotInStock.push(item);
      }
    }

    return itemsNotInStock;
  }

  static async removeItemsFromStock(items) {
    try {
      await StoreItemsModel.bulkWrite(
        items.map((item) => ({
          updateOne: {
            filter: { _id: new ObjectId(item._id) },
            update: {
              $inc: {
                stockAmount: -+item.stockAmount,
              },
            },
            upsert: true,
          },
        }))
      );

      return true;
    } catch (err) {
      console.error(err);

      return false;
    }
  }
}

module.exports = ItemService;
