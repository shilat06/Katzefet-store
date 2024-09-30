document.addEventListener("DOMContentLoaded", async function () {
  const paymentButtonEl = document.getElementById("paymentButton");

  try {
    const {
      data: [{ data: allItems }],
    } = await axiosClient.get(`/items?page=1`);
    const shopProducts = {};

    for (const item of allItems) {
      if (item.category in shopProducts) {
        shopProducts[item.category].push(item);
      } else {
        shopProducts[item.category] = [item];
      }
    }

    const container = document.getElementById("iceCreamContainer");
    container.classList.add("container");

    function renderCards(selectedType) {
      container.innerHTML = "";
      shopProducts[selectedType].forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = product.img;
        img.alt = product.name;

        const name = document.createElement("h2");
        name.textContent = product.name;

        const cost = document.createElement("p");
        cost.textContent = product.cost + ' ש"ח ';

        const addButton = document.createElement("button");
        addButton.textContent = "הוסף לעגלה";

        addButton.addEventListener("click", function () {
          addItemToCart(product);
        });

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(cost);
        card.appendChild(addButton);

        container.appendChild(card);
      });
    }
    document.querySelectorAll(".tag").forEach((tag) => {
      tag.addEventListener("click", function () {
        const selectedType = this.getAttribute("data-filter");
        renderCards(selectedType);
      });
    });
    renderCards("iceCream");
    const products = JSON.parse(sessionStorage.getItem("products"));
    if (!products) {
      sessionStorage.setItem(
        "products",
        JSON.stringify([...shopProducts.drinks, ...shopProducts.iceCream])
      );
    } else {
      console.log(products);
    }

    paymentButtonEl.addEventListener("click", async () => {
      const { data: itemsOutOfStock } = await axiosClient.get("/carts/stock");

      if (itemsOutOfStock.length > 0) {
        alert(
          "הפריטים הבאים חסרים במלאי:\n" +
            itemsOutOfStock
              .map((item) => item.name + ": " + item.stockAmount + " במלאי")
              .join("\n")
        );
      } else {
        window.location.href = "payment.html";
      }
    });
  } catch (error) {}
});
