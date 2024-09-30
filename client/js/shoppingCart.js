const products = axiosClient.get(`/items?page=1`);

async function getShoppingCart() {
  try {
    const { data: cart } = await axiosClient.get("/carts");

    return cart;
  } catch (error) {
    return [];
  }
}

function getProducts() {
  return products;
}

async function addItemToCart(productToAdd) {
  productToAdd.stockAmount = 1;
  const { status } = await axiosClient.post("/carts", productToAdd);

  if (status === 400) {
    alert("מצטערים, המוצר אזל מהמלאי:(");
  }
}
async function changeProductAmount(productIndex, changingAmount) {
  const productInCart = shoppingCart[productIndex];

  if (changingAmount == "1") {
    productInCart.stockAmount += 1;
  } else {
    productInCart.stockAmount -= 1;
  }

  if (productInCart.stockAmount > 0) {
    const { status } = await axiosClient.post("/carts", productInCart);

    if (status === 400) {
      alert("לא ניתן להוסיף יותר מן הכמות הנוכחית עקב מחסור במלאי");
    }
  } else {
    await removeItemFromCart(productInCart.makat);
  }

  renderShoppingCart();
}

function clearShoppingCart() {
  axiosClient.delete("/carts");

  renderShoppingCart();
}

async function fetchTotal() {
  const { data: total } = await axiosClient.get("/carts/total");

  return total;
}

async function removeItemFromCart(itemId) {
  await axiosClient.delete("/carts/" + itemId);

  renderShoppingCart();
}
