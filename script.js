"use strict";

const items = [
  { id: 1, name: "Keyboard", price: 45, amount: 0 },
  { id: 2, name: "Mouse", price: 30, amount: 0 },
  { id: 3, name: "Printer", price: 80, amount: 0 },
  { id: 4, name: "Speaker", price: 60, amount: 0 },
];

const element = {
  itemView: document.querySelector(".item-view"),
  cartItem: document.querySelector(".cart-view"),
  total: document.querySelector(".cash"),
};

const getItemById = (id) => items.find((item) => item.id === id);

const renderItemList = function () {
  const markup = items
    .map(
      (item, ind) =>
        `<li class="preview">
    <div>
      <p class="item">${item.name}</p>
      <p class="price">Price $${item.price}</p>
      <button class="add-item add-item-${item.id}">Add</button>
    </div>
  </li>`
    )
    .join("");
  element.itemView.insertAdjacentHTML("afterbegin", markup);
};
renderItemList();

const updateTotal = function () {
  const amount = items.reduce((ecc, item) => ecc + item.amount * item.price, 0);
  element.total.textContent = `Total: ${amount}$`;
};

const addItemToCart = function (id) {
  const item = getItemById(Number(id));
  if (item.amount !== 0) return;
  item.amount += 1;
  const markup = `
      <li class="cart-preview cart-preview-${item.id}">
        <div class="item-info">
          <span>${item.name}</span>
          <span class="amount-${item.id}">x 1</span>
          <span class="price-${item.id}"> = ${item.price}$</span>
        </div>
        <div class="count">
          <button class="btn-count inc-${item.id}">+</button>
          <button class="btn-count dec-${item.id}">-</button>
        </div>
    </li>
  `;
  element.cartItem.insertAdjacentHTML("beforeend", markup);
  updateTotal();
};

const removeCartItem = function (id) {
  const item = getItemById(id);
  item.amount = 0;
  console.log(`cart-preview-${id}`, id);
  const itemNode = document.querySelector(`.cart-preview-${id}`);
  itemNode.parentNode.removeChild(itemNode);

  updateTotal();
};

const updateItemCount = function (id, type) {
  const item = getItemById(Number(id));
  const amountNode = document.querySelector(`.amount-${id}`);
  const priceNode = document.querySelector(`.price-${id}`);
  if (type === "inc") {
    item.amount += 1;
  } else {
    item.amount -= 1;
  }

  if (item.amount === 0) {
    return removeCartItem(item.id);
  }
  console.log(item.amount);

  amountNode.textContent = `x ${item.amount}`;
  priceNode.textContent = ` = ${item.price * item.amount}$`;
  updateTotal();
};

document.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target || e.target.classList.length < 2) return;
  const { classList } = e.target;
  //console.log(classList);
  const classListSep = classList[1].split("-");
  //console.log(classListSep);
  const itemId = classListSep[classListSep.length - 1];

  if (classList[0] === "add-item") {
    return addItemToCart(itemId);
  }

  if (classList[0] === "btn-count") {
    const type = classListSep[0];
    return updateItemCount(itemId, type);
  }
});
